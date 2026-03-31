import { questions } from '../data/questions'
import { maturityLevels, dimensionDescriptions, firstStepRecommendations } from '../data/recommendations'

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

  // For recommendation: if docent is lowest, find the lowest subdimension
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
