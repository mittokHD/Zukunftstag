interface StartPageProps {
  onStart: () => void
}

export default function StartPage({ onStart }: StartPageProps) {
  return (
    <main className="page">
      <div className="card glow" style={{ textAlign: 'center' }}>
        <div className="start-hero">
          <h1 className="glitch-title" data-text="ESCAPE ROOM">ESCAPE ROOM</h1>
          <p className="subtitle">// USB-ENTSCHLÜSSELUNG //</p>
        </div>

        <div className="usb-visual">
          <span className="usb-icon">🔐</span>
        </div>

        <div className="story-box" style={{ textAlign: 'left' }}>
          <p>
            <strong>ALARM – DATENLECK ERKANNT.</strong>
          </p>
          <p>
            Wir sind bei <strong style={{ color: 'var(--accent-cyan)' }}>IAV</strong> und
            haben die Aufgabe bekommen, einen sichergestellten{' '}
            <strong>verschlüsselten USB-Stick</strong> zu entschlüsseln.
          </p>
          <p>
            Ein Hacker hat das System infiltriert, alle kritischen Daten gestohlen
            und auf diesem USB-Stick gesichert. Der Hacker wurde von der Polizei gefasst –
            doch die Daten sind weiterhin gesperrt. Er hat nur{' '}
            <strong>kryptische Eselsbrücken</strong> hinterlassen.
          </p>
          <p>
            <strong>Deine Mission:</strong> Entschlüssele die Hinweise, rekonstruiere
            die Passwörter und entsperre den USB-Stick – bevor die Daten für immer
            verloren gehen.
          </p>
        </div>

        <ul className="objectives">
          <li>Rätsel 1: Binärzahlen entschlüsseln</li>
          <li>Rätsel 2: Caesar-Verschlüsselung knacken</li>
          <li>USB-Stick entsperren</li>
        </ul>

        <button className="btn btn-primary btn-large" onClick={onStart}>
          ► MISSION STARTEN
        </button>
      </div>
    </main>
  )
}
