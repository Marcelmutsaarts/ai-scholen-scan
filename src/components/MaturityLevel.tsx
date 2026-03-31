interface MaturityLevelProps {
  maturity: { label: string; description: string }
  score: number
}

export default function MaturityLevel({ maturity, score }: MaturityLevelProps) {
  return (
    <div className="animate-scale-in bg-white rounded-xl border-2 border-purple-200 p-8 mb-8 text-center shadow-sm">
      <p className="text-sm font-medium text-purple-400 uppercase tracking-wide mb-2">Volwassenheidsniveau</p>
      <h2 className="text-4xl font-bold text-purple-800 mb-1">{maturity.label}</h2>
      <p className="text-2xl font-semibold text-purple-400 mb-4">{score.toFixed(1)} / 4.0</p>
      <p className="text-body max-w-md mx-auto">{maturity.description}</p>
    </div>
  )
}
