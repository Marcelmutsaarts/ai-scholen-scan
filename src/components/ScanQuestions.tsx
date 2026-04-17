import { questions, getSectionMeta } from '../data/questions'

interface ScanQuestionsProps {
  section: string
  onderwijstype?: string
  answers: Record<number, number>
  onAnswer: (questionId: number, score: number) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function ScanQuestions({ section, onderwijstype, answers, onAnswer, onNext, onPrev, isFirst, isLast }: ScanQuestionsProps) {
  const meta = getSectionMeta(section, onderwijstype)
  const sectionQuestions = questions.filter(q => meta.questionIds.includes(q.id))
  const allAnswered = sectionQuestions.every(q => answers[q.id] !== undefined)

  return (
    <div className="animate-fade-in max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">{meta.title}</h2>
        <p className="text-body">{meta.subtitle}</p>
        {meta.footnote && (
          <p className="text-xs text-gray-400 italic mt-1">{meta.footnote}</p>
        )}
      </div>

      <div className="space-y-6">
        {sectionQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="font-medium text-sm text-gray-800 mb-4">
              <span className="text-purple-400 mr-2">{idx + 1}.</span>
              {q.text}
            </p>
            <div className="space-y-2">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.score
                return (
                  <label
                    key={opt.score}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                      selected
                        ? 'bg-purple-50 border-purple-300 shadow-sm'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={selected}
                      onChange={() => onAnswer(q.id, opt.score)}
                      className="mt-0.5 accent-purple-400"
                    />
                    <span className="text-sm text-body leading-relaxed">{opt.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        {!isFirst ? (
          <button
            onClick={onPrev}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-body font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Vorige
          </button>
        ) : <div />}
        <button
          onClick={onNext}
          disabled={!allAnswered}
          className={`gradient-btn text-white font-medium px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
            !allAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
        >
          {isLast ? 'Bekijk resultaten' : 'Volgende'}
        </button>
      </div>
    </div>
  )
}
