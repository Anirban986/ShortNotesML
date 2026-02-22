import { useState } from "react";
import "./App.css";

// Subscription
import { SubscriptionProvider, useSubscription } from "./components/Subscriptioncontext/Subscriptioncontext";

// Layout
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar  from "./components/Topbar/Topbar";

// Pages
import Dashboard       from "./Pages/Dashboard/Dashboard";
import UploadNotes     from "./Pages/UploadNotes/UploadNotes";
import RevisionNotes   from "./Pages/RevisionNotes/Revisionnotes";
import MissingTopics   from "./Pages/MissingTopics/Missingtopics";
import Analytics       from "./Pages/Analytics/Analytics";
import MockTest        from "./Pages/MockTest/Mocktest";
import SubscriptionGate from "./components/Subscriptiongate/Subscriptiongate";

const PAGES = {
  dashboard: Dashboard,
  upload:    UploadNotes,
  revision:  RevisionNotes,
  missing:   MissingTopics,
  analytics: Analytics,
  mock:      MockTest,
};

const ComingSoon = ({ page }) => (
  <div className="empty">
    <div className="empty-icon">🚧</div>
    <div className="empty-text">
      <strong style={{ textTransform: "capitalize" }}>{page}</strong> — coming soon
    </div>
  </div>
);

/* Inner shell — needs subscription context already mounted */
function Shell() {
  const [activePage, setActivePage] = useState("upload");
  const { canAccess } = useSubscription();

  // Determine what to render
  const isGated    = !canAccess(activePage);
  const PageComp   = PAGES[activePage] ?? (() => <ComingSoon page={activePage} />);

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="main">
        <Topbar />

        <main className="content">
          {isGated
            ? <SubscriptionGate requestedPage={activePage} />
            : <PageComp />
          }
        </main>
      </div>
    </div>
  );
}

/* Root — wraps everything in subscription context */
export default function App() {
  return (
    <SubscriptionProvider>
      <Shell />
    </SubscriptionProvider>
  );
}