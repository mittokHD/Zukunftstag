import { useState, useEffect } from 'react'
import PuzzleInput from '../components/PuzzleInput'
import { BINARY_VALUES, NUMBER_TO_CHAR, PUZZLE1_ANSWER } from '../utils/cipher'

interface Puzzle1PageProps {
  onSolve: () => void
}

export default function Puzzle1Page({ onSolve }: Puzzle1PageProps) {
  const [showHint, setShowHint] = useState(false)
  const [showMapping, setShowMapping] = useState(false)
  const [showValues, setShowValues] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'z' || e.key === 'Z') {
        setShowValues((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <main className="page">
      <div className="card">
        <div className="page-subtitle">RÄTSEL 1 / 2</div>
        <h2 className="page-title">Binärzahlen entschlüsseln</h2>

        <div className="story-box">
          <p>
            Der Hacker hat auf einer Notiz folgende Binärzahlen hinterlassen.
            Sie sind Teil des USB-Passworts. Deine Aufgabe: Finde die versteckte
            Buchstaben-Kombination.
          </p>
        </div>

        <div className="section-title">
          Gefundene Binärzahlen
          <span style={{ marginLeft: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
            [Taste <strong style={{ color: showValues ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>Z</strong> zum {showValues ? 'Ausblenden' : 'Einblenden'} der Werte]
          </span>
        </div>
        <div className="binary-grid">
          {BINARY_VALUES.map((item) => (
            <div className="binary-item" key={item.binary}>
              <span className="binary-value">{item.binary}</span>
              {showValues && (
                <span className="decimal-value" style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>
                  = {item.decimal}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="divider" />

        <button className="hint-toggle" onClick={() => setShowHint(!showHint)}>
          {showHint ? '▼' : '►'} HINWEIS ANZEIGEN
        </button>

        {showHint && (
          <div className="hint-box">
            <ul>
              <li>Zähle die zwei <strong style={{ color: 'var(--accent-orange)' }}>kleinsten</strong> Zahlen zusammen</li>
              <li>Zähle die zwei <strong style={{ color: 'var(--accent-orange)' }}>größten</strong> Zahlen zusammen</li>
              <li>Verwende die Buchstaben-Tabelle, um beide Summen in Buchstaben umzuwandeln</li>
              <li>Kombiniere die Buchstaben → das ist dein Passwort</li>
            </ul>
          </div>
        )}

        <div className="divider" />

        <button className="hint-toggle" onClick={() => setShowMapping(!showMapping)} style={{ color: 'var(--accent-cyan)' }}>
          {showMapping ? '▼' : '►'} BUCHSTABEN-TABELLE {showMapping ? 'AUSBLENDEN' : 'ANZEIGEN'}
        </button>

        {showMapping && (
          <div className="mapping-table-wrapper" style={{ marginTop: '0.75rem' }}>
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>Zahl</th>
                  <th>Buchstabe</th>
                  <th>Zahl</th>
                  <th>Buchstabe</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(NUMBER_TO_CHAR)
                  .filter((_, i) => i % 2 === 0)
                  .map(([num], i) => {
                    const n1 = parseInt(num)
                    const n2 = n1 + 1
                    return (
                      <tr key={n1}>
                        <td>{n1}</td>
                        <td>{NUMBER_TO_CHAR[n1]}</td>
                        <td>{NUMBER_TO_CHAR[n2] !== undefined ? n2 : ''}</td>
                        <td>{NUMBER_TO_CHAR[n2] ?? ''}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )}

        <div className="divider" />

        <PuzzleInput
          answer={PUZZLE1_ANSWER}
          onSuccess={onSolve}
          placeholder="Buchstaben-Kombination..."
          label="PASSWORT-EINGABE"
        />
      </div>
    </main>
  )
}
