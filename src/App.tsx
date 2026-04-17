import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import StartPage from './pages/StartPage'
import Puzzle1Page from './pages/Puzzle1Page'
import Puzzle2Page from './pages/Puzzle2Page'
import EndPage from './pages/EndPage'

type Screen = 'start' | 'puzzle1' | 'puzzle2' | 'end'

const SCREEN_PROGRESS: Record<Screen, number> = {
  start: 0,
  puzzle1: 1,
  puzzle2: 2,
  end: 3,
}

const SCREEN_LABELS: Record<Screen, string> = {
  start: 'Bereit',
  puzzle1: 'Rätsel 1 – Binärzahlen',
  puzzle2: 'Rätsel 2 – Caesar',
  end: 'Abgeschlossen',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const start = useCallback(() => {
    setElapsed(0)
    setRunning(true)
    setScreen('puzzle1')
  }, [])

  const solvePuzzle1 = useCallback(() => setScreen('puzzle2'), [])

  const solvePuzzle2 = useCallback(() => {
    setRunning(false)
    setScreen('end')
  }, [])

  const restart = useCallback(() => {
    setScreen('start')
    setElapsed(0)
    setRunning(false)
  }, [])

  const progress = SCREEN_PROGRESS[screen]

  return (
    <div className="app-wrapper">
      <Header elapsed={elapsed} />
      {screen !== 'start' && (
        <ProgressBar
          current={progress}
          total={3}
          label={SCREEN_LABELS[screen]}
        />
      )}
      {screen === 'start'   && <StartPage   onStart={start} />}
      {screen === 'puzzle1' && <Puzzle1Page onSolve={solvePuzzle1} />}
      {screen === 'puzzle2' && <Puzzle2Page onSolve={solvePuzzle2} />}
      {screen === 'end'     && <EndPage     elapsed={elapsed} onRestart={restart} />}
    </div>
  )
}
