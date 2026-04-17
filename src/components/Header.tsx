import { formatTime } from '../utils/cipher'

interface HeaderProps {
  elapsed: number
}

export default function Header({ elapsed }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="logo">
        ESCAPE<span>_</span>ROOM <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem' }}>v1.0</span>
      </div>
      <div className={`timer ${elapsed > 0 && elapsed % 60 === 0 && elapsed > 300 ? 'warning' : ''}`}>
        ⏱ {formatTime(elapsed)}
      </div>
    </header>
  )
}
