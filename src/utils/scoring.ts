import { questions, dimensionLabels, subdimensionLabels } from '../data/questions'
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
  const subScores: Record<string, number[]> = {
    mindset: [],
    ethiek: [],
    kennis: [],
    pedagogiek: [],
    agency: [],
  }

  for (const q of questions) {
    const score = answers[q.id]
    if (score !== undefined) {
      dimensionScores[q.dimension].push(score)
      if (q.subdimension) {
        subScores[q.subdimension].push(score)
      }
    }
  }

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  const visie = avg(dimensionScores.visie)
  const docent = avg(dimensionScores.docent)
  const onderwijs = avg(dimensionScores.onderwijs)
  const infra = avg(dimensionScores.infra)

  const subdimensions = {
    mindset: avg(subScores.mindset),
    ethiek: avg(subScores.ethiek),
    kennis: avg(subScores.kennis),
    pedagogiek: avg(subScores.pedagogiek),
    agency: avg(subScores.agency),
  }

  const total = avg([visie, docent, onderwijs, infra])
  const euReadiness = Math.round(((total - 1) / 3) * 100)

  return { visie, docent, onderwijs, infra, subdimensions, total, euReadiness }
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

export function getDimensionAnalysis(scores: Scores): DimensionAnalysis[] {
  const result: DimensionAnalysis[] = []

  // Main dimensions
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
      label: dimensionLabels[dim.key] || dim.key,
      score: dim.score,
      tier,
      tierLabel: getTierLabel(tier),
      narrative,
      isSubdimension: false,
    })

    // Add subdimensions after docent
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

  // Sort by priority (from rules), deduplicate
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

  // Return max 4 recommendations
  return sorted.slice(0, 5)
}

export function getActionPlan(
  scores: Scores,
  context: Record<string, string | string[]>
): ActionPlanItem[] {
  const items: ActionPlanItem[] = []

  // Collect all matching templates
  for (const tmpl of actionStepTemplates) {
    let score: number
    let label: string

    if (tmpl.subdimension) {
      score = scores.subdimensions[tmpl.subdimension as keyof typeof scores.subdimensions]
      label = subdimensionLabels[tmpl.subdimension] || tmpl.subdimension
    } else {
      score = scores[tmpl.dimension as keyof Scores] as number
      label = dimensionLabels[tmpl.dimension] || tmpl.dimension
    }

    if (score >= tmpl.minScore && score <= tmpl.maxScore) {
      // Skip VO-specific product links for non-VO schools
      let productLink: ActionPlanItem['productLink'] = undefined
      if (tmpl.productId) {
        if (tmpl.productId === 'leerlingen-vo' && context.onderwijstype !== 'VO') {
          // Skip this product link but keep the action
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

  // Sort by priority, take top 5
  items.sort((a, b) => a.priority - b.priority)

  // Deduplicate actions (same text)
  const seen = new Set<string>()
  const unique = items.filter(item => {
    if (seen.has(item.action)) return false
    seen.add(item.action)
    return true
  })

  // Re-number priorities 1-5
  return unique.slice(0, 5).map((item, idx) => ({
    ...item,
    priority: idx + 1,
  }))
}

export function getKeyFindings(scores: Scores) {
  const dims = [
    { key: 'visie', label: 'Visie & Beleid', score: scores.visie },
    { key: 'docent', label: 'Docentvaardigheden', score: scores.docent },
    { key: 'onderwijs', label: 'Onderwijs aan leerlingen', score: scores.onderwijs },
    { key: 'infra', label: 'Infrastructuur', score: scores.infra },
  ]

  const sorted = [...dims].sort((a, b) => b.score - a.score)
  const strongest = sorted[0]
  const weakest = sorted[sorted.length - 1]

  let recommendationKey = weakest.key
  if (weakest.key === 'docent') {
    const subs = Object.entries(scores.subdimensions) as [string, number][]
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
    recommendation: firstStepRecommendations[recommendationKey],
  }
}
