import React, { useState } from 'react';
import { FINAL, MODULES, SHORT, LETTERS } from '../data/modulesData';

export default function FinalTest({ done, allDone, onScore }) {
  const [ans, setAns] = useState({});
  const [sub, setSub] = useState(false);
  const [sc, setSc] = useState(0);
  const passed = sc >= 70;

  const submit = () => {
    let s = 0;
    FINAL.forEach((q, i) => {
      if (ans[i] === q.ans) s++;
    });
    const p = Math.round((s / FINAL.length) * 100);
    setSc(p);
    onScore(p);
    setSub(true);
  };

  if (!allDone) {
    return (
      <div>
        <div className="page-title">Final Test</div>
        <div className="page-sub">{SHORT} — Motor Vehicle Mechanic</div>
        <div className="alert alert-orange">
          🔒 Complete all {MODULES.length} modules to unlock the Final Test. Currently {done.size}/{MODULES.length} done.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">Final Test</div>
      <div className="page-sub">20 questions — Pass mark: 70% — Certificate issued on pass</div>
      {sub && (
        <div className={"alert " + (passed ? "alert-green" : "alert-red")} style={{ marginBottom: 24 }}>
          {passed
            ? `🎉 Congratulations! You scored ${sc}% — You've passed! Proceed to Payment to unlock your certificate.`
            : `❌ Score: ${sc}% — Need 70% to pass. Review your modules and try again.`}
        </div>
      )}
      {FINAL.map((q, qi) => (
        <div key={qi} className="card" style={{ marginBottom: 12 }}>
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
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button
            className="btn btn-orange"
            disabled={Object.keys(ans).length < FINAL.length}
            onClick={submit}
          >
            Submit Final Test
          </button>
        </div>
      )}
      {sub && !passed && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setAns({});
              setSub(false);
              setSc(0);
            }}
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
}
