interface HeaderProps {
  currentStep: number
  totalSteps: number
  showProgress: boolean
}

export default function Header({ currentStep, totalSteps, showProgress }: HeaderProps) {
  const progress = ((currentStep) / totalSteps) * 100

  return (
    <header className="bg-white border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="https://aivoordocenten.nl" target="_blank" rel="noopener noreferrer">
          <img
            src={import.meta.env.BASE_URL + 'ai-voor-docenten-logo.png'}
            alt="AI voor Docenten"
            className="h-10 w-10"
          />
        </a>
        <span className="text-sm font-medium text-purple-800">AI Maturity Scan</span>
      </div>
      {showProgress && (
        <div className="h-1 bg-purple-100">
          <div
            className="h-full bg-purple-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  )
}
