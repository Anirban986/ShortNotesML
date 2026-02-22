import "./Analytics.css";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const BAR_DATA = [
  { label: "DSA",  value: 85, accent: true  },
  { label: "OS",   value: 60, accent: false },
  { label: "CN",   value: 45, accent: false },
  { label: "DBMS", value: 70, accent: false },
  { label: "TOC",  value: 35, accent: false },
  { label: "Math", value: 80, accent: false },
];

const RANK_DATA = [
  { name: "Dynamic Programming",  pct: 22 },
  { name: "Graph Algorithms",     pct: 18 },
  { name: "Operating Systems",    pct: 14 },
  { name: "Computer Networks",    pct: 12 },
  { name: "Discrete Mathematics", pct: 10 },
];

const WEAK_AREAS = [
  { name: "OS Scheduling",    value: 28, color: "danger" },
  { name: "NP Completeness",  value: 35, color: "danger" },
  { name: "SQL Joins",        value: 42, color: "warn"   },
  { name: "Paging & TLB",    value: 48, color: "warn"   },
];

const YEARS = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

const HEAT_CELLS = Array.from({ length: 60 }, () => {
  const v = Math.random();
  if (v < 0.3)  return "";
  if (v < 0.55) return "heat-1";
  if (v < 0.75) return "heat-2";
  if (v < 0.9)  return "heat-3";
  return "heat-4";
});

export default function Analytics() {
  return (
    <div>
      <h1 className="page-title">Topic Analytics</h1>
      <p className="page-sub">Exam pattern analysis, weightage distribution, and your weak areas.</p>

      {/* ── Row 1 ── */}
      <div className="grid-2" style={{ marginBottom: 16 }}>
        {/* Bar chart */}
        <Card>
          <Card.Header title="Topic Weightage Distribution">
            <Badge type="blue">GATE CS</Badge>
          </Card.Header>
          <div className="analytics__bar-chart">
            {BAR_DATA.map(({ label, value, accent }) => (
              <div className="analytics__bar-item" key={label}>
                <div
                  className={`analytics__bar ${accent ? "analytics__bar--accent" : ""}`}
                  style={{ height: `${value}%` }}
                />
                <div className="analytics__bar-label">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rank list */}
        <Card>
          <Card.Header title="Concept Importance Ranking">
            <Badge type="gray">Top 5</Badge>
          </Card.Header>
          <div className="analytics__rank-list">
            {RANK_DATA.map(({ name, pct }, i) => (
              <div className="analytics__rank-row" key={name}>
                <span className="analytics__rank-num">{i + 1}</span>
                <span className="analytics__rank-name">{name}</span>
                <span className="analytics__rank-pct">{pct}%</span>
                <div className="analytics__rank-bar">
                  <ProgressBar value={pct * 4.5} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 2 ── */}
      <div className="grid-2">
        {/* Weak areas */}
        <Card>
          <Card.Header title="Your Weak Areas">
            <Button variant="danger" size="sm">Focus Mode</Button>
          </Card.Header>
          {WEAK_AREAS.map(({ name, value, color }) => (
            <div className="analytics__weak-item" key={name}>
              <div className="analytics__weak-header">
                <span className="analytics__weak-name">{name}</span>
                <span style={{ color: `var(--${color})`, fontWeight: 600, fontSize: 12 }}>{value}%</span>
              </div>
              <ProgressBar value={value} color={color} />
            </div>
          ))}
        </Card>

        {/* PYQ heatmap */}
        <Card>
          <Card.Header title="PYQ Frequency Heatmap">
            <Badge type="gray">Last 10 Years</Badge>
          </Card.Header>
          <div className="analytics__heatmap">
            {HEAT_CELLS.map((cls, i) => (
              <div key={i} className={`heatmap-cell ${cls}`} />
            ))}
          </div>
          <div className="analytics__heatmap-years">
            {YEARS.map((y) => (
              <div className="analytics__heatmap-year" key={y}>{y}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}