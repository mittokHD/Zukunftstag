import { useState, type KeyboardEvent } from 'react'
import { checkAnswer } from '../utils/cipher'

interface PuzzleInputProps {
  answer: string
  onSuccess: () => void
  placeholder?: string
  label?: string
}

export default function PuzzleInput({ answer, onSuccess, placeholder = 'Antwort eingeben...', label }: PuzzleInputProps) {
  const [value, setValue] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'success'>('idle')
  const [attempts, setAttempts] = useState(0)

  function submit() {
    if (!value.trim()) return
    if (checkAnswer(value, answer)) {
      setState('success')
      setTimeout(onSuccess, 900)
    } else {
      setState('error')
      setAttempts((a) => a + 1)
      setTimeout(() => setState('idle'), 1500)
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit()
  }

  return (
    <div>
      {label && <div className="section-title" style={{ marginBottom: '0.5rem' }}>{label}</div>}
      <div className="input-group">
        <input
          className={`puzzle-input ${state === 'error' ? 'error' : ''} ${state === 'success' ? 'success' : ''}`}
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={state === 'success'}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={state === 'success' || !value.trim()}
        >
          Bestätigen
        </button>
      </div>
      {state === 'error' && (
        <div className="feedback error">
          ✗ Falsch – versuche es erneut.{attempts >= 3 ? ' (Tipp: nutze die Hinweise oben)' : ''}
        </div>
      )}
      {state === 'success' && (
        <div className="feedback success">
          ✓ Richtig! Weiter geht's…
        </div>
      )}
    </div>
  )
}
