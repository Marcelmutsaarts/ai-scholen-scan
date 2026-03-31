import type { RecommendedProduct } from '../utils/scoring'

interface TrainingRecommendationsProps {
  recommendations: RecommendedProduct[]
}

export default function TrainingRecommendations({ recommendations }: TrainingRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="font-semibold text-lg text-black mb-4">Scholingsadvies</h3>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <p className="text-sm text-body">
            Jullie school scoort op alle dimensies hoog. Complimenten! Op dit moment zien wij geen directe scholingsbehoefte. Mocht je behoefte hebben aan een sparringpartner om jullie voorsprong vast te houden, neem dan gerust contact met ons op.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg text-black mb-2">Scholingsadvies</h3>
      <p className="text-sm text-body mb-4">
        Op basis van jullie scores adviseren wij de volgende stappen om de AI-geletterdheid op jullie school te versterken.
      </p>

      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-purple-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
              <h4 className="font-semibold text-purple-800 text-sm">{rec.name}</h4>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                {rec.format}
              </span>
            </div>
            <p className="text-sm text-body mb-3 leading-relaxed">
              {rec.reason}
            </p>
            <p className="text-xs text-purple-600 leading-relaxed">
              {rec.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
