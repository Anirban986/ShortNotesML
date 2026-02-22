import "./Badge.css";

/**
 * Badge — small pill label
 * @prop {string} type  - "blue" | "red" | "warn" | "green" | "gray"  (default "gray")
 * @prop {ReactNode} children
 */
export default function Badge({ type = "gray", children }) {
  return (
    <span className={`badge badge-${type}`}>
      {children}
    </span>
  );
}