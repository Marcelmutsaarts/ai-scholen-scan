interface Finding {
  label: string
  score: number
  description: string
}

interface KeyFindingsProps {
  findings: {
    strongest: Finding
    weakest: Finding
    recommendation: string
  }
}

export default function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="space-y-4 mb-8">
      <h3 className="font-semibold text-lg">Kernbevindingen</h3>

      <div className="bg-green-50 rounded-xl p-5 border border-green-100">
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl mt-0.5">&#9650;</span>
          <div>
            <p className="font-medium text-green-800 text-sm mb-1">
              Sterkste dimensie: {findings.strongest.label} ({findings.strongest.score.toFixed(1)})
            </p>
            <p className="text-sm text-body">{findings.strongest.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
        <div className="flex items-start gap-3">
          <span className="text-amber-600 text-xl mt-0.5">&#9660;</span>
          <div>
            <p className="font-medium text-amber-800 text-sm mb-1">
              Grootste groeikans: {findings.weakest.label} ({findings.weakest.score.toFixed(1)})
            </p>
            <p className="text-sm text-body">{findings.weakest.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <div className="flex items-start gap-3">
          <span className="text-purple-400 text-xl mt-0.5">&#10148;</span>
          <div>
            <p className="font-medium text-purple-800 text-sm mb-1">Aanbevolen eerste stap</p>
            <p className="text-sm text-body">{findings.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
