import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import NameScreen from './components/NameScreen';
import ModuleView from './components/ModuleView';
import ChatView from './components/ChatView';
import FinalTest from './components/FinalTest';
import PaymentView from './components/PaymentView';
import CertificateView from './components/CertificateView';
import { MODULES, INSTITUTE, SHORT, CERT_FEE } from './data/modulesData';
import './index.css';

/* ── Sidebar Component ── */
function Sidebar({ page, go, done, scores, student, pct, payStatus }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        Pacific<br />Technical Skills<br />Training Institute
        <div className="logo-sub">{SHORT}</div>
      </div>
      <button className={"nav-btn" + (page === "dashboard" ? " active" : "")} onClick={() => go("dashboard")}>
        <span className="nav-ico">⊞</span>Dashboard
      </button>
      <button className={"nav-btn" + (page === "chat" ? " active" : "")} onClick={() => go("chat")}>
        <span className="nav-ico">💬</span>AI Tutor
      </button>
      <button className={"nav-btn" + (page === "finaltest" ? " active" : "")} onClick={() => go("finaltest")}>
        <span className="nav-ico">📋</span>Final Test
      </button>
      <button className={"nav-btn" + (page === "payment" ? " active" : "")} onClick={() => go("payment")}>
        <span className="nav-ico">💳</span>Payment
        {payStatus === "paid" ? (
          <span className="nav-badge badge-paid">Paid</span>
        ) : payStatus === "pending" ? (
          <span className="nav-badge badge-pending">Pending</span>
        ) : null}
      </button>
      <button className={"nav-btn" + (page === "certificate" ? " active" : "")} onClick={() => go("certificate")}>
        <span className="nav-ico">🏆</span>Certificate
      </button>
      <div className="nav-section">Modules</div>
      {MODULES.map(m => (
        <button
          key={m.id}
          className={"nav-mod" + (done.has(m.id) ? " done" : "")}
          onClick={() => go("mod_" + m.id)}
        >
          <span className="dot" />
          {m.title.length > 17 ? m.title.slice(0, 17) + "…" : m.title}
          {done.has(m.id) ? (
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#6DCFA0" }}>✓</span>
          ) : scores[m.id] ? (
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#E07B39" }}>{scores[m.id]}%</span>
          ) : null}
        </button>
      ))}
      <div className="progress-mini">
        <div className="prog-label">{student} — {pct}% complete</div>
        <div className="prog-bar-wrap">
          <div className="prog-bar-fill" style={{ width: pct + "%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Component ── */
function Dashboard({ done, scores, student, pct, finalPassed, payStatus, go }) {
  const avg = Object.values(scores).length
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
    : 0;

  return (
    <div>
      <div className="page-title">Welcome back, {student.split(" ")[0]} 👋</div>
      <div className="page-sub">Motor Vehicle Mechanic Trade Course — {INSTITUTE}</div>
      <div className="grid2" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-num">{done.size}/{MODULES.length}</div>
          <div className="stat-lbl">Modules completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{avg ? avg + "%" : "—"}</div>
          <div className="stat-lbl">Average quiz score</div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{pct}% of course completed</span>
          <span className={"tag " + (pct >= 100 ? "tag-green" : "tag-orange")}>
            {pct >= 100 ? "Course done" : "In progress"}
          </span>
        </div>
        <div className="progress-bar">
          <div className={"progress-fill" + (pct >= 100 ? " green" : "")} style={{ width: pct + "%" }} />
        </div>
      </div>

      {finalPassed && payStatus !== "paid" && (
        <div className="alert alert-blue" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span>🎉 You passed the Final Test! Pay the certification fee to unlock your certificate.</span>
          <button className="btn btn-blue btn-sm" style={{ whiteSpace: "nowrap" }} onClick={() => go("payment")}>
            Pay Now — {CERT_FEE}
          </button>
        </div>
      )}

      {payStatus === "pending" && (
        <div className="alert alert-orange">
          ⏳ Your direct deposit receipt is under review. Certificate will be unlocked once admin confirms payment.
        </div>
      )}

      {payStatus === "paid" && (
        <div className="alert alert-green">
          ✅ Payment confirmed! Your certificate is ready. Go to the Certificate tab.
        </div>
      )}

      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Course Modules</h3>
      {MODULES.map((m, i) => {
        const isDone = done.has(m.id);
        const sc = scores[m.id];
        const locked = i > 0 && !done.has(MODULES[i - 1].id);
        return (
          <div
            key={m.id}
            className={"mod-card" + (isDone ? " done" : "") + (locked ? " locked" : "")}
            onClick={() => !locked && go("mod_" + m.id)}
          >
            <div className="mod-ico">{m.ico}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <h4 style={{ fontSize: 19, fontWeight: 700 }}>{m.title}</h4>
                {isDone ? (
                  <span className="tag tag-green">✓ Complete</span>
                ) : sc ? (
                  <span className="tag tag-red">Retry</span>
                ) : locked ? (
                  <span className="tag tag-gray">🔒 Locked</span>
                ) : (
                  <span className="tag tag-orange">Start</span>
                )}
              </div>
              <p style={{ fontSize: 13.5, color: "#7A7469", marginBottom: 6 }}>{m.desc}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#AAA49C" }}>{m.dur}</span>
                {sc && <span style={{ fontSize: 12, color: sc >= 60 ? "#1E6E3F" : "#C0392B" }}>Quiz: {sc}%</span>}
              </div>
            </div>
            {!locked && <div style={{ fontSize: 22, color: "#E07B39", alignSelf: "center" }}>›</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ── Root App Component ── */
function App() {
  const [student, setStudent] = useState("");
  const [page, setPage] = useState("dashboard");
  const [modId, setModId] = useState(null);
  const [done, setDone] = useState(new Set());
  const [scores, setScores] = useState({});
  const [finalScore, setFinalScore] = useState(0);
  const [finalPassed, setFinalPassed] = useState(false);
  const [payStatus, setPayStatus] = useState(null);

  if (!student) {
    return <NameScreen onStart={n => setStudent(n)} />;
  }

  const pct = Math.round((done.size / MODULES.length) * 100);
  const allDone = done.size === MODULES.length;

  const go = p => {
    if (p.startsWith("mod_")) {
      setModId(parseInt(p.slice(4)));
      setPage("module");
    } else {
      setPage(p);
    }
  };

  let content;
  if (page === "dashboard") {
    content = (
      <Dashboard
        done={done}
        scores={scores}
        student={student}
        pct={pct}
        finalPassed={finalPassed}
        payStatus={payStatus}
        go={go}
      />
    );
  } else if (page === "module" && modId) {
    content = (
      <ModuleView
        mod={MODULES.find(m => m.id === modId)}
        onBack={() => setPage("dashboard")}
        onComplete={(id, sc) => {
          setScores(p => ({ ...p, [id]: sc }));
          if (sc >= 60) setDone(p => new Set([...p, id]));
        }}
      />
    );
  } else if (page === "chat") {
    content = <ChatView student={student} />;
  } else if (page === "finaltest") {
    content = (
      <FinalTest
        done={done}
        allDone={allDone}
        onScore={s => {
          setFinalScore(s);
          if (s >= 70) setFinalPassed(true);
        }}
      />
    );
  } else if (page === "payment") {
    content = (
      <PaymentView
        student={student}
        finalPassed={finalPassed}
        finalScore={finalScore}
        payStatus={payStatus}
        setPayStatus={setPayStatus}
      />
    );
  } else if (page === "certificate") {
    content = (
      <CertificateView
        student={student}
        score={finalScore}
        finalPassed={finalPassed}
        payStatus={payStatus}
      />
    );
  }

  return (
    <div className="app-wrap">
      <Sidebar page={page} go={go} done={done} scores={scores} student={student} pct={pct} payStatus={payStatus} />
      <main className="main">{content}</main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
