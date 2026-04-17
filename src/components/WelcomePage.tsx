import { TOTAL_QUESTIONS } from '../data/questions'

interface WelcomePageProps {
  onStart: () => void
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-black">
        AI Maturity Scan
      </h1>

      <div className="space-y-5 text-body leading-relaxed mb-10">
        <p>
          AI raakt het onderwijs op meerdere plekken tegelijk: de visie en afspraken die een school maakt, de AI-geletterdheid van docenten, de AI-vaardigheid van leerlingen of studenten, en de infrastructuur die dat ondersteunt. Deze scan brengt in kaart waar jullie school op elk van deze thema's staat.
        </p>
        <p>
          Je beantwoordt {TOTAL_QUESTIONS} vragen en krijgt direct een analyserapport per thema, met suggesties voor vervolgstappen. De scan is bedoeld om ingevuld te worden door iemand met overzicht over het onderwijs en de docenten &mdash; een schoolleider, teamleider, ICT-coördinator of AI-kartrekker. Eén persoon is voldoende.
        </p>
        <p className="text-sm text-gray-500">
          Invullen duurt ongeveer vijftien minuten. Antwoorden blijven lokaal in je browser; er wordt niets opgeslagen of verzonden.
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
