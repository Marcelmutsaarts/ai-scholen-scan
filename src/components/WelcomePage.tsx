interface WelcomePageProps {
  onStart: () => void
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto text-center py-12 px-4">
      <div className="mb-8">
        <img
          src={import.meta.env.BASE_URL + 'ai-voor-docenten-logo.png'}
          alt="AI voor Docenten"
          className="h-20 w-20 mx-auto mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          AI Maturity Scan
        </h1>
        <p className="text-lg text-body leading-relaxed mb-2">
          Ontdek in 10 minuten waar jullie school staat op het gebied van AI-geletterdheid.
        </p>
        <p className="text-body leading-relaxed">
          De scan geeft een helder beeld van jullie sterke punten en groeikansen, direct bruikbaar als startpunt voor verdere ontwikkeling.
        </p>
      </div>

      <div className="bg-purple-50 rounded-xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-purple-700 mb-3">Wat kun je verwachten?</h3>
        <ul className="space-y-2 text-sm text-body">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">&#10003;</span>
            18 vragen over visie, vaardigheden, onderwijs en infrastructuur
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">&#10003;</span>
            Visueel overzicht met spindiagrammen en volwassenheidsniveau
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">&#10003;</span>
            Concrete aanbevelingen als eerste stap
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">&#10003;</span>
            Download als PDF om te delen met het team
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl border-2 border-purple-100 p-6 mb-8 text-left">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-purple-700 mb-3">Voordat je begint</h3>
        <p className="text-sm text-body">
          De scan is bedoeld voor een schoolleider, teamleider, ICT-coördinator of AI-kartrekker. Eén persoon is genoeg. Je hebt geen account nodig en de gegevens worden alleen lokaal in je browser opgeslagen.
        </p>
      </div>

      <button
        onClick={onStart}
        className="gradient-btn text-white font-medium px-8 py-3.5 rounded-lg text-lg transition-all hover:shadow-lg cursor-pointer"
      >
        Start de scan
      </button>
    </div>
  )
}
