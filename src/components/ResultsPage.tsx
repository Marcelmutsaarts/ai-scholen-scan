import { useMemo } from 'react'
import { calculateScores, getMaturityLevel, getKeyFindings, type Scores } from '../utils/scoring'
import RadarChart from './RadarChart'
import SubRadarChart from './SubRadarChart'
import MaturityLevel from './MaturityLevel'
import EUReadiness from './EUReadiness'
import KeyFindings from './KeyFindings'
import PDFDownload from './PDFDownload'

interface ResultsPageProps {
  answers: Record<number, number>
  context: Record<string, string | string[]>
  onRestart: () => void
}

export default function ResultsPage({ answers, context, onRestart }: ResultsPageProps) {
  const scores = useMemo(() => calculateScores(answers), [answers])
  const maturity = useMemo(() => getMaturityLevel(scores.total), [scores])
  const findings = useMemo(() => getKeyFindings(scores), [scores])

  return (
    <div className="animate-fade-in max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-black">Resultaten</h1>
        <p className="text-lg text-body">
          {(context.schoolnaam as string) || 'Jullie school'} — {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div id="results-content">
        {/* Maturity Level */}
        <MaturityLevel maturity={maturity} score={scores.total} />

        {/* EU AI Act Readiness */}
        <EUReadiness percentage={scores.euReadiness} />

        {/* Radar Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-center mb-4">Overzicht dimensies</h3>
            <RadarChart scores={scores} />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-center mb-4">Docentvaardigheden</h3>
            <SubRadarChart subdimensions={scores.subdimensions} />
          </div>
        </div>

        {/* Score Details */}
        <ScoreDetails scores={scores} />

        {/* Key Findings */}
        <KeyFindings findings={findings} />
      </div>

      {/* CTA */}
      <div className="mt-8 space-y-4">
        <PDFDownload scores={scores} context={context} maturity={maturity} findings={findings} />

        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <p className="text-sm text-body mb-3">
            Wil je deze resultaten bespreken of advies over vervolgstappen?
          </p>
          <a
            href="mailto:info@aivoordocenten.nl"
            className="text-purple-400 font-medium hover:text-purple-700 transition text-sm"
          >
            Neem contact op met AI voor Docenten: info@aivoordocenten.nl
          </a>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="text-sm text-body hover:text-purple-400 transition underline cursor-pointer"
          >
            Scan opnieuw invullen
          </button>
        </div>
      </div>
    </div>
  )
}

function ScoreDetails({ scores }: { scores: Scores }) {
  const dims = [
    { label: 'Visie & Beleid', score: scores.visie, color: 'bg-purple-400' },
    { label: 'Docentvaardigheden', score: scores.docent, color: 'bg-purple-500' },
    { label: 'Onderwijs aan leerlingen', score: scores.onderwijs, color: 'bg-purple-600' },
    { label: 'Infrastructuur', score: scores.infra, color: 'bg-purple-700' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
      <h3 className="font-semibold mb-4">Scores per dimensie</h3>
      <div className="space-y-3">
        {dims.map(d => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-body">{d.label}</span>
              <span className="font-medium">{d.score.toFixed(1)} / 4.0</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${d.color} rounded-full transition-all duration-700`}
                style={{ width: `${(d.score / 4) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
