import { useState, useCallback } from 'react'
import Header from './components/Header'
import WelcomePage from './components/WelcomePage'
import ContextForm from './components/ContextForm'
import ScanQuestions from './components/ScanQuestions'
import ResultsPage from './components/ResultsPage'
import { useLocalStorage } from './hooks/useLocalStorage'

type AppState = 'welcome' | 'context' | 'visie' | 'docent' | 'onderwijs' | 'infra' | 'results'

const scanSections: AppState[] = ['context', 'visie', 'docent', 'onderwijs', 'infra']

export default function App() {
  const [context, setContext] = useLocalStorage<Record<string, string | string[]>>('scan-context', {})
  const [answers, setAnswers] = useLocalStorage<Record<number, number>>('scan-answers', {})
  const [hasCompleted, setCompleted] = useLocalStorage<boolean>('scan-completed', false)

  const [state, setState] = useState<AppState>(hasCompleted ? 'results' : 'welcome')

  const handleContextChange = useCallback((id: string, value: string | string[]) => {
    setContext(prev => ({ ...prev, [id]: value }))
  }, [setContext])

  const handleAnswer = useCallback((questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }))
  }, [setAnswers])

  const currentSectionIndex = scanSections.indexOf(state)
  const totalSteps = scanSections.length

  const goNext = useCallback(() => {
    if (state === 'context') setState('visie')
    else if (state === 'visie') setState('docent')
    else if (state === 'docent') setState('onderwijs')
    else if (state === 'onderwijs') setState('infra')
    else if (state === 'infra') {
      setCompleted(true)
      setState('results')
    }
    window.scrollTo(0, 0)
  }, [state, setCompleted])

  const goPrev = useCallback(() => {
    if (state === 'visie') setState('context')
    else if (state === 'docent') setState('visie')
    else if (state === 'onderwijs') setState('docent')
    else if (state === 'infra') setState('onderwijs')
    window.scrollTo(0, 0)
  }, [state])

  const handleRestart = useCallback(() => {
    setContext({})
    setAnswers({})
    setCompleted(false)
    setState('welcome')
    window.scrollTo(0, 0)
  }, [setContext, setAnswers, setCompleted])

  const showProgress = state !== 'welcome' && state !== 'results'

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header
        currentStep={currentSectionIndex + 1}
        totalSteps={totalSteps}
        showProgress={showProgress}
      />

      <main className="pb-12">
        {state === 'welcome' && (
          <WelcomePage onStart={() => setState('context')} />
        )}

        {state === 'context' && (
          <ContextForm
            data={context}
            onChange={handleContextChange}
            onNext={goNext}
          />
        )}

        {(['visie', 'docent', 'onderwijs', 'infra'] as const).includes(state as 'visie' | 'docent' | 'onderwijs' | 'infra') &&
          state !== 'welcome' && state !== 'context' && state !== 'results' && (
          <ScanQuestions
            section={state}
            onderwijstype={context.onderwijstype as string | undefined}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={goNext}
            onPrev={goPrev}
            isFirst={state === 'visie'}
            isLast={state === 'infra'}
          />
        )}

        {state === 'results' && (
          <ResultsPage
            answers={answers}
            context={context}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
