import React, { useState } from 'react';
import { SHORT, CERT_FEE, BANK, fmtCard, fmtExp, today } from '../data/modulesData';

export default function PaymentView({ student, finalPassed, finalScore, payStatus, setPayStatus }) {
  const [method, setMethod] = useState(null);
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [txRef] = useState(() => "PTSTI-" + Date.now().toString().slice(-8));

  const doPay = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2400));
    setProcessing(false);
    setPayStatus("paid");
  };

  if (!finalPassed) {
    return (
      <div>
        <div className="page-title">Registration & Payment</div>
        <div className="page-sub">{SHORT} — Certification Fee</div>
        <div className="alert alert-orange">
          🔒 Complete all modules and pass the Final Test before proceeding to payment.
        </div>
      </div>
    );
  }

  if (payStatus === "paid") {
    return (
      <div>
        <div className="page-title">Payment Confirmed</div>
        <div className="card" style={{ maxWidth: 520, textAlign: "center", padding: "36px 32px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Payment Received</h3>
          <div className="bank-box" style={{ textAlign: "left" }}>
            <div className="bank-row">
              <span className="bl">Student</span>
              <span className="bv">{student}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Amount paid</span>
              <span className="bv">{CERT_FEE}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Reference</span>
              <span className="bv">{txRef}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Date</span>
              <span className="bv">{today()}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Status</span>
              <span className="bv" style={{ color: "#1E6E3F" }}>✓ Confirmed</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#7A7469", marginTop: 14 }}>
            Your certificate is now unlocked. Go to the Certificate tab to collect it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">Registration & Payment</div>
      <div className="page-sub">Pay the certification fee to receive your Certificate of Attainment</div>
      <div className="card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 13, color: "#7A7469", marginBottom: 2 }}>Certification fee</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, color: "#E07B39" }}>
              {CERT_FEE}
            </div>
            <div style={{ fontSize: 12, color: "#AAA49C", marginTop: 2 }}>
              Motor Vehicle Mechanic Trade Course — {SHORT}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="tag tag-blue">Final score: {finalScore}%</div>
            <div style={{ fontSize: 12, color: "#AAA49C", marginTop: 6 }}>{student}</div>
          </div>
        </div>
      </div>

      {!method && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Choose payment method</h3>
          <div className="pay-method-row">
            <div className="pay-method-btn" onClick={() => setMethod("card")}>
              <div className="pico">💳</div>
              <div className="ptitle">Debit / Credit Card</div>
              <div className="psub">Visa or Mastercard — instant approval</div>
            </div>
            <div className="pay-method-btn" onClick={() => setMethod("deposit")}>
              <div className="pico">🏦</div>
              <div className="ptitle">Direct Deposit</div>
              <div className="psub">Bank transfer + upload proof of payment</div>
            </div>
          </div>
        </div>
      )}

      {method === "card" && !processing && payStatus !== "paid" && (
        <div>
          <button className="back-btn" onClick={() => setMethod(null)}>‹ Change method</button>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Card Details</h3>
          <div className="card-visual">
            <div className="card-chip" />
            <div className="card-num">{cardNum || "•••• •••• •••• ••••"}</div>
            <div className="card-meta">
              <span>{cardName || "CARDHOLDER NAME"}</span>
              <span>{expiry || "MM/YY"}</span>
            </div>
          </div>
          <label className="fi-label">Card number</label>
          <input
            className="fi"
            placeholder="0000 0000 0000 0000"
            value={cardNum}
            onChange={e => setCardNum(fmtCard(e.target.value))}
            maxLength={19}
          />
          <label className="fi-label">Cardholder name</label>
          <input
            className="fi"
            placeholder="As shown on card"
            value={cardName}
            onChange={e => setCardName(e.target.value.toUpperCase())}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label className="fi-label">Expiry</label>
              <input
                className="fi"
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(fmtExp(e.target.value))}
                maxLength={5}
              />
            </div>
            <div>
              <label className="fi-label">CVV</label>
              <input
                className="fi"
                placeholder="•••"
                type="password"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              />
            </div>
          </div>
          <div className="alert alert-blue" style={{ marginBottom: 16 }}>
            🔒 Your card details are encrypted and processed securely.
          </div>
          <button
            className="btn btn-orange"
            style={{ width: "100%" }}
            disabled={cardNum.replace(/\s/g, "").length < 16 || !cardName.trim() || expiry.length < 5 || cvv.length < 3}
            onClick={doPay}
          >
            Pay {CERT_FEE} →
          </button>
        </div>
      )}

      {method === "card" && processing && (
        <div className="alert alert-blue">⏳ Processing payment, please wait…</div>
      )}

      {method === "deposit" && !submitted && (
        <div>
          <button className="back-btn" onClick={() => setMethod(null)}>‹ Change method</button>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Bank Direct Deposit Details</h3>
          <div className="bank-box">
            <div className="bank-row">
              <span className="bl">Bank</span>
              <span className="bv">{BANK.name}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Account name</span>
              <span className="bv">{SHORT}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Account number</span>
              <span className="bv">{BANK.acct}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Branch</span>
              <span className="bv">{BANK.branch}</span>
            </div>
            <div className="bank-row">
              <span className="bl">BSB / Branch code</span>
              <span className="bv">{BANK.bsb}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Amount to deposit</span>
              <span className="bv" style={{ color: "#E07B39" }}>{CERT_FEE}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Payment reference</span>
              <span className="bv">{BANK.ref}</span>
            </div>
          </div>
          <div className="alert alert-orange" style={{ marginBottom: 16 }}>
            Important: Include your full name as the payment reference so we can match your payment.
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Upload Proof of Receipt</h3>
          <div className={"upload-area" + (file ? " has-file" : "")}>
            <input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files[0])} />
            {!file && (
              <div>
                <div style={{ fontSize: 30, marginBottom: 8 }}>📎</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Click to upload receipt</div>
                <div style={{ fontSize: 12, color: "#7A7469", marginTop: 4 }}>JPG, PNG or PDF accepted</div>
              </div>
            )}
            {file && (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 24 }}>{file.type.includes("pdf") ? "📄" : "🖼️"}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{file.name}</div>
                  <div style={{ fontSize: 12, color: "#1E6E3F" }}>
                    {Math.round(file.size / 1024)} KB — Ready to submit
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-orange"
            style={{ width: "100%" }}
            disabled={!file}
            onClick={() => {
              setPayStatus("pending");
              setSubmitted(true);
            }}
          >
            Submit Receipt for Review →
          </button>
        </div>
      )}

      {method === "deposit" && submitted && (
        <div>
          <div className="alert alert-orange">
            ⏳ Receipt submitted! The PTSTI admin team will review your payment. Your certificate will be unlocked once confirmed.
          </div>
          <div className="card">
            <div style={{ fontSize: 13, color: "#7A7469", marginBottom: 10 }}>Submission summary</div>
            <div className="bank-row">
              <span className="bl">Student</span>
              <span className="bv">{student}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Receipt file</span>
              <span className="bv">{file?.name}</span>
            </div>
            <div className="bank-row">
              <span className="bl">Status</span>
              <span className="bv" style={{ color: "#C45A15" }}>Pending admin review</span>
            </div>
            <div className="bank-row">
              <span className="bl">Submitted on</span>
              <span className="bv">{today()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
