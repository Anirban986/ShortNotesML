import { createContext, useContext, useState } from "react";

/**
 * Subscription tiers:
 *   "free"  — can only access Upload Notes
 *   "pro"   — full access to all features
 */

export const PLANS = {
  free: {
    id:       "free",
    label:    "Free",
    price:    "₹0",
    period:   "forever",
    color:    "var(--text-m)",
    features: [
      "Upload up to 3 notes",
      "Basic text extraction",
    ],
    lockedFeatures: [
      "Revision Notes viewer",
      "Missing Topic detection",
      "Topic Analytics",
      "Mock Test Generator",
      "Previous Tests history",
      "Dashboard insights",
    ],
  },
  pro: {
    id:    "pro",
    label: "Pro",
    price: "₹299",
    period: "/ month",
    color: "var(--blue)",
    features: [
      "Unlimited note uploads",
      "AI Revision Notes",
      "Missing Topic detection",
      "Full Topic Analytics",
      "Unlimited Mock Tests",
      "Previous Tests history",
      "Dashboard insights",
      "Priority support",
    ],
    lockedFeatures: [],
  },
};

/** Pages that are always accessible regardless of plan */
export const FREE_PAGES = new Set(["upload"]);

/** Pages that require an active Pro subscription */
export const PRO_PAGES = new Set([
  "dashboard",
  "revision",
  "missing",
  "analytics",
  "mock",
  "previous",
  "settings",
]);

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  // Toggle between "free" and "pro" to simulate subscription state
  const [plan, setPlan] = useState("free");

  const isSubscribed  = plan === "pro";
  const canAccess     = (pageId) => isSubscribed || FREE_PAGES.has(pageId);
  const upgrade       = () => setPlan("pro");
  const downgrade     = () => setPlan("free");   // for demo toggle

  return (
    <SubscriptionContext.Provider
      value={{ plan, isSubscribed, canAccess, upgrade, downgrade, PLANS }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used inside SubscriptionProvider");
  return ctx;
}