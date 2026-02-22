import { useState } from "react";
import "./Expandable.css";

/**
 * Expandable — collapsible section
 * @prop {string}    title
 * @prop {boolean}   defaultOpen
 * @prop {ReactNode} children
 */
export default function Expandable({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="expandable">
      <div
        className="expandable__header"
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span
          className={`expandable__chevron ${open ? "expandable__chevron--open" : ""}`}
        >
          ▼
        </span>
      </div>

      {open && <div className="expandable__body">{children}</div>}
    </div>
  );
}