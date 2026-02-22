import "./Dashboard.css";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import ScoreRing from "../../components/ScoreRing/ScoreRing";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const IMPORTANT_TOPICS = [
  { name: "Dynamic Programming", weight: "High", pct: 22, color: "red",  bar: "danger" },
  { name: "Graph Theory",        weight: "High", pct: 18, color: "red",  bar: "danger" },
  { name: "Operating Systems",   weight: "Med",  pct: 14, color: "warn", bar: "warn"   },
  { name: "Computer Networks",   weight: "Med",  pct: 12, color: "warn", bar: "warn"   },
  { name: "Database Systems",    weight: "Low",  pct: 8,  color: "blue", bar: "blue"   },
  { name: "TOC & Compilers",     weight: "Low",  pct: 6,  color: "blue", bar: "blue"   },
];

const RECENT_NOTES = [
  { icon: "📄", name: "Binary Trees — Handwritten",  sub: "Uploaded 2h ago",    status: "Done",       statusType: "green" },
  { icon: "📸", name: "OS Processes Scan",            sub: "Uploaded yesterday", status: "Done",       statusType: "green" },
  { icon: "📝", name: "Network Layers PDF",           sub: "Processing…",        status: "Processing", statusType: "warn"  },
];

const STAT_CARDS = [
  { label: "Notes Processed",  val: "24", delta: "+3 this week",    up: true  },
  { label: "Mock Tests Taken", val: "7",  delta: "+1 this week",    up: true  },
  { label: "Missing Topics",   val: "12", delta: "3 high priority", up: false },
];

const HEAT_DATA = Array.from({ length: 48 }, () => {
  const v = Math.random();
  if (v < 0.3) return 0;
  if (v < 0.55) return 1;
  if (v < 0.75) return 2;
  if (v < 0.9) return 3;
  return 4;
});

export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Good morning, Aditya ☀️</h1>
      <p className="page-sub">Here's your GATE CS preparation snapshot for today.</p>

      {/* ── Row 1: Score + Stats ── */}
      <div className="grid-2" style={{ marginBottom: 16 }}>
        {/* Preparation score card */}
        <Card>
          <Card.Header title="Preparation Score">
            <Badge type="blue">GATE CS 2025</Badge>
          </Card.Header>
          <ScoreRing pct={68} />
        </Card>

        {/* Mini stat cards */}
        <div className="dashboard__stats-col">
          {STAT_CARDS.map(({ label, val, delta, up }) => (
            <Card key={label} size="sm">
              <div className="dashboard__stat-card">
                <div>
                  <div className="dashboard__stat-num">{val}</div>
                  <div className="dashboard__stat-label">{label}</div>
                </div>
                <span className={`dashboard__stat-delta dashboard__stat-delta--${up ? "up" : "down"}`}>
                  {up ? "↑" : "↗"} {delta}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Missing topics alert ── */}
      <div className="dashboard__alert">
        <div className="dashboard__alert-icon">⚠️</div>
        <div>
          <div className="dashboard__alert-title">3 High-Priority Topics Uncovered</div>
          <div className="dashboard__alert-body">
            These topics appeared in 60%+ of past GATE papers but aren't in your notes yet.
          </div>
          <div className="dashboard__alert-tags">
            {["Dynamic Programming", "Network Flow", "Context-Free Grammars"].map((t) => (
              <Badge key={t} type="red">{t}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Topics + Notes/Activity ── */}
      <div className="grid-2">
        {/* High-weight topics */}
        <Card>
          <Card.Header title="High-Weight Topics">
            <Button variant="ghost" size="sm">View all →</Button>
          </Card.Header>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {IMPORTANT_TOPICS.map(({ name, weight, pct, color, bar }) => (
              <div className="dashboard__topic-card" key={name}>
                <div className="dashboard__topic-header">
                  <span className="dashboard__topic-name">{name}</span>
                  <Badge type={color}>{weight}</Badge>
                </div>
                <div className="dashboard__topic-sub">
                  Appears in {pct}% of papers
                </div>
                <ProgressBar value={pct * 3.8} color={bar} size="thin" />
              </div>
            ))}
          </div>
        </Card>

        {/* Notes + Activity */}
        <div className="dashboard__cards-col">
          {/* Recent notes */}
          <Card>
            <Card.Header title="Recent Notes">
              <Button variant="ghost" size="sm">Upload new →</Button>
            </Card.Header>

            {RECENT_NOTES.map(({ icon, name, sub, status, statusType }) => (
              <div className="dashboard__note-row" key={name}>
                <div className="dashboard__note-icon">{icon}</div>
                <div>
                  <div className="dashboard__note-name">{name}</div>
                  <div className="dashboard__note-meta">{sub}</div>
                </div>
                <div className="dashboard__note-status">
                  <Badge type={statusType}>{status}</Badge>
                </div>
              </div>
            ))}
          </Card>

          {/* Activity heatmap */}
          <Card>
            <Card.Header title="Study Activity — Last 4 Weeks" />

            <div className="dashboard__heatmap">
              {HEAT_DATA.map((v, i) => (
                <div
                  key={i}
                  className={`heatmap-cell ${v > 0 ? `heat-${v}` : ""}`}
                  title={`Day ${i + 1}: ${["No activity", "Light", "Moderate", "Active", "Intense"][v]}`}
                />
              ))}
            </div>

            <div className="dashboard__heatmap-legend">
              <span>Less</span>
              {[null, "heat-1", "heat-2", "heat-3", "heat-4"].map((cls, i) => (
                <div
                  key={i}
                  className={`heatmap-cell ${cls ?? ""}`}
                  style={{ width: 12, height: 12, aspectRatio: "unset" }}
                />
              ))}
              <span>More</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}