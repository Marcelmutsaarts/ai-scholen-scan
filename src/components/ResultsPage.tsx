import { useMemo } from 'react'
import {
  calculateScores,
  getMaturityLevel,
  getKeyFindings,
  getDimensionAnalysis,
  getProductRecommendations,
  type Scores,
} from '../utils/scoring'
import { getDimensionLabel } from '../data/questions'
import RadarChart from './RadarChart'
import SubRadarChart from './SubRadarChart'
import MaturityLevel from './MaturityLevel'
import EUReadiness from './EUReadiness'
import KeyFindings from './KeyFindings'
import DimensionAnalysis from './DimensionAnalysis'
import TrainingRecommendations from './TrainingRecommendations'
import PDFDownload from './PDFDownload'

interface ResultsPageProps {
  answers: Record<number, number>
  context: Record<string, string | string[]>
  onRestart: () => void
}

export default function ResultsPage({ answers, context, onRestart }: ResultsPageProps) {
  const onderwijstype = context.onderwijstype as string | undefined
  const scores = useMemo(() => calculateScores(answers), [answers])
  const maturity = useMemo(() => getMaturityLevel(scores.total), [scores])
  const findings = useMemo(() => getKeyFindings(scores, onderwijstype), [scores, onderwijstype])
  const analyses = useMemo(() => getDimensionAnalysis(scores, onderwijstype), [scores, onderwijstype])
  const productRecs = useMemo(() => getProductRecommendations(scores, context), [scores, context])

  const docentPoints = [
    { label: 'A: Mindset', value: scores.subdimensions.mindset },
    { label: 'B: Ethiek', value: scores.subdimensions.ethiek },
    { label: 'C: Kennis', value: scores.subdimensions.kennis },
    { label: 'D: Pedagogiek', value: scores.subdimensions.pedagogiek },
    { label: 'E: Agency', value: scores.subdimensions.agency },
  ]
  const kiesPoints = [
    { label: 'K: Kiezen', value: scores.kiesSubdimensions.kiezen },
    { label: 'I: Instrueren', value: scores.kiesSubdimensions.instrueren },
    { label: 'E: Evalueren', value: scores.kiesSubdimensions.evalueren },
    { label: 'S: Spelregels', value: scores.kiesSubdimensions.spelregels },
  ]

  return (
    <div className="animate-fade-in max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-black">Analyserapport</h1>
        <p className="text-lg text-body">
          {(context.schoolnaam as string) || 'Jullie school'} — {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div id="results-content">
        <MaturityLevel maturity={maturity} score={scores.total} />

        <EUReadiness percentage={scores.euReadiness} />

        {/* Radar Charts */}
        <div id="pdf-chart-overview" className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-center mb-4 text-black">Overzicht dimensies</h3>
          <RadarChart scores={scores} onderwijstype={onderwijstype} />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div id="pdf-chart-docent" className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-center mb-1 text-black">AI-geletterdheid docenten</h3>
            <p className="text-xs text-center text-gray-500 mb-3">5 domeinen (Raamwerk AI-geletterdheid)</p>
            <SubRadarChart points={docentPoints} />
          </div>
          <div id="pdf-chart-kies" className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-center mb-1 text-black">{getDimensionLabel('onderwijs', onderwijstype)}</h3>
            <p className="text-xs text-center text-gray-500 mb-3">4 onderdelen (raamwerk KIES)</p>
            <SubRadarChart points={kiesPoints} />
          </div>
        </div>

        <ScoreDetails scores={scores} onderwijstype={onderwijstype} />

        <DimensionAnalysis analyses={analyses} />

        <KeyFindings findings={findings} />

        <TrainingRecommendations recommendations={productRecs} />
      </div>

      {/* CTA en acties */}
      <div className="mt-8 space-y-4">
        <PDFDownload
          scores={scores}
          context={context}
          maturity={maturity}
          findings={findings}
          analyses={analyses}
          productRecommendations={productRecs}
        />

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold text-purple-800 mb-2">Laten we even samen kijken?</h3>
          <p className="text-sm text-body mb-3 leading-relaxed">
            Dit rapport vertelt een deel van het verhaal. De gesprekken die erachter zitten — waarom scoren jullie hier zo, wat zijn de logische volgende stappen, wat past bij jullie school — doen we het liefst persoonlijk. Stuur het PDF-rapport naar <a href="mailto:info@aivoordocenten.nl" className="text-purple-600 font-medium hover:text-purple-800 underline">info@aivoordocenten.nl</a> en we plannen vrijblijvend een half uur in om samen te kijken.
          </p>
          <p className="text-xs text-gray-500">
            Geen verplichtingen, geen verkooppraatje. We denken mee en waar het past vertellen we wat we kunnen betekenen.
          </p>
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

function ScoreDetails({ scores, onderwijstype }: { scores: Scores; onderwijstype?: string }) {
  const dims = [
    { label: getDimensionLabel('visie', onderwijstype), score: scores.visie, color: 'bg-purple-400' },
    { label: getDimensionLabel('docent', onderwijstype), score: scores.docent, color: 'bg-purple-500' },
    { label: getDimensionLabel('onderwijs', onderwijstype), score: scores.onderwijs, color: 'bg-purple-600' },
    { label: getDimensionLabel('infra', onderwijstype), score: scores.infra, color: 'bg-purple-700' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
      <h3 className="font-semibold mb-4 text-black">Scores per dimensie</h3>
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
