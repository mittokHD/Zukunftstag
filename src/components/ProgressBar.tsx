interface ProgressBarProps {
  current: number
  total: number
  label: string
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress-bar-wrapper">
      <span className="progress-label">{label}</span>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">{pct}%</span>
    </div>
  )
}
