export default function ProgressBar({ value = 0, label = 'Progresso', color = 'primary' }) {
  const percentage = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div className="progress-wrap">
      <div className="progress-label"><span>{label}</span><strong>{percentage}%</strong></div>
      <div className={`progress-track progress-${color}`} role="progressbar" aria-label={label} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
