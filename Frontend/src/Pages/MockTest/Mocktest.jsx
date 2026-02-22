import { useState, useEffect } from "react";
import "./Mocktest.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const QUESTION = {
  num: 1,
  subject: "Data Structures",
  marks: 2,
  text: "Consider the following recurrence: T(n) = 2T(n/2) + n log n. Which of the following correctly describes T(n)?",
  options: ["Θ(n log n)", "Θ(n log² n)", "Θ(n² log n)", "Θ(n²)"],
};

const INITIAL_ANSWERED = new Set([1, 3, 5, 7, 9, 12, 15]);

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/* ── Configuration screen ── */
function TestConfig({ onStart }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onStart(); }, 1800);
  };

  return (
    <div>
      <h1 className="page-title">Mock Test Generator</h1>
      <p className="page-sub">
        Generate realistic exam-pattern mock tests based on your weak areas and PYQs.
      </p>

      <Card style={{ maxWidth: 680 }}>
        <div className="card__title" style={{ marginBottom: 20 }}>Configure Test</div>

        <div className="mock__config-grid">
          <div>
            <label className="mock__form-label">Subject</label>
            <select className="mock__form-select">
              <option>Full Syllabus</option>
              <option>Data Structures &amp; Algo</option>
              <option>Operating Systems</option>
              <option>Computer Networks</option>
            </select>
          </div>
          <div>
            <label className="mock__form-label">Difficulty</label>
            <select className="mock__form-select">
              <option>Mixed (Recommended)</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label className="mock__form-label">Questions</label>
            <select className="mock__form-select">
              <option>65 (Full GATE)</option>
              <option>30 (Half)</option>
              <option>15 (Quick)</option>
            </select>
          </div>
        </div>

        <div className="mock__info-alert">
          <span>🎯</span>
          <span>
            Test will be generated based on your weak areas:{" "}
            <strong>OS Scheduling, NP Completeness</strong>, and GATE 2024 exam pattern.
          </span>
        </div>

        <Button variant="primary" full onClick={handleGenerate}>
          {loading ? "⏳ Generating your test…" : "⚡ Generate Mock Test"}
        </Button>
      </Card>
    </div>
  );
}

/* ── Test interface ── */
function TestInterface({ onEnd }) {
  const [selected, setSelected]   = useState(null);
  const [marked, setMarked]       = useState(new Set());
  const [answered, setAnswered]   = useState(INITIAL_ANSWERED);
  const [currentQ, setCurrentQ]   = useState(0);
  const [time, setTime]           = useState(3600);

  useEffect(() => {
    const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleSelect = (i) => {
    setSelected(i);
    setAnswered((a) => new Set([...a, currentQ]));
  };

  const toggleMark = () => {
    setMarked((m) => {
      const next = new Set(m);
      next.has(currentQ) ? next.delete(currentQ) : next.add(currentQ);
      return next;
    });
  };

  const cellClass = (i) => {
    if (i === currentQ)     return "mock__pal--current";
    if (marked.has(i))      return "mock__pal--marked";
    if (answered.has(i))    return "mock__pal--answered";
    return "mock__pal--unanswered";
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>GATE CS Mock Test</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            Full Syllabus · 65 Questions · Mixed Difficulty
          </p>
        </div>
        <Button variant="danger" onClick={onEnd}>✕ End Test</Button>
      </div>

      <div className="mock__test-layout">
        {/* ── Question area ── */}
        <div className="mock__question-card">
          <div className="mock__q-num">
            Question {currentQ + 1} of 65 ·{" "}
            <span style={{ color: "var(--blue)" }}>{QUESTION.subject}</span> ·{" "}
            {QUESTION.marks} Marks
          </div>

          <div className="mock__q-text">{QUESTION.text}</div>

          <div className="mock__options">
            {QUESTION.options.map((opt, i) => (
              <div
                key={i}
                className={[
                  "mock__option",
                  selected === i ? "mock__option--selected" : "",
                  marked.has(i)  ? "mock__option--marked"   : "",
                ].join(" ")}
                onClick={() => handleSelect(i)}
                role="button"
                aria-pressed={selected === i}
              >
                <div className="mock__option-key">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="mock__option-text">{opt}</div>
              </div>
            ))}
          </div>

          <div className="mock__q-actions">
            <Button variant="secondary" size="sm" onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}>
              ← Previous
            </Button>
            <Button variant="primary" size="sm" onClick={() => setCurrentQ((q) => Math.min(64, q + 1))}>
              Next →
            </Button>
            <Button variant="secondary" size="sm" onClick={toggleMark}>
              🔖 Mark for Review
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
              Clear
            </Button>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="mock__right-panel">
          {/* Timer */}
          <div className="mock__timer">
            <div
              className="mock__timer-num"
              style={{ color: time < 600 ? "var(--danger)" : "var(--text-h)" }}
            >
              {formatTime(time)}
            </div>
            <div className="mock__timer-label">Time Remaining</div>
          </div>

          {/* Question palette */}
          <div className="mock__palette">
            <div className="card__title">Question Palette</div>
            <div className="mock__palette-grid">
              {Array.from({ length: 65 }, (_, i) => (
                <div
                  key={i}
                  className={`mock__palette-cell ${cellClass(i)}`}
                  onClick={() => setCurrentQ(i)}
                  title={`Question ${i + 1}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mock__legend">
              {[
                { bg: "var(--success-lt)", label: "Answered"     },
                { bg: "var(--fill)",       label: "Not Answered" },
                { bg: "var(--warn-lt)",    label: "Marked"       },
              ].map(({ bg, label }) => (
                <div className="mock__legend-row" key={label}>
                  <div className="mock__legend-dot" style={{ background: bg }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <Button variant="success" full>Submit Test</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Page root ── */
export default function MockTest() {
  const [started, setStarted] = useState(false);

  return started
    ? <TestInterface onEnd={() => setStarted(false)} />
    : <TestConfig    onStart={() => setStarted(true)} />;
}