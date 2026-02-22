import { useState } from "react";
import "./UploadNotes.css";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const STEPS = ["Upload", "Extracting Text", "Understanding", "Generating Notes"];
const FORMATS = ["PDF", "PNG", "JPG", "DOCX", "HEIC"];

export default function UploadNotes() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    setFile({ name: "Binary_Trees_Notes.pdf", size: "2.4 MB", type: "PDF" });
    setStep(1);
    let p = 0;
    let s = 1;
    const iv = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        p = 0;
        s += 1;
        setStep(s);
        setProgress(0);
      }
      if (s >= STEPS.length) {
        clearInterval(iv);
        setProgress(100);
      }
    }, 80);
  };

  const reset = () => {
    setFile(null);
    setStep(0);
    setProgress(0);
  };

  return (
    <div>
      <h1 className="page-title">Upload Notes</h1>
      <p className="page-sub">Upload your handwritten or printed notes — we'll handle the rest.</p>

      <div className="grid-2">
        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Drop zone / File preview */}
          {!file ? (
            <div
              className={`upload__drop-zone ${dragging ? "upload__drop-zone--active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); simulateUpload(); }}
              onClick={simulateUpload}
              role="button"
              aria-label="Upload notes"
            >
              <div className="upload__drop-icon">📂</div>
              <div className="upload__drop-title">Drop files here or click to browse</div>
              <div className="upload__drop-hint">
                Supports scanned photos, PDFs, and handwritten notes
              </div>
              <div className="upload__drop-formats">
                {FORMATS.map((f) => <Badge key={f} type="gray">{f}</Badge>)}
              </div>
            </div>
          ) : (
            <Card>
              <div className="upload__file-preview">
                <div className="upload__file-icon">📄</div>
                <div style={{ flex: 1 }}>
                  <div className="upload__file-name">{file.name}</div>
                  <div className="upload__file-meta">{file.size} · {file.type}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={reset}>✕</Button>
              </div>
              <ProgressBar value={progress} color="blue" />
              <div style={{ fontSize: 12, color: "var(--text-m)", marginTop: 6 }}>
                {progress}% complete
              </div>
            </Card>
          )}

          {/* Processing stepper */}
          <Card>
            <div className="card__title" style={{ marginBottom: 20 }}>Processing Status</div>
            <div className="upload__stepper">
              {STEPS.map((s, i) => {
                const done   = i < step;
                const active = i === step;
                return (
                  <div
                    key={s}
                    className={`upload__step ${done ? "upload__step--done" : ""} ${active ? "upload__step--active" : ""}`}
                  >
                    <div className="upload__step-circle">
                      {done ? "✓" : i + 1}
                    </div>
                    <div className="upload__step-label">{s}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Right column: form ── */}
        <Card>
          <div className="card__title" style={{ marginBottom: 18 }}>Note Details</div>
          <div className="upload__form">
            <div>
              <label className="upload__form-label">Subject</label>
              <select className="upload__form-input">
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>General Aptitude</option>
              </select>
            </div>

            <div>
              <label className="upload__form-label">Chapter / Topic</label>
              <input
                className="upload__form-input"
                type="text"
                placeholder="e.g. Binary Trees, Dynamic Programming…"
              />
            </div>

            <div>
              <label className="upload__form-label">Note Type</label>
              <select className="upload__form-input">
                <option>Handwritten Scan</option>
                <option>Printed PDF</option>
                <option>Photo / Image</option>
                <option>Typed Document</option>
              </select>
            </div>

            <div>
              <label className="upload__form-label">Language</label>
              <select className="upload__form-input">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <div className="upload__info-alert">
              <span>ℹ️</span>
              <span>
                AI will automatically extract text, detect topics, cross-reference
                with the GATE syllabus, and generate revision notes.
              </span>
            </div>

            <Button variant="primary" full onClick={simulateUpload}>
              ⬆ Upload &amp; Process
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}