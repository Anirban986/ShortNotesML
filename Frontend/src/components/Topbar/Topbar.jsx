import "./Topbar.css";

const EXAMS = [
  "GATE Computer Science",
  "GATE ECE",
  "UPSC CSE",
  "CAT",
  "JEE Advanced",
];

/**
 * Topbar — top header bar
 * @prop {function} onExamChange - (exam: string) => void
 */
export default function Topbar({ onExamChange }) {
  return (
    <header className="topbar">
      {/* Search */}
      <div className="topbar__search">
        <span className="topbar__search-icon">🔍</span>
        <input
          className="topbar__search-input"
          placeholder="Search topics, notes, formulas…"
          aria-label="Global search"
        />
      </div>

      {/* Exam selector */}
      <select
        className="topbar__exam-select"
        onChange={(e) => onExamChange?.(e.target.value)}
        aria-label="Select exam"
      >
        {EXAMS.map((exam) => (
          <option key={exam} value={exam}>
            {exam}
          </option>
        ))}
      </select>

      {/* Action icons */}
      <div className="topbar__actions">
        <div className="topbar__icon-btn" title="Notifications" role="button">
          🔔
          <span className="topbar__notif-dot" aria-label="Unread notifications" />
        </div>

        <div className="topbar__icon-btn" title="Help" role="button">
          ?
        </div>

        <div className="topbar__avatar" title="My account" role="button">
          A
        </div>
      </div>
    </header>
  );
}