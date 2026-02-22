import "./SubscriptionGate.css";
import { useSubscription, PLANS } from "../Subscriptioncontext/Subscriptioncontext";

const PAGE_LABELS = {
  dashboard: "Dashboard",
  revision:  "Revision Notes",
  missing:   "Missing Topics",
  analytics: "Topic Analytics",
  mock:      "Mock Test Generator",
  previous:  "Previous Tests",
  settings:  "Profile & Settings",
};

/**
 * SubscriptionGate — shown when a free user tries to access a Pro-only page.
 * @prop {string} requestedPage - the page id they tried to visit
 */
export default function SubscriptionGate({ requestedPage }) {
  const { upgrade, downgrade, isSubscribed } = useSubscription();

  const pageName = PAGE_LABELS[requestedPage] ?? requestedPage;
  const free = PLANS.free;
  const pro  = PLANS.pro;

  return (
    <div className="gate">
      {/* Lock icon */}
      <div className="gate__lock-wrap">🔒</div>

      {/* Demo toggle note */}
      <div className="gate__demo-note">
        ⚡ Demo mode — toggle subscription below to test access
      </div>

      {/* Headline */}
      <h2 className="gate__title">
        Unlock <em>{pageName}</em> with Pro
      </h2>
      <p className="gate__sub">
        You're on the <strong>Free plan</strong>. Upgrade to Pro to access AI-generated
        revision notes, topic analytics, mock tests, and everything else ExamOS has to offer.
      </p>

      {/* Plan cards */}
      <div className="gate__plans">
        {/* Free plan */}
        <div className="gate__plan-card">
          <div className="gate__plan-name">Free</div>
          <div>
            <span className="gate__plan-price">{free.price}</span>
            <span className="gate__plan-period">{free.period}</span>
          </div>
          <div className="gate__plan-divider" />

          <div className="gate__plan-feature-list">
            {free.features.map((f) => (
              <div className="gate__plan-feature" key={f}>
                <span className="gate__plan-feature-icon">✓</span>
                {f}
              </div>
            ))}
            {free.lockedFeatures.map((f) => (
              <div className="gate__plan-feature gate__plan-feature--locked" key={f}>
                <span className="gate__plan-feature-icon">✕</span>
                {f}
              </div>
            ))}
          </div>

          {/* Demo: downgrade button */}
          <button
            className="gate__plan-btn gate__plan-btn--free"
            onClick={downgrade}
          >
            {isSubscribed ? "Switch to Free (Demo)" : "Current Plan"}
          </button>
        </div>

        {/* Pro plan */}
        <div className="gate__plan-card gate__plan-card--pro">
          <div className="gate__plan-badge">✦ Recommended</div>
          <div className="gate__plan-name gate__plan-name--pro">Pro</div>
          <div>
            <span className="gate__plan-price">{pro.price}</span>
            <span className="gate__plan-period">{pro.period}</span>
          </div>
          <div className="gate__plan-divider" />

          <div className="gate__plan-feature-list">
            {pro.features.map((f) => (
              <div className="gate__plan-feature" key={f}>
                <span className="gate__plan-feature-icon" style={{ color: "var(--blue)" }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <button
            className="gate__plan-btn gate__plan-btn--pro"
            onClick={upgrade}
          >
            {isSubscribed ? "Current Plan ✓" : "Upgrade to Pro →"}
          </button>
        </div>
      </div>

      <p className="gate__footnote">
        <strong>No credit card required</strong> to explore the Free plan. · Cancel anytime.
      </p>
    </div>
  );
}