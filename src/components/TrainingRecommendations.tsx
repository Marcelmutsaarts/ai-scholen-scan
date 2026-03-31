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
        Op basis van jullie profiel zien wij de volgende mogelijkheden om de AI-geletterdheid op jullie school te versterken.
      </p>

      <div className="space-y-3">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-body leading-relaxed">
              {rec.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
