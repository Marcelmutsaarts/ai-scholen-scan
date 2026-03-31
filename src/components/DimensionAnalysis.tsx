import type { DimensionAnalysis as DimensionAnalysisType } from '../utils/scoring'

interface DimensionAnalysisProps {
  analyses: DimensionAnalysisType[]
}

const tierColors: Record<string, string> = {
  startend: 'border-red-300 bg-red-50',
  verkennend: 'border-amber-300 bg-amber-50',
  opbouwend: 'border-yellow-300 bg-yellow-50',
  integrerend: 'border-green-300 bg-green-50',
  voorlopend: 'border-emerald-400 bg-emerald-50',
}

const tierBadgeColors: Record<string, string> = {
  startend: 'bg-red-100 text-red-700',
  verkennend: 'bg-amber-100 text-amber-700',
  opbouwend: 'bg-yellow-100 text-yellow-700',
  integrerend: 'bg-green-100 text-green-700',
  voorlopend: 'bg-emerald-100 text-emerald-700',
}

export default function DimensionAnalysis({ analyses }: DimensionAnalysisProps) {
  const mainDimensions = analyses.filter(a => !a.isSubdimension)

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg text-black mb-4">Analyse per dimensie</h3>

      <div className="space-y-4">
        {mainDimensions.map(dim => {
          const subdimensions = analyses.filter(a => a.isSubdimension && a.parentDimension === dim.key)

          return (
            <div key={dim.key}>
              <AnalysisCard analysis={dim} />

              {subdimensions.length > 0 && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-purple-100 pl-4">
                  {subdimensions.map(sub => (
                    <AnalysisCard key={sub.key} analysis={sub} compact />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AnalysisCard({ analysis, compact }: { analysis: DimensionAnalysisType; compact?: boolean }) {
  const borderColor = tierColors[analysis.tier] || 'border-gray-200 bg-white'
  const badgeColor = tierBadgeColors[analysis.tier] || 'bg-gray-100 text-gray-700'

  return (
    <div className={`rounded-xl border-l-4 ${borderColor} ${compact ? 'p-4' : 'p-5'} shadow-sm`}>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h4 className={`font-semibold text-black ${compact ? 'text-sm' : 'text-base'}`}>
          {analysis.label}
        </h4>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            {analysis.tierLabel}
          </span>
          <span className="text-sm font-medium text-body">
            {analysis.score.toFixed(1)}/4.0
          </span>
        </div>
      </div>
      <p className={`text-body leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
        {analysis.narrative}
      </p>
    </div>
  )
}
