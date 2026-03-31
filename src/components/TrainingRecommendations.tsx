import type { RecommendedProduct } from '../utils/scoring'

interface TrainingRecommendationsProps {
  recommendations: RecommendedProduct[]
}

export default function TrainingRecommendations({ recommendations }: TrainingRecommendationsProps) {
  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg text-black mb-2">Hoe verder?</h3>
      <p className="text-sm text-body mb-4">
        Op basis van jullie profiel zien wij de volgende mogelijkheden om de AI-geletterdheid te versterken.
      </p>

      <div className="space-y-3">
        {recommendations.map(rec => {
          // Split reason into first sentence (diagnose) and rest (recept)
          const firstDot = rec.reason.indexOf('. ')
          const diagnose = firstDot > 0 ? rec.reason.substring(0, firstDot + 1) : rec.reason
          const recept = firstDot > 0 ? rec.reason.substring(firstDot + 2) : ''

          return (
            <div key={rec.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm text-body leading-relaxed">
                <span className="font-semibold text-gray-800">{diagnose}</span>
                {recept && ` ${recept}`}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                AI voor Docenten — {rec.name}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
