interface EUReadinessProps {
  percentage: number
}

export default function EUReadiness({ percentage }: EUReadinessProps) {
  const clamped = Math.max(0, Math.min(100, percentage))
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="45" fill="none" stroke="#ebdfff" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#a15df5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000"
            />
            <text x="60" y="55" textAnchor="middle" className="fill-purple-800 text-xl font-bold" style={{ fontSize: '24px', fontFamily: 'Poppins' }}>
              {clamped}%
            </text>
            <text x="60" y="72" textAnchor="middle" className="fill-body" style={{ fontSize: '10px', fontFamily: 'Poppins' }}>
              readiness
            </text>
          </svg>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">EU AI Act Readiness</h3>
          <p className="text-sm text-body leading-relaxed">
            De EU AI Act (Artikel 4) verplicht sinds februari 2025 dat organisaties zorgen voor AI-geletterdheid bij medewerkers. Op basis van jullie scores schatten wij de huidige readiness op <strong>{clamped}%</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
