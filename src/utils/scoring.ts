import { questions, getDimensionLabel, subdimensionLabels } from '../data/questions'
import {
  maturityLevels,
  dimensionDescriptions,
  firstStepRecommendations,
  dimensionNarratives,
  subdimensionNarratives,
  products,
  productRules,
  actionStepTemplates,
} from '../data/recommendations'

export interface Scores {
  visie: number
  docent: number
  onderwijs: number
  infra: number
  subdimensions: {
    mindset: number
    ethiek: number
    kennis: number
    pedagogiek: number
    agency: number
  }
  kiesSubdimensions: {
    kiezen: number
    instrueren: number
    evalueren: number
    spelregels: number
  }
  total: number
  euReadiness: number
}

export interface DimensionAnalysis {
  key: string
  label: string
  score: number
  tier: string
  tierLabel: string
  narrative: string
  isSubdimension: boolean
  parentDimension?: string
}

export interface RecommendedProduct {
  id: string
  name: string
  description: string
  format: string
  reason: string
}

export interface ActionPlanItem {
  priority: number
  dimensionLabel: string
  action: string
  productLink?: { id: string; name: string }
}

export function calculateScores(answers: Record<number, number>): Scores {
  const dimensionScores: Record<string, number[]> = {
    visie: [],
    docent: [],
    onderwijs: [],
    infra: [],
  }
  const docentSubScores: Record<string, number[]> = {
    mindset: [],
    ethiek: [],
    kennis: [],
    pedagogiek: [],
    agency: [],
  }
  const kiesSubScores: Record<string, number[]> = {
    kiezen: [],
    instrueren: [],
    evalueren: [],
    spelregels: [],
  }

  for (const q of questions) {
    const score = answers[q.id]
    if (score !== undefined) {
      dimensionScores[q.dimension].push(score)
      if (q.subdimension) {
        if (q.dimension === 'docent' && q.subdimension in docentSubScores) {
          docentSubScores[q.subdimension].push(score)
        } else if (q.dimension === 'onderwijs' && q.subdimension in kiesSubScores) {
          kiesSubScores[q.subdimension].push(score)
        }
      }
    }
  }

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  const visie = avg(dimensionScores.visie)
  const docent = avg(dimensionScores.docent)
  const onderwijs = avg(dimensionScores.onderwijs)
  const infra = avg(dimensionScores.infra)

  const subdimensions = {
    mindset: avg(docentSubScores.mindset),
    ethiek: avg(docentSubScores.ethiek),
    kennis: avg(docentSubScores.kennis),
    pedagogiek: avg(docentSubScores.pedagogiek),
    agency: avg(docentSubScores.agency),
  }

  const kiesSubdimensions = {
    kiezen: avg(kiesSubScores.kiezen),
    instrueren: avg(kiesSubScores.instrueren),
    evalueren: avg(kiesSubScores.evalueren),
    spelregels: avg(kiesSubScores.spelregels),
  }

  const total = avg([visie, docent, onderwijs, infra])
  const euReadiness = Math.round(((total - 1) / 3) * 100)

  return { visie, docent, onderwijs, infra, subdimensions, kiesSubdimensions, total, euReadiness }
}

export function getMaturityLevel(score: number) {
  return maturityLevels.find(l => score >= l.min && score <= l.max) || maturityLevels[0]
}

export function getMaturityTier(score: number): string {
  if (score <= 1.5) return 'startend'
  if (score <= 2.5) return 'verkennend'
  if (score <= 3.0) return 'opbouwend'
  if (score <= 3.5) return 'integrerend'
  return 'voorlopend'
}

function getTierLabel(tier: string): string {
  const map: Record<string, string> = {
    startend: 'Startend',
    verkennend: 'Verkennend',
    opbouwend: 'Opbouwend',
    integrerend: 'Integrerend',
    voorlopend: 'Voorlopend',
  }
  return map[tier] || tier
}

export function getDimensionAnalysis(scores: Scores, onderwijstype?: string): DimensionAnalysis[] {
  const result: DimensionAnalysis[] = []

  const dims: { key: string; score: number }[] = [
    { key: 'visie', score: scores.visie },
    { key: 'docent', score: scores.docent },
    { key: 'onderwijs', score: scores.onderwijs },
    { key: 'infra', score: scores.infra },
  ]

  for (const dim of dims) {
    const tier = getMaturityTier(dim.score)
    const narrative = dimensionNarratives[dim.key]?.[tier] || ''
    result.push({
      key: dim.key,
      label: getDimensionLabel(dim.key, onderwijstype),
      score: dim.score,
      tier,
      tierLabel: getTierLabel(tier),
      narrative,
      isSubdimension: false,
    })

    if (dim.key === 'docent') {
      const subs: { key: string; score: number }[] = [
        { key: 'mindset', score: scores.subdimensions.mindset },
        { key: 'ethiek', score: scores.subdimensions.ethiek },
        { key: 'kennis', score: scores.subdimensions.kennis },
        { key: 'pedagogiek', score: scores.subdimensions.pedagogiek },
        { key: 'agency', score: scores.subdimensions.agency },
      ]
      for (const sub of subs) {
        const subTier = getMaturityTier(sub.score)
        const subNarrative = subdimensionNarratives[sub.key]?.[subTier] || ''
        result.push({
          key: sub.key,
          label: subdimensionLabels[sub.key] || sub.key,
          score: sub.score,
          tier: subTier,
          tierLabel: getTierLabel(subTier),
          narrative: subNarrative,
          isSubdimension: true,
          parentDimension: 'docent',
        })
      }
    }

    if (dim.key === 'onderwijs') {
      const subs: { key: string; score: number }[] = [
        { key: 'kiezen', score: scores.kiesSubdimensions.kiezen },
        { key: 'instrueren', score: scores.kiesSubdimensions.instrueren },
        { key: 'evalueren', score: scores.kiesSubdimensions.evalueren },
        { key: 'spelregels', score: scores.kiesSubdimensions.spelregels },
      ]
      for (const sub of subs) {
        const subTier = getMaturityTier(sub.score)
        const subNarrative = subdimensionNarratives[sub.key]?.[subTier] || ''
        result.push({
          key: sub.key,
          label: subdimensionLabels[sub.key] || sub.key,
          score: sub.score,
          tier: subTier,
          tierLabel: getTierLabel(subTier),
          narrative: subNarrative,
          isSubdimension: true,
          parentDimension: 'onderwijs',
        })
      }
    }
  }

  return result
}

