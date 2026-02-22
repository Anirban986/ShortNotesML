import "./Missingtopics.css";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */

const PRIORITY_META = {
  high: { label: "High", dotColor: "var(--danger)", badgeType: "red" },
  medium: { label: "Medium", dotColor: "var(--warn)", badgeType: "warn" },
  low: { label: "Low", dotColor: "var(--blue)", badgeType: "blue" },
};

const PRIORITY_ORDER = ["high", "medium", "low"];

const TOPICS_BY_PRIORITY = {
  high: [
    { id: 1, name: "Dynamic Programming — Advanced", pyq: 12, weight: 22 },
    { id: 2, name: "Network Flow Algorithms", pyq: 8, weight: 14 },
    { id: 3, name: "Context-Free Grammars", pyq: 7, weight: 12 },
  ],
  medium: [
    { id: 4, name: "Disk Scheduling Algorithms", pyq: 5, weight: 9 },
    { id: 5, name: "SQL Queries & Normalization", pyq: 5, weight: 8 },
    { id: 6, name: "Process Synchronization", pyq: 4, weight: 7 },
  ],
  low: [
    { id: 7, name: "Cryptography Basics", pyq: 2, weight: 4 },
    { id: 8, name: "Computer Organization — I/O", pyq: 2, weight: 3 },
  ],
};

const COVERAGE = 68;
const TARGET = 85;

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function CoverageBanner({ coverage, target }) {
  const missing = 100 - coverage;

  return (
    <section className="missing__banner">
      <div>
        <div className="missing__banner-num">{coverage}%</div>
        <div className="missing__banner-label">
          Syllabus coverage — {missing}% remaining
        </div>
      </div>

      <div className="missing__banner-progress">
        <div className="missing__banner-progress-label">
          Coverage Progress
        </div>

        <ProgressBar value={coverage} color="blue" size="thick" />

        <div className="missing__banner-hint">
          Target: {target}% by exam date
        </div>
      </div>

      <Button variant="primary">
        Generate All Missing Notes
      </Button>
    </section>
  );
}

function TopicRow({ topic }) {
  return (
    <div className="missing__topic-row">
      <div>
        <div className="missing__topic-name">{topic.name}</div>
        <div className="missing__topic-meta">
          {topic.pyq} questions in last 5 years · Weight: {topic.weight}%
        </div>
      </div>

      <Button variant="secondary" size="sm">
        ⚡ Quick Notes
      </Button>
    </div>
  );
}

function PriorityGroup({ priorityKey }) {
  const meta = PRIORITY_META[priorityKey];
  const topics = TOPICS_BY_PRIORITY[priorityKey];

  return (
    <section className="missing__group">
      <div className="missing__group-header">
        <div
          className="missing__group-dot"
          style={{ background: meta.dotColor }}
        />
        <h2 className="section-title">{meta.label} Priority</h2>
        <Badge type={meta.badgeType}>
          {topics.length} topics
        </Badge>
      </div>

      {topics.map((topic) => (
        <TopicRow key={topic.id} topic={topic} />
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function MissingTopics() {
  return (
    <div>
      <h1 className="page-title">Missing Topics</h1>
      <p className="page-sub">
        Topics from the GATE CS syllabus not yet covered in your notes.
      </p>

      <CoverageBanner coverage={COVERAGE} target={TARGET} />

      {PRIORITY_ORDER.map((priorityKey) => (
        <PriorityGroup key={priorityKey} priorityKey={priorityKey} />
      ))}
    </div>
  );
}