import { formatTime } from '../utils/cipher'

interface EndPageProps {
  elapsed: number
  onRestart: () => void
}

export default function EndPage({ elapsed, onRestart }: EndPageProps) {
  return (
    <main className="page">
      <div className="card glow end-screen">
        <div className="success-icon">🔓</div>

        <h2 className="end-title">USB-STICK ENTSPERRT</h2>
        <p className="end-subtitle">// MISSION ERFOLGREICH ABGESCHLOSSEN //</p>

        <div className="story-box" style={{ textAlign: 'left' }}>
          <p>
            <strong>ZUGRIFF GEWÄHRT.</strong>
          </p>
          <p>
            Alle verschlüsselten Daten wurden erfolgreich wiederhergestellt.
            Die Behörden haben nun Zugriff auf die gestohlenen Dateien – der Hacker
            wird für seine Taten zur Verantwortung gezogen.
          </p>
          <p>
            <strong>Hervorragende Arbeit, Agent.</strong> Ohne deine Fähigkeiten
            wären die Daten für immer verloren gewesen.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">2/2</span>
            <span className="stat-label">Rätsel gelöst</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--accent-green)' }}>
              {formatTime(elapsed)}
            </span>
            <span className="stat-label">Benötigte Zeit</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>E26I+HUND</span>
            <span className="stat-label">Passwörter</span>
          </div>
        </div>

        <ul className="objectives">
          <li className="done">Binärzahlen entschlüsselt ✓</li>
          <li className="done">Caesar-Code geknackt ✓</li>
          <li className="done">USB-Stick entsperrt ✓</li>
        </ul>

        <button className="btn btn-secondary" onClick={onRestart} style={{ marginTop: '1.5rem' }}>
          ↺ NEU STARTEN
        </button>
      </div>
    </main>
  )
}
