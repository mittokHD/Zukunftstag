import { useState, useEffect } from 'react'
import PuzzleInput from '../components/PuzzleInput'
import { BINARY_VALUES, NUMBER_TO_CHAR, PUZZLE1_ANSWER } from '../utils/cipher'

interface Puzzle1PageProps {
  onSolve: () => void
}

const STEPS = [
  'Wandle die Binärzahlen in Dezimalzahlen um.',
  'Sortiere die vier Dezimalzahlen von klein nach groß.',
  '1. Code-Wert = Summe der zwei kleinsten Zahlen.',
  '2. Code-Wert = Summe der zwei größten Zahlen.',
  '3. Code-Wert = Summe aller vier Zahlen.',
  '4. Code-Wert = (3. Code-Wert) ÷ (1. Code-Wert) — muss ohne Rest aufgehen!',
  'Wandle alle 4 Code-Werte mit der Codetabelle in Buchstaben/Ziffern um.',
]

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
        <h2 className="page-title">Der Hacker und die Binärzahlen</h2>

        <div className="story-box">
          <p>
            Der Hacker hat 4 Binärzahlen hinterlassen. Daraus entsteht ein geheimer{' '}
            <strong>4-stelliger Code</strong> aus Buchstaben und Zahlen.
          </p>
        </div>

        <div className="section-title">
          Binärzahlen (Computersprache)
          <span style={{ marginLeft: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
            [Taste <strong style={{ color: showValues ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>Z</strong> zum {showValues ? 'Ausblenden' : 'Einblenden'} der Dezimalwerte]
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

        <div className="section-title">Deine Schritte</div>
        <ol style={{ paddingLeft: '1.25rem', margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {STEPS.map((step, i) => (
            <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {step}
            </li>
          ))}
        </ol>

        <div className="divider" />

        <button className="hint-toggle" onClick={() => setShowHint(!showHint)}>
          {showHint ? '▼' : '►'} LÖSUNGSHINWEISE ANZEIGEN
        </button>

        {showHint && (
          <div className="hint-box" style={{ marginTop: '0.75rem' }}>
            <ul>
              <li>Binär → Dezimal: 1101=13 · 0001=1 · 1111=15 · 0011=3</li>
              <li>Sortiert: 1 · 3 · 13 · 15</li>
              <li>1. Code-Wert = 1 + 3 = <strong style={{ color: 'var(--accent-orange)' }}>4</strong></li>
              <li>2. Code-Wert = 13 + 15 = <strong style={{ color: 'var(--accent-orange)' }}>28</strong></li>
              <li>3. Code-Wert = 1 + 3 + 13 + 15 = <strong style={{ color: 'var(--accent-orange)' }}>32</strong></li>
              <li>4. Code-Wert = 32 ÷ 4 = <strong style={{ color: 'var(--accent-orange)' }}>8</strong></li>
            </ul>
          </div>
        )}

        <div className="divider" />

        <button className="hint-toggle" onClick={() => setShowMapping(!showMapping)} style={{ color: 'var(--accent-cyan)' }}>
          {showMapping ? '▼' : '►'} CODETABELLE {showMapping ? 'AUSBLENDEN' : 'ANZEIGEN'}
        </button>

        {showMapping && (
          <div className="mapping-table-wrapper" style={{ marginTop: '0.75rem' }}>
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>Zahl</th>
                  <th>Zeichen</th>
                  <th>Zahl</th>
                  <th>Zeichen</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(NUMBER_TO_CHAR)
                  .filter((_, i) => i % 2 === 0)
                  .map(([num]) => {
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
          placeholder="4-stelligen Code eingeben..."
          label="GEHEIM-CODE (4 Stellen)"
        />
      </div>
    </main>
  )
}
