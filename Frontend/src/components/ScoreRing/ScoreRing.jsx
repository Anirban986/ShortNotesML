import "./ScoreRing.css";
import ProgressBar from "../ProgressBar/ProgressBar";

const STATUS_THRESHOLDS = [
  { min: 90, label: "Ready ✦", color: "#10B981" },
  { min: 70, label: "Good",    color: "#2563EB" },
  { min: 50, label: "Average", color: "#F59E0B" },
  { min: 0,  label: "Poor",    color: "#EF4444" },
];

const SUBJECT_BARS = [
  { label: "Data Structures", value: 78, color: "blue" },
  { label: "Algorithms",      value: 65, color: "blue" },
  { label: "OS",              value: 45, color: "warn" },
  { label: "Networks",        value: 30, color: "danger" },
];

/**
 * ScoreRing — animated SVG ring showing syllabus coverage
 * @prop {number} pct - 0–100
 * @prop {Array}  bars - optional override for subject breakdown
 */
export default function ScoreRing({ pct = 68, bars = SUBJECT_BARS }) {
  const R = 40;
  const circumference = 2 * Math.PI * R;
  const offset = circumference - (pct / 100) * circumference;

  const { label: statusLabel, color: statusColor } =
    STATUS_THRESHOLDS.find((t) => pct >= t.min) || STATUS_THRESHOLDS.at(-1);

  return (
    <div className="score-ring-wrap">
      {/* SVG Ring */}
      <svg className="ring-svg" viewBox="0 0 100 100">
        <circle className="ring-bg" cx="50" cy="50" r={R} />
        <circle
          className="ring-fill"
          cx="50"
          cy="50"
          r={R}
          stroke={statusColor}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          className="ring-text"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {pct}%
        </text>
        <text
          className="ring-sub-text"
          x="50"
          y="62"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          covered
        </text>
      </svg>

      {/* Details */}
      <div className="score-details">
        <div className="score-status" style={{ color: statusColor }}>
          {statusLabel}
        </div>
        <div className="score-hint">
          Keep pushing — you need <strong>{100 - pct}% more</strong> coverage
          to reach Ready.
        </div>

        <div className="score-bars">
          {bars.map(({ label, value, color }) => (
            <div className="score-bar-row" key={label}>
              <span className="score-bar-label">{label}</span>
              <div className="score-bar-track">
                <ProgressBar value={value} color={color} />
              </div>
              <span className="score-bar-pct">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}