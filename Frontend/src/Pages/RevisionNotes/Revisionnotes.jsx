import { useState } from "react";
import "./Revisionnotes.css";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import Expandable from "../../components/Expandable/Expandable";

const SECTIONS = [
  "Introduction",
  "Types of Trees",
  "Traversals",
  "BST Operations",
  "AVL Trees",
  "Heap",
];

const KEY_POINTS = [
  "Inorder traversal of BST gives sorted output",
  "Binary tree with n nodes has exactly n−1 edges",
  "Number of NULL pointers = n+1 in a binary tree with n nodes",
  "Maximum height of BST with n nodes = n−1 (skewed tree)",
];

const EXPANDABLES = [
  {
    title: "Full Binary Tree",
    content:
      "Every node has 0 or 2 children. No node has exactly one child. Number of leaf nodes = (n+1)/2 where n = total nodes.",
  },
  {
    title: "Complete Binary Tree",
    content:
      "All levels completely filled except possibly the last, which is filled from left to right. Used in heaps.",
  },
  {
    title: "Perfect Binary Tree",
    content:
      "All internal nodes have 2 children and all leaf nodes are at the same level. Total nodes = 2^(h+1) - 1.",
  },
];

export default function RevisionNotes() {
  const [mode, setMode] = useState("short");
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div>
      {/* ── Page header ── */}
      <div className="revision__header">
        <div>
          <h1 className="page-title">Binary Trees — Revision Notes</h1>
          <p className="page-sub">Processed from your upload · Data Structures · 6 sections</p>
        </div>
        <div className="revision__header-actions">
          {/* Short / Detailed toggle */}
          <div className="revision__toggle" role="group" aria-label="Display mode">
            {["short", "detailed"].map((m) => (
              <div
                key={m}
                className={`revision__toggle-opt ${mode === m ? "revision__toggle-opt--active" : ""}`}
                onClick={() => setMode(m)}
                role="button"
                aria-pressed={mode === m}
              >
                {m === "short" ? "Short Notes" : "Detailed"}
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm">⬇ Export PDF</Button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="revision__layout">
        {/* Side nav */}
        <nav className="revision__sidenav">
          <div className="revision__sidenav-label">Contents</div>
          {SECTIONS.map((s, i) => (
            <div
              key={s}
              className={`revision__sidenav-item ${activeSection === i ? "revision__sidenav-item--active" : ""}`}
              onClick={() => setActiveSection(i)}
              role="button"
            >
              {s}
            </div>
          ))}
        </nav>

        {/* Notes content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <Card.Header title={SECTIONS[activeSection]}>
              <Badge type="blue">Data Structures</Badge>
            </Card.Header>

            {/* Prose */}
            <div className="revision__notes-body">
              <p>
                A <span className="highlight-blue">binary tree</span> is a hierarchical
                data structure where each node has{" "}
                <span className="highlight-yellow">at most two children</span>, referred
                to as the left child and right child.
              </p>

              {mode === "detailed" && (
                <p>
                  The topmost node is called the{" "}
                  <span className="highlight-blue">root</span>. Nodes with no children
                  are called <span className="highlight-yellow">leaf nodes</span>. The
                  depth of a node is the number of edges from root to that node. The
                  height of a tree is the number of edges on the longest path from root
                  to a leaf.
                </p>
              )}
            </div>

            {/* Formula box */}
            <div className="revision__formula-box">
              Height of complete binary tree = ⌊log₂(n)⌋<br />
              Max nodes at level l = 2<sup>l</sup><br />
              Max nodes in tree of height h = 2<sup>h+1</sup> − 1
            </div>

            {/* Expandable sections */}
            <div className="section-title" style={{ marginTop: 20 }}>Key Concepts</div>
            {EXPANDABLES.map(({ title, content }) => (
              <Expandable key={title} title={title}>
                {content}
              </Expandable>
            ))}

            {/* Important points */}
            <div className="section-title" style={{ marginTop: 20 }}>
              Important Points for GATE
            </div>
            <div className="revision__keypoints">
              {KEY_POINTS.map((pt) => (
                <div className="revision__keypoint" key={pt}>
                  <span className="revision__keypoint-arrow">→</span>
                  {pt}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}