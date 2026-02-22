import "./Card.css";

/**
 * Card — surface container
 * @prop {string}    size     - "" | "sm" | "flat"
 * @prop {string}    alert    - "" | "red" | "warn" | "blue"
 * @prop {string}    className
 * @prop {object}    style
 * @prop {ReactNode} children
 */
export default function Card({
  size = "",
  alert = "",
  className = "",
  style,
  children,
}) {
  const classes = [
    "card",
    size ? `card--${size}` : "",
    alert ? `card--alert-${alert}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

/**
 * Card.Header — flex row with title + optional action
 */
Card.Header = function CardHeader({ title, children }) {
  return (
    <div className="card__header">
      <span className="card__title">{title}</span>
      {children}
    </div>
  );
};