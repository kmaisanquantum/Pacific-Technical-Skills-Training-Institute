import React, { useState } from 'react';
import { LETTERS } from '../data/modulesData';

export default function ModuleView({ mod, onBack, onComplete }) {
  const [tab, setTab] = useState("lesson");
  const [ans, setAns] = useState({});
  const [sub, setSub] = useState(false);
  const [sc, setSc] = useState(null);
  const passed = sc != null && sc >= 60;

  const submit = () => {
    let s = 0;
    mod.quiz.forEach((q, i) => {
      if (ans[i] === q.ans) s++;
    });
    const p = Math.round((s / mod.quiz.length) * 100);
    setSc(p);
    setSub(true);
    setTab("quiz");
    onComplete(mod.id, p);
  };

  return (
    <div>
      <button className="back-btn" onClick={onBack}>‹ Back to Dashboard</button>
      <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 4 }}>{mod.ico} {mod.title}</h2>
      <p className="page-sub">{mod.dur} · {mod.desc}</p>
      <div className="tab-bar">
        <button
          className={"tab" + (tab === "lesson" ? " active" : "")}
          onClick={() => setTab("lesson")}
        >
          Lesson
        </button>
        <button
          className={"tab" + (tab === "quiz" ? " active" : "")}
          onClick={() => setTab("quiz")}
        >
          Quiz{sc != null ? " (" + sc + "%)" : ""}
        </button>
      </div>

      {tab === "lesson" && (
        <div>
          <div className="video-wrap">
            <iframe
              src={"https://www.youtube.com/embed/" + mod.vid + "?rel=0"}
              allowFullScreen
              title={mod.title}
            />
          </div>
          <div className="lesson-content">
            {mod.content.split("\n").map((ln, i) => {
              if (!ln.trim()) return <div key={i} style={{ height: 8 }} />;
              if (/^[A-Z][A-Z\s&–]+$/.test(ln)) {
                return (
                  <div key={i} style={{ marginTop: 16, fontSize: 13, fontWeight: 600, letterSpacing: ".06em", color: "#7A7469" }}>
                    {ln}
                  </div>
                );
              }
              if (/^\d\./.test(ln)) return <div key={i} style={{ paddingLeft: 16, margin: "3px 0", fontWeight: 500 }}>{ln}</div>;
              if (ln.startsWith("•")) return <div key={i} style={{ paddingLeft: 16, margin: "2px 0" }}>{ln}</div>;
              return <p key={i} style={{ margin: "4px 0" }}>{ln}</p>;
            })}
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-orange" onClick={() => setTab("quiz")}>Take Module Quiz →</button>
          </div>
        </div>
      )}

      {tab === "quiz" && (
        <div>
          {sub && (
            <div className={"alert " + (passed ? "alert-green" : "alert-red")} style={{ marginBottom: 20 }}>
              {passed
                ? `✅ Passed! Score: ${sc}% — Well done!`
                : `❌ Score: ${sc}% — Need 60% to pass. Review the lesson and try again.`}
            </div>
          )}
          {mod.quiz.map((q, qi) => (
            <div key={qi} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>{`Q${qi + 1}. ${q.q}`}</p>
              {q.opts.map((opt, oi) => {
                let cls = "quiz-opt";
                if (!sub && ans[qi] === oi) cls += " sel";
                if (sub) {
                  if (oi === q.ans) cls += " correct";
                  else if (ans[qi] === oi) cls += " wrong";
                }
                return (
                  <button
                    key={oi}
                    className={cls}
                    disabled={sub}
                    onClick={() => !sub && setAns(a => ({ ...a, [qi]: oi }))}
                  >
                    <span className="opt-letter">{LETTERS[oi]}</span>{opt}
                  </button>
                );
              })}
            </div>
          ))}
          {!sub && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn btn-orange"
                disabled={Object.keys(ans).length < mod.quiz.length}
                onClick={submit}
              >
                Submit Quiz
              </button>
            </div>
          )}
          {sub && !passed && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setAns({});
                  setSub(false);
                  setSc(null);
                }}
              >
                Retry Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