export function getProductRecommendations(
  scores: Scores,
  context: Record<string, string | string[]>
): RecommendedProduct[] {
  const scoresWithTotal = { ...scores, total: scores.total }

  const recommended: RecommendedProduct[] = []

  for (const rule of productRules) {
    if (rule.condition(scoresWithTotal, context)) {
      const product = products.find(p => p.id === rule.productId)
      if (product) {
        recommended.push({
          id: product.id,
          name: product.name,
          description: product.description,
          format: product.format,
          reason: rule.reason(scoresWithTotal),
        })
      }
    }
  }

  const seen = new Set<string>()
  const sorted = recommended
    .sort((a, b) => {
      const prioA = productRules.find(r => r.productId === a.id)?.priority || 99
      const prioB = productRules.find(r => r.productId === b.id)?.priority || 99
      return prioA - prioB
    })
    .filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })

  return sorted.slice(0, 5)
}

export function getActionPlan(
  scores: Scores,
  context: Record<string, string | string[]>
): ActionPlanItem[] {
  const items: ActionPlanItem[] = []
  const onderwijstype = context.onderwijstype as string | undefined

  for (const tmpl of actionStepTemplates) {
    let score: number
    let label: string

    if (tmpl.subdimension) {
      if (tmpl.subdimension in scores.subdimensions) {
        score = scores.subdimensions[tmpl.subdimension as keyof typeof scores.subdimensions]
      } else if (tmpl.subdimension in scores.kiesSubdimensions) {
        score = scores.kiesSubdimensions[tmpl.subdimension as keyof typeof scores.kiesSubdimensions]
      } else {
        continue
      }
      label = subdimensionLabels[tmpl.subdimension] || tmpl.subdimension
    } else {
      score = scores[tmpl.dimension as keyof Scores] as number
      label = getDimensionLabel(tmpl.dimension, onderwijstype)
    }

    if (score >= tmpl.minScore && score <= tmpl.maxScore) {
      let productLink: ActionPlanItem['productLink'] = undefined
      if (tmpl.productId) {
        if (tmpl.productId === 'leerlingen-vo' && context.onderwijstype !== 'VO') {
          productLink = undefined
        } else {
          const product = products.find(p => p.id === tmpl.productId)
          if (product) {
            productLink = { id: product.id, name: product.name }
          }
        }
      }

      items.push({
        priority: tmpl.priority,
        dimensionLabel: label,
        action: tmpl.action,
        productLink,
      })
    }
  }

  items.sort((a, b) => a.priority - b.priority)

  const seen = new Set<string>()
  const unique = items.filter(item => {
    if (seen.has(item.action)) return false
    seen.add(item.action)
    return true
  })

  return unique.slice(0, 5).map((item, idx) => ({
    ...item,
    priority: idx + 1,
  }))
}

export function getKeyFindings(scores: Scores, onderwijstype?: string) {
  const dims = [
    { key: 'visie', label: getDimensionLabel('visie', onderwijstype), score: scores.visie },
    { key: 'docent', label: getDimensionLabel('docent', onderwijstype), score: scores.docent },
    { key: 'onderwijs', label: getDimensionLabel('onderwijs', onderwijstype), score: scores.onderwijs },
    { key: 'infra', label: getDimensionLabel('infra', onderwijstype), score: scores.infra },
  ]

  const sorted = [...dims].sort((a, b) => b.score - a.score)
  const strongest = sorted[0]
  const weakest = sorted[sorted.length - 1]

  let recommendationKey = weakest.key
  if (weakest.key === 'docent') {
    const subs = Object.entries(scores.subdimensions) as [string, number][]
    const lowestSub = subs.sort((a, b) => a[1] - b[1])[0]
    recommendationKey = lowestSub[0]
  } else if (weakest.key === 'onderwijs') {
    const subs = Object.entries(scores.kiesSubdimensions) as [string, number][]
    const lowestSub = subs.sort((a, b) => a[1] - b[1])[0]
    recommendationKey = lowestSub[0]
  }

  return {
    strongest: {
      label: strongest.label,
      score: strongest.score,
      description: dimensionDescriptions[strongest.key].high,
    },
    weakest: {
      label: weakest.label,
      score: weakest.score,
      description: dimensionDescriptions[weakest.key].low,
    },
    recommendation: firstStepRecommendations[recommendationKey] || firstStepRecommendations[weakest.key],
  }
}
