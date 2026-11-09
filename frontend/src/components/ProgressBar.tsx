type ProgressBarProps = {
  value: number
  label: string
  className?: string
}

function ProgressBar({ value, label, className = '' }: ProgressBarProps) {
  const progress = Math.max(0, Math.min(100, value))

  return (
    <div
      className={`progress-track ${className}`.trim()}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <span className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
