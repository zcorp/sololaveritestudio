// ─────────────────────────────────────────────────────────────────────────────
// src/pages/ContactPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { COLORS } from "../config/site.js";

const SOCIALS = [
  { name: "YouTube",   handle: "@sololaveritestudio", emoji: "▶️", color: "#FF0000" },
  { name: "Instagram", handle: "@svstudio",           emoji: "📷", color: "#E1306C" },
  { name: "TikTok",    handle: "@svstudio",           emoji: "🎵", color: "#000"    },
  { name: "Twitter/X", handle: "@svstudio",           emoji: "𝕏",  color: "#000"    },
];

const SUBJECTS = ["Partenariat", "Presse", "Casting invité", "Autre"];

export default function ContactPage() {
  const [form, setForm]           = useState({ name: "", email: "", subject: "Partenariat", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <div style={{ padding: 40, background: "#fff", minHeight: 500 }}>
      <h2 style={{ color: COLORS.blue, fontSize: 22, fontWeight: 800, marginBottom: 24 }}>📩 Contact & Réseaux</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Socials */}
        <div>
          <h3 style={{ color: COLORS.pink, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Nos réseaux</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SOCIALS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: "1px solid #eee", borderRadius: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{s.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <h3 style={{ color: COLORS.pink, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Nous contacter</h3>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h4 style={{ color: COLORS.blue, marginBottom: 8 }}>Message envoyé !</h4>
              <p style={{ color: "#666", fontSize: 14 }}>On vous répond sous 48h.</p>
              <button style={{ marginTop: 16, background: COLORS.pink, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "Partenariat", message: "" }); }}>
                Nouveau message
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Votre nom", key: "name",  type: "text",  placeholder: "Jean Dupont" },
                { label: "Email",     key: "email", type: "email", placeholder: "email@exemple.com" },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>{f.label}</div>
                  <input type={f.type} placeholder={f.placeholder}
                    value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Objet</div>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14 }}>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 4 }}>Message</div>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Votre message..."
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, height: 80, boxSizing: "border-box", resize: "none" }} />
              </div>
              <button onClick={handleSubmit}
                style={{ background: COLORS.blue, color: "#fff", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                Envoyer le message →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
