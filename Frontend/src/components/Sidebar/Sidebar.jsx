import "./Sidebar.css";
import { useSubscription, FREE_PAGES, PRO_PAGES } from "../Subscriptioncontext/Subscriptioncontext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",       icon: "⬡"  },
  { id: "upload",    label: "Upload Notes",    icon: "⬆"  },
  { id: "revision",  label: "Revision Notes",  icon: "📖" },
  { id: "missing",   label: "Missing Topics",  icon: "⚠", badge: 3 },
  { id: "analytics", label: "Topic Analytics", icon: "📊" },
  { id: "mock",      label: "Mock Test",        icon: "📝" },
  { id: "previous",  label: "Previous Tests",   icon: "🕐" },
];

/**
 * Sidebar — subscription-aware left navigation
 * @prop {string}   activePage  - current page id
 * @prop {function} onNavigate  - (pageId) => void
 * @prop {function} onUpgrade   - () => void  (opens gate)
 */
export default function Sidebar({ activePage, onNavigate, onUpgrade }) {
  const { isSubscribed, canAccess, plan, upgrade, downgrade } = useSubscription();

  const handleNavClick = (id) => {
    if (!canAccess(id)) {
      // Navigate to that page — App will show the gate
      onNavigate(id);
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav className="sidebar">
      {/* ── Logo ── */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">P</div>
        <div>
          <div className="sidebar__logo-name">PrepIntel</div>
          <div className="sidebar__logo-sub">GATE · UPSC-CSE · CAT · JEE</div>
        </div>
      </div>

      {/* ── Plan chip ── */}
      <div className={`sidebar__plan-chip sidebar__plan-chip--${plan}`}>
        <div className={`sidebar__plan-dot sidebar__plan-dot--${plan}`} />
        <div className="sidebar__plan-info">
          <div className="sidebar__plan-name">
            {isSubscribed ? "Pro Plan" : "Free Plan"}
          </div>
          <div className="sidebar__plan-sub">
            {isSubscribed ? "All features unlocked" : "Limited access"}
          </div>
        </div>
        {isSubscribed && <span style={{ fontSize: 14 }}>✦</span>}
      </div>

      {/* ── Navigation ── */}
      <div className="sidebar__section-label">Navigation</div>
      <div className="sidebar__nav-list">
        {NAV_ITEMS.map(({ id, label, icon, badge }) => {
          const locked  = !canAccess(id);
          const active  = activePage === id;
          return (
            <div
              key={id}
              className={[
                "sidebar__nav-item",
                active  ? "sidebar__nav-item--active" : "",
                locked  ? "sidebar__nav-item--locked"  : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleNavClick(id)}
              role="button"
              aria-current={active ? "page" : undefined}
              aria-disabled={locked}
              title={locked ? "Upgrade to Pro to unlock" : label}
            >
              <span className="sidebar__nav-icon">{icon}</span>
              {label}
              {/* Show lock icon OR notification badge */}
              {locked
                ? <span className="sidebar__lock-icon">🔒</span>
                : badge
                  ? <span className="sidebar__nav-badge">{badge}</span>
                  : null
              }
            </div>
          );
        })}
      </div>

      {/* ── Upgrade CTA (free) / Pro active (subscribed) ── */}
      {!isSubscribed ? (
        <div className="sidebar__upgrade-banner" onClick={upgrade} role="button">
          <div className="sidebar__upgrade-title">🚀 Upgrade to Pro</div>
          <div className="sidebar__upgrade-sub">
            Unlock revision notes, analytics, mock tests &amp; more.
          </div>
          <button className="sidebar__upgrade-btn">Upgrade — ₹299/mo →</button>
        </div>
      ) : (
        <div className="sidebar__pro-banner">
          <span className="sidebar__pro-banner-icon">✅</span>
          <div>
            <div className="sidebar__pro-banner-title">Pro Active</div>
            <div className="sidebar__pro-banner-sub">All features unlocked</div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="sidebar__footer">
        <div
          className={`sidebar__nav-item ${activePage === "settings" ? "sidebar__nav-item--active" : ""} ${!canAccess("settings") ? "sidebar__nav-item--locked" : ""}`}
          onClick={() => handleNavClick("settings")}
          role="button"
          title={!canAccess("settings") ? "Upgrade to access settings" : "Profile & Settings"}
        >
          <span className="sidebar__nav-icon">⚙</span>
          Profile &amp; Settings
          {!canAccess("settings") && <span className="sidebar__lock-icon">🔒</span>}
        </div>

        {/* Demo toggle — free ↔ pro */}
        <div
          style={{
            margin: "6px 4px 8px",
            padding: "7px 12px",
            background: "var(--fill)",
            borderRadius: "var(--r-sm)",
            fontSize: 11,
            color: "var(--text-m)",
            textAlign: "center",
            cursor: "pointer",
            border: "1px dashed var(--border)",
          }}
          onClick={isSubscribed ? downgrade : upgrade}
          title="Demo toggle"
        >
          ⚡ Demo: {isSubscribed ? "Switch to Free" : "Switch to Pro"}
        </div>

        <div className="sidebar__user-chip">
          <div className="sidebar__avatar">
            A
            {isSubscribed && (
              <div className="sidebar__avatar-crown">✦</div>
            )}
          </div>
          <div>
            <div className="sidebar__user-name">Aditya Kumar</div>
            <div className="sidebar__user-exam">GATE CS 2025</div>
          </div>
        </div>
      </div>
    </nav>
  );
}