// ─────────────────────────────────────────────────────────────────────────────
// src/pages/ContactPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { COLORS }          from "../config/site.js";
import { useWindowWidth }  from "../hooks/useWindowWidth.js";

// ← Remplace par le vrai numéro WhatsApp (sans +, sans espaces)
const WHATSAPP_NUMBER = "33766511033";
const PHONE_NUMBER    = "+33 7 66 51 10 33";

const SOCIALS = [
  {
    name: "YouTube", handle: "@sololaveritestudio", color: "#FF0000",
    url: "https://youtube.com/@sololaveritestudio",
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF0000" width="22" height="22">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
      </svg>
    ),
  },
  {
    name: "Instagram", handle: "@sololaveritestudio", color: "#E1306C",
    url: "https://www.instagram.com/sololaveritetvoff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <defs>
          <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#F58529"/>
            <stop offset="30%"  stopColor="#DD2A7B"/>
            <stop offset="65%"  stopColor="#8134AF"/>
            <stop offset="100%" stopColor="#515BD4"/>
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig)"/>
        <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="#fff" strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok", handle: "@sololaveritestudio", color: "#010101",
    url: "https://www.tiktok.com/@sololaveritestudio",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <rect width="24" height="24" rx="6" fill="#010101"/>
        <path d="M19.6 8.2a4.8 4.8 0 0 1-2.8-.9v6.5a4.7 4.7 0 1 1-4.7-4.7h.5v2.4h-.5a2.3 2.3 0 1 0 2.3 2.3V4.4h2.3a4.8 4.8 0 0 0 2.9 3.4v.4z" fill="white"/>
        <path d="M17.8 7.4a4.8 4.8 0 0 0 1.8.8v-2a2.4 2.4 0 0 1-1.8-.8z" fill="#69C9D0"/>
        <path d="M12.1 11.5a2.3 2.3 0 0 0-2.3 2.3 2.3 2.3 0 0 0 2.3 2.3 2.3 2.3 0 0 0 2.3-2.3V4.4h-2.3v7.1z" fill="#EE1D52"/>
      </svg>
    ),
  },
  {
    name: "Facebook", handle: "@sololaveritestudio", color: "#1877F2",
    url: "https://www.facebook.com/sololaveritestudio/",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <rect width="24" height="24" rx="6" fill="#1877F2"/>
        <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white"/>
      </svg>
    ),
  },
];

const SUBJECTS = ["Partenariat", "Presse", "Casting invité", "Autre"];

