import React, { useState, useRef, useEffect } from 'react';
import { INSTITUTE, SHORT } from '../data/modulesData';

export default function ChatView({ student }) {
  const [msgs, setMsgs] = useState([
    {
      r: "ai",
      t: `Apinun ${student.split(" ")[0]}! I'm your AI Mechanic Tutor 🔧\n\nI'm here to support your studies at ${INSTITUTE}. Ask me anything about engines, fuel systems, electrics, brakes or transmission. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    const newMsgs = [...msgs, { r: "user", t: msg }];
    setMsgs(newMsgs);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs.map(m => ({
            role: m.r === "ai" ? "assistant" : "user",
            content: m.t
          }))
        })
      });
      const d = await res.json();
      setMsgs(p => [...p, { r: "ai", t: d.reply || "Sorry, try again." }]);
    } catch {
      setMsgs(p => [...p, { r: "ai", t: "Connection error. Please check your internet and try again." }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-title">AI Mechanic Tutor</div>
      <div className="page-sub">{SHORT} — Your personal tutor, available 24/7</div>
      <div className="chat-wrap">
        <div className="chat-msgs">
          {msgs.map((m, i) => (
            <div key={i} className={m.r === "user" ? "msg-user" : "msg-ai"}>
              <div className={m.r === "user" ? "bubble-user" : "bubble-ai"}>{m.t}</div>
            </div>
          ))}
          {loading && (
            <div className="msg-ai">
              <div className="bubble-ai">
                <div className="typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Ask about engines, fuel, electrics, brakes..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
          />
          <button
            className="btn btn-orange btn-sm"
            onClick={send}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
