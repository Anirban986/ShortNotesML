import "./Button.css";

/**
 * Button
 * @prop {string}    variant  - "primary" | "secondary" | "ghost" | "danger" | "success"
 * @prop {string}    size     - "sm" | "" | "lg"
 * @prop {boolean}   full     - stretch to container width
 * @prop {function}  onClick
 * @prop {ReactNode} children
 * @prop {object}    style    - inline overrides
 */
export default function Button({
  variant = "primary",
  size = "",
  full = false,
  onClick,
  children,
  style,
  type = "button",
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size ? `btn-${size}` : "",
    full ? "btn-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} onClick={onClick} style={style} type={type}>
      {children}
    </button>
  );
}