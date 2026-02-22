import "./ProgressBar.css";

/**
 * ProgressBar
 * @prop {number} value   - 0–100
 * @prop {string} color   - "blue" | "green" | "warn" | "danger" | "white"
 * @prop {string} size    - "" | "thin" | "thick"
 * @prop {object} style   - inline overrides on track
 */
export default function ProgressBar({
  value = 0,
  color = "blue",
  size = "",
  style,
}) {
  const trackClass = ["progress-track", size ? `progress-track--${size}` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={trackClass} style={style}>
      <div
        className={`progress-fill progress-fill--${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}