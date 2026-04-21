import { useState } from 'react'
import PuzzleInput from '../components/PuzzleInput'
import { PUZZLE2_ENCRYPTED, PUZZLE2_SHIFT, PUZZLE2_ANSWER } from '../utils/cipher'

interface Puzzle2PageProps {
  onSolve: () => void
}

export default function Puzzle2Page({ onSolve }: Puzzle2PageProps) {
  const [showHint, setShowHint] = useState(false)

  const shiftExample = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <main className="page">
      <div className="card">
        <div className="page-subtitle">RÄTSEL 2 / 2</div>
        <h2 className="page-title">Caesar-Verschlüsselung</h2>

        <div className="story-box">
          <p>
            Auf dem Schreibtisch des Hackers liegt ein Zettel mit einem weiteren
            Codewort. Es wurde mit einer klassischen <strong>Caesar-Verschlüsselung</strong>{' '}
            gesichert – jeder Buchstabe wurde im Alphabet um eine bestimmte Anzahl
            von Schritten verschoben.
          </p>
          <p style={{ marginTop: '0.75rem', color: 'var(--accent-orange)' }}>
            <strong>Tipp:</strong> Die Lieblingszahl vom Hacker ist <strong>{PUZZLE2_SHIFT}</strong>.
          </p>
        </div>

        <div className="section-title">Verschlüsseltes Codewort</div>
        <div className="code-block" style={{ fontSize: '2rem', letterSpacing: '0.4em', textAlign: 'center' }}>
          {PUZZLE2_ENCRYPTED}
        </div>

        <div className="divider" />

        <button className="hint-toggle" onClick={() => setShowHint(!showHint)}>
          {showHint ? '▼' : '►'} HINWEIS ANZEIGEN
        </button>

        {showHint && (
          <div className="hint-box">
            <ul>
              <li>Jeder Buchstabe wurde um <strong style={{ color: 'var(--accent-orange)' }}>{PUZZLE2_SHIFT} Schritte</strong> im Alphabet nach vorne verschoben</li>
              <li>Um zu entschlüsseln: gehe {PUZZLE2_SHIFT} Schritte <strong style={{ color: 'var(--accent-orange)' }}>zurück</strong></li>
              <li>Beispiel: {shiftExample.slice(0, 3).map((l, i) => `${l} → ${shiftExample[i + PUZZLE2_SHIFT]}`).join(', ')}</li>
            </ul>
          </div>
        )}

        {showHint && (
          <div className="code-block" style={{ marginTop: '0.75rem' }}>
            <div className="section-title" style={{ marginBottom: '0.5rem' }}>Alphabet-Entschlüsselung</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((ch) => {
                const dec = String.fromCharCode(((ch.charCodeAt(0) - 65 - PUZZLE2_SHIFT + 26) % 26) + 65)
                return (
                  <span key={ch} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', minWidth: '1.8rem', gap: '2px' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem' }}>{ch}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>↓</span>
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem' }}>{dec}</span>
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <div className="divider" />

        <PuzzleInput
          answer={PUZZLE2_ANSWER}
          onSuccess={onSolve}
          placeholder="Entschlüsseltes Wort..."
          label="PASSWORT-EINGABE"
        />
      </div>
    </main>
  )
}
