// ─────────────────────────────────────────────────────────────────────────────
// src/components/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// src/components/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link } from "react-router-dom";
import { SITE, COLORS } from "../config/site.js";
import { useWindowWidth } from "../hooks/useWindowWidth.js";

const SOCIALS = [
  {
    name: "YouTube", url: "https://youtube.com/@sololaveritestudio",
    icon: <svg viewBox="0 0 24 24" fill="#FF0000" width="20" height="20"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>,
  },
  {
    name: "Instagram", url: "https://www.instagram.com/sololaveritetvoff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <defs><linearGradient id="ig-f" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F58529"/><stop offset="30%" stopColor="#DD2A7B"/><stop offset="65%" stopColor="#8134AF"/><stop offset="100%" stopColor="#515BD4"/></linearGradient></defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-f)"/>
        <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="#fff" strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok", url: "https://www.tiktok.com/discover/solola-verite-tv",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect width="24" height="24" rx="6" fill="#010101"/>
        <path d="M19.6 8.2a4.8 4.8 0 0 1-2.8-.9v6.5a4.7 4.7 0 1 1-4.7-4.7h.5v2.4h-.5a2.3 2.3 0 1 0 2.3 2.3V4.4h2.3a4.8 4.8 0 0 0 2.9 3.4v.4z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Facebook", url: "https://www.facebook.com/sololaveritestudio/",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect width="24" height="24" rx="6" fill="#1877F2"/>
        <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white"/>
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home",         to: "/"        },
  { label: "Épisodes",        to: "/episodes"},
  //{ label: "À propos",        to: "/about"   },
  //{ label: "Équipe",          to: "/equipe"  },
  { label: "Contact",         to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales",       to: "/mentions-legales"  },
  { label: "Politique de confidentialité", to: "/confidentialite" },
];

export default function Footer() {
  const width    = useWindowWidth();
  const isMobile = width < 768;

  return (
    <footer style={{ background: "#060d1a", borderTop: "1px solid rgba(255,255,255,.08)" }}>

      {/* ── Main footer ───────────────────────────────────────────────── */}
      <div style={{
        maxWidth:            1200,
        margin:              "0 auto",
        padding:             isMobile ? "36px 20px 24px" : "48px 32px 32px",
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr 1fr",
        gap:                 isMobile ? 32 : 48,
      }}>

        {/* ── Colonne 1 : Brand ─────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <img src={SITE.logoUrl} alt={SITE.name}
              style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: 0.5 }}>
                {SITE.name}
              </div>
              <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 600, letterSpacing: 2 }}>
                STUDIO
              </div>
            </div>
          </div>
          <p style={{
            color:      "rgba(255,255,255,.4)",
            fontSize:   13,
            lineHeight: 1.7,
            margin:     "0 0 20px",
            maxWidth:   260,
          }}>
            {SITE.tagline}
          </p>
          {/* Icônes réseaux */}
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                title={s.name}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  width:          36,
                  height:         36,
                  borderRadius:   8,
                  background:     "rgba(255,255,255,.06)",
                  border:         "1px solid rgba(255,255,255,.08)",
                  transition:     "background .2s, transform .2s",
                  cursor:         "pointer",
                }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Colonne 2 : Navigation ────────────────────────────────── */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: 1 }}>
            NAVIGATION
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} style={{
                color:          "rgba(255,255,255,.45)",
                fontSize:       13,
                textDecoration: "none",
                transition:     "color .2s",
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Colonne 3 : Contact ───────────────────────────────────── */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: 1 }}>
            CONTACT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="mailto:contact@sololaveritestudio.com" style={{
              color:          COLORS.pink,
              fontSize:       13,
              textDecoration: "none",
              fontWeight:     600,
            }}>
              contact@sololaveritestudio.com
            </a>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 12 }}>
              Réponse sous 48h ouvrées
            </div>
            <Link to="/contact" style={{
              display:        "inline-block",
              marginTop:      8,
              background:     COLORS.pink,
              color:          "#fff",
              padding:        "9px 18px",
              borderRadius:   8,
              fontSize:       12,
              fontWeight:     700,
              textDecoration: "none",
              width:          "fit-content",
            }}>
              Nous contacter →
            </Link>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,.06)",
        padding:   isMobile ? "16px 20px" : "16px 32px",
        maxWidth:  1200,
        margin:    "0 auto",
        display:   "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexDirection:  isMobile ? "column" : "row",
        gap:            isMobile ? 10 : 0,
      }}>
        <span style={{ color: "rgba(255,255,255,.25)", fontSize: 12 }}>
          © {new Date().getFullYear()} {SITE.name} — Tous droits réservés
        </span>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-end" }}>
          {LEGAL_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} style={{
              color:          "rgba(255,255,255,.25)",
              fontSize:       12,
              textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
}