export default function ContactPage() {
  const width    = useWindowWidth();
  const isMobile = width < 768;

  const [form,      setForm]      = useState({ name: "", email: "", subject: "Partenariat", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState("");

  const isValid = form.name && form.email && form.message;

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  const handleWhatsApp = () => {
    if (!isValid) return;
    const text = `Bonjour, je m'appelle ${form.name} (${form.email}).\n\nObjet : ${form.subject}\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width:        "100%",
    padding:      "12px 14px",
    border:       `1.5px solid ${focused === field ? COLORS.pink : "#e0e0e0"}`,
    borderRadius: 10,
    fontSize:     14,
    boxSizing:    "border-box",
    outline:      "none",
    transition:   "border-color .2s",
    fontFamily:   "inherit",
    background:   "#fafafa",
    color:        "#222",
  });

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh" }}>

      {/* ── Hero header ───────────────────────────────────────────────── */}
      <div style={{
        background:  `linear-gradient(135deg, ${COLORS.dark} 0%, #1a0a20 100%)`,
        padding:     isMobile ? "40px 20px" : "56px 40px",
        textAlign:   "center",
      }}>
        <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 4, marginBottom: 10 }}>
          📩 CONTACT
        </div>
        <h1 style={{
          color:      "#fff",
          fontSize:   isMobile ? 26 : 36,
          fontWeight: 900,
          margin:     "0 0 12px",
          fontFamily: "'Georgia', serif",
        }}>
          Parlons de Solola Vérité Studio
        </h1>
        <p style={{
          color:      "rgba(255,255,255,.55)",
          fontSize:   isMobile ? 13 : 15,
          maxWidth:   500,
          margin:     "0 auto",
          lineHeight: 1.7,
        }}>
          Partenariats, invitations, presse. On vous répond rapidement.
        </p>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div style={{
        maxWidth:            900,
        margin:              "0 auto",
        padding:             isMobile ? "28px 16px" : "48px 32px",
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
        gap:                 isMobile ? 28 : 40,
        alignItems:          "start",
      }}>

        {/* ── Réseaux sociaux ───────────────────────────────────────── */}
        <div>
          <h3 style={{ color: COLORS.blue, fontWeight: 800, marginBottom: 16, fontSize: 15, letterSpacing: 0.5 }}>
            Retrouvez-nous
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none" }}>
                <div style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          14,
                  padding:      "14px 16px",
                  background:   "#fff",
                  border:       "1px solid #eee",
                  borderRadius: 12,
                  cursor:       "pointer",
                  transition:   "box-shadow .2s",
                  boxShadow:    "0 1px 4px rgba(0,0,0,.04)",
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{s.handle}</div>
                  </div>
                  <span style={{ color: "#ccc", fontSize: 16 }}>→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Contact direct */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>

            {/* WhatsApp direct */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", background: "#fff",
                border: "1px solid #eee", borderRadius: 12,
                boxShadow: "0 1px 4px rgba(0,0,0,.04)",
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>WhatsApp</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Réponse rapide</div>
                </div>
                <span style={{ color: "#ccc", fontSize: 16 }}>→</span>
              </div>
            </a>

            {/* Call */}
            <a href={`tel:${PHONE_NUMBER}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", background: "#fff",
                border: `1px solid ${COLORS.blue}20`, borderRadius: 12,
                boxShadow: "0 1px 4px rgba(0,0,0,.04)",
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>Appeler</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{PHONE_NUMBER}</div>
                </div>
                <span style={{ color: "#ccc", fontSize: 16 }}>→</span>
              </div>
            </a>

               {/* Email direct */}
          <div style={{
            marginTop:    20,
            padding:      "16px",
            background:   "#fff",
            borderRadius: 12,
            border:       `1px solid ${COLORS.blue}20`,
            boxShadow:    "0 1px 4px rgba(0,0,0,.04)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 1.5, marginBottom: 6 }}>
              EMAIL DIRECT
            </div>
            <div style={{ fontWeight: 700, color: COLORS.blue, fontSize: 13 }}>
              contact@sololaveritestudio.com
            </div>
            <div style={{ color: "#aaa", fontSize: 11, marginTop: 4 }}>Réponse sous 48h ouvrées</div>
          </div>
       

          </div>
        </div>

        {/* ── Formulaire ────────────────────────────────────────────── */}
        <div style={{
          background:   "#fff",
          borderRadius: 16,
          padding:      isMobile ? "24px 20px" : "32px",
          boxShadow:    "0 4px 24px rgba(0,0,0,.06)",
          border:       "1px solid #f0f0f0",
        }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
              <h4 style={{ color: COLORS.blue, marginBottom: 8, fontSize: 18 }}>Message envoyé !</h4>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>On vous répond rapidement sur WhatsApp.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "Partenariat", message: "" }); }}
                style={{ background: COLORS.pink, color: "#fff", border: "none", padding: "11px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                Nouveau message
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ color: "#111", fontWeight: 800, marginBottom: 20, fontSize: 16 }}>
                Envoyer un message
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Nom + Email */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Votre nom", key: "name",  type: "text",  placeholder: "Jean Dupont" },
                    { label: "Email",     key: "email", type: "email", placeholder: "email@exemple.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6 }}>{f.label}</div>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        onFocus={() => setFocused(f.key)}
                        onBlur={() => setFocused("")}
                        style={inputStyle(f.key)}
                      />
                    </div>
                  ))}
                </div>

                {/* Objet */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 8 }}>Objet</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {SUBJECTS.map(s => (
                      <button key={s} onClick={() => setForm({ ...form, subject: s })}
                        style={{
                          background:   form.subject === s ? COLORS.pink : "#f0f0f0",
                          color:        form.subject === s ? "#fff" : "#555",
                          border:       "none",
                          padding:      "7px 14px",
                          borderRadius: 20,
                          fontSize:     12,
                          fontWeight:   form.subject === s ? 700 : 400,
                          cursor:       "pointer",
                          transition:   "all .15s",
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6 }}>Message</div>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    placeholder="Décrivez votre projet ou votre demande..."
                    style={{ ...inputStyle("message"), height: 110, resize: "none" }}
                  />
                </div>

                {/* Boutons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                  {/* WhatsApp */}
                  <button onClick={handleWhatsApp}
                    style={{
                      background:     isValid ? "#25D366" : "#e0e0e0",
                      color:          isValid ? "#fff" : "#aaa",
                      border:         "none",
                      padding:        "13px",
                      borderRadius:   10,
                      fontWeight:     700,
                      cursor:         isValid ? "pointer" : "not-allowed",
                      fontSize:       14,
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      gap:            8,
                      transition:     "background .2s",
                    }}>
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {isValid ? "Envoyer via WhatsApp" : "Remplissez tous les champs"}
                  </button>

                  {/* Séparateur */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                    <span style={{ color: "#ccc", fontSize: 12 }}>ou</span>
                    <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
                  </div>

                  {/* Call */}
                  <a href={`tel:${PHONE_NUMBER}`}
                    style={{
                      background:     COLORS.blue,
                      color:          "#fff",
                      padding:        "13px",
                      borderRadius:   10,
                      fontWeight:     700,
                      fontSize:       14,
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      gap:            8,
                      transition:     "background .2s",
                    }}>
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    Appeler directement
                  </a>

                </div>

                <p style={{ color: "#bbb", fontSize: 11, textAlign: "center", margin: 0 }}>
                  100 % gratuit, aucune donnée stockée.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}