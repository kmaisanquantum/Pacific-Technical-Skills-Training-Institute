import React, { useState } from 'react';
import { INSTITUTE, SHORT, today } from '../data/modulesData';

export default function CertificateView({ student, score, finalPassed, payStatus }) {
  const [lecName, setLecName] = useState("");
  const [approved, setApproved] = useState(false);

  if (!finalPassed) {
    return (
      <div>
        <div className="page-title">Certificate of Attainment</div>
        <div className="alert alert-orange">Complete all modules and pass the Final Test first.</div>
      </div>
    );
  }

  if (payStatus !== "paid") {
    return (
      <div>
        <div className="page-title">Certificate of Attainment</div>
        <div className="alert alert-orange">
          💳 Certification fee payment is required before the certificate can be issued. Go to the Payment tab.
        </div>
        {payStatus === "pending" && (
          <div className="alert alert-blue" style={{ marginTop: 8 }}>
            ⏳ Your direct deposit receipt is under review. Certificate will be unlocked once payment is confirmed.
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">Certificate of Attainment</div>
      <div className="page-sub">{INSTITUTE} — Lecturer approval required</div>
      <div className="card" style={{ maxWidth: 500, marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Lecturer Approval</h3>
        <p style={{ fontSize: 14, color: "#7A7469", marginBottom: 14 }}>
          Enter your name below to sign and issue the certificate:
        </p>
        <input
          className="fi"
          placeholder="Lecturer's full name"
          value={lecName}
          onChange={e => setLecName(e.target.value)}
        />
        {!approved && (
          <button
            className="btn btn-orange"
            disabled={!lecName.trim()}
            onClick={() => setApproved(true)}
          >
            ✓ Approve & Sign Certificate
          </button>
        )}
        {approved && (
          <div className="alert alert-green">✅ Certificate signed by {lecName}</div>
        )}
        {approved && (
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 12 }}
            onClick={() => window.print()}
          >
            🖨️ Print Certificate
          </button>
        )}
      </div>

      <div className="cert-wrap">
        <div className="cert-inner" />
        <div className="cert-seal">🏆</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#7A7469", marginBottom: 8 }}>
          {INSTITUTE.toUpperCase()}
        </div>
        <div className="cert-heading">Certificate of Attainment</div>
        <div style={{ fontSize: 14, color: "#7A7469", marginBottom: 6 }}>This is to certify that</div>
        <div className="cert-name">{student}</div>
        <div className="cert-body">
          has successfully completed the <strong>Motor Vehicle Mechanic Trade Course</strong> at the <strong>{INSTITUTE}</strong>,
          {"\n"}covering Engine Fundamentals, Fuel Systems, Electrical Systems,
          {"\n"}Brakes & Suspension, and Transmission & Drivetrain.
          {"\n\n"}
          Final Assessment Score: <strong>{score}%</strong>
          {"\n"}Date of Issue: {today()}
          {"\n"}Certification Fee: <strong>Paid ✓</strong>
        </div>
        <div style={{ marginTop: 24 }}>
          <div className="sig-line">{approved ? lecName : "_____________________"}</div>
          <div className="sig-sub">
            {approved ? `Lecturer — Motor Vehicle Mechanics, ${SHORT}` : "Awaiting lecturer signature"}
          </div>
          {!approved && (
            <p style={{ fontSize: 12, color: "#E07B39", marginTop: 8 }}>Awaiting lecturer approval above</p>
          )}
        </div>
      </div>
    </div>
  );
}
