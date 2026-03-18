// ─────────────────────────────────────────────────────────────────────────────
// src/pages/AboutPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Link }            from "react-router-dom";
import { SITE, COLORS }    from "../config/site.js";
import { useWindowWidth }  from "../hooks/useWindowWidth.js";

const VALUES = [
  { emoji: "🎙️", title: "La parole libre",    desc: "Ici on dit ce qu'on pense. Sans langue de bois, sans tabou, sans filtre." },
  { emoji: "👁️", title: "La transparence",    desc: "Nos invités parlent vrai. Nos sujets sont choisis pour leur impact réel." },
  { emoji: "🤝", title: "Le respect",         desc: "Débattre sans s'agresser. Questionner sans juger. C'est notre équilibre." },
  { emoji: "🔥", title: "L'authenticité",     desc: "Pas de mise en scène. Juste des conversations qui comptent vraiment." },
];

const MILESTONES = [
  { year: "2023", label: "Lancement du show",          desc: "Premier épisode diffusé sur YouTube. Le début de l'aventure." },
  { year: "2023", label: "10 000 abonnés",             desc: "La communauté prend vie. Les gens partagent, commentent, s'engagent." },
  { year: "2024", label: "100 000 vues cumulées",      desc: "Le show dépasse les frontières et touche une audience internationale." },
  { year: "2024", label: "Saison 2",                   desc: "Nouveaux invités, nouveaux sujets, nouvelle identité visuelle." },
  { year: "2025", label: "Site officiel & boutique",   desc: "sololaveritestudio.com et la boutique merch officiellement lancés." },
];

export default function AboutPage() {
  const width    = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div style={{
        background:  `linear-gradient(135deg, ${COLORS.dark} 0%, #1a0820 100%)`,
        padding:     isMobile ? "60px 20px 48px" : "80px 40px 64px",
        textAlign:   "center",
        position:    "relative",
        overflow:    "hidden",
      }}>
        {/* Cercles décoratifs */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `${COLORS.pink}12`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: `${COLORS.blue}15`, pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <img src={SITE.logoUrl} alt={SITE.name} style={{
            width: isMobile ? 72 : 88, height: isMobile ? 72 : 88,
            borderRadius: 16, objectFit: "cover",
            margin: "0 auto 20px", display: "block",
            boxShadow: `0 8px 32px ${COLORS.pink}40`,
          }} />
          <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 4, marginBottom: 12 }}>
            À PROPOS
          </div>
          <h1 style={{
            color:      "#fff",
            fontSize:   isMobile ? 28 : 42,
            fontWeight: 900,
            margin:     "0 0 16px",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.2,
          }}>
            La vérité, ça se mérite
          </h1>
          <p style={{
            color:      "rgba(255,255,255,.6)",
            fontSize:   isMobile ? 14 : 17,
            maxWidth:   560,
            margin:     "0 auto 32px",
            lineHeight: 1.8,
          }}>
            Solola Vérité Studio est un talk-show vidéo engagé, publié sur YouTube.
            Des conversations authentiques, des débats francs, des invités qui osent.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              background: COLORS.pink, color: "#fff",
              padding: isMobile ? "11px 22px" : "13px 28px",
              borderRadius: 8, fontWeight: 700, fontSize: isMobile ? 13 : 15,
              textDecoration: "none",
            }}>
              ▶ Voir les épisodes
            </Link>
            <Link to="/contact" style={{
              background: "rgba(255,255,255,.08)", color: "#fff",
              border: "1px solid rgba(255,255,255,.2)",
              padding: isMobile ? "11px 22px" : "13px 28px",
              borderRadius: 8, fontWeight: 600, fontSize: isMobile ? 13 : 15,
              textDecoration: "none",
            }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* ── Le concept ────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        padding:  isMobile ? "48px 20px" : "64px 32px",
      }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap:                 isMobile ? 32 : 56,
          alignItems:          "center",
        }}>
          <div>
            <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 3, marginBottom: 10 }}>
              LE CONCEPT
            </div>
            <h2 style={{
              color: COLORS.dark, fontSize: isMobile ? 24 : 30,
              fontWeight: 900, margin: "0 0 16px",
              fontFamily: "'Georgia', serif", lineHeight: 1.3,
            }}>
              Un talk-show qui dit ce que les autres ne disent pas
            </h2>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 16px" }}>
              Solola Vérité Studio est né d'un constat simple : trop de médias édulcorent la réalité.
              Trop d'interviews restent en surface. Trop de sujets importants sont évités.
            </p>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 16px" }}>
              Notre mission est de créer un espace où la parole est libre, où les invités
              s'expriment sans contrainte, et où les sujets qui font la vie quotidienne
              sont enfin traités avec honnêteté.
            </p>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8 }}>
              Chaque épisode est une conversation, pas une performance. Une rencontre,
              pas une démonstration.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { num: "42+",   label: "Épisodes",          color: COLORS.blue },
              { num: "2",     label: "Saisons",            color: COLORS.pink },
              { num: "1M+",   label: "Vues cumulées",      color: COLORS.blue },
              { num: "128K",  label: "Abonnés YouTube",    color: COLORS.pink },
            ].map((s, i) => (
              <div key={i} style={{
                background:   "#fff",
                borderRadius: 14,
                padding:      "24px 20px",
                textAlign:    "center",
                boxShadow:    "0 2px 12px rgba(0,0,0,.06)",
                border:       "1px solid #f0f0f0",
              }}>
                <div style={{ fontSize: isMobile ? 28 : 34, fontWeight: 900, color: s.color, fontFamily: "'Georgia', serif" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4, fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nos valeurs ───────────────────────────────────────────────── */}
      <div style={{ background: COLORS.dark, padding: isMobile ? "48px 20px" : "64px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
            <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 3, marginBottom: 10 }}>
              NOS VALEURS
            </div>
            <h2 style={{
              color: "#fff", fontSize: isMobile ? 24 : 32,
              fontWeight: 900, margin: 0,
              fontFamily: "'Georgia', serif",
            }}>
              Ce en quoi on croit
            </h2>
          </div>
          <div style={{
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
            gap:                 16,
          }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                background:   "rgba(255,255,255,.04)",
                border:       "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
                padding:      "24px 20px",
                textAlign:    "center",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.emoji}</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
                  {v.title}
                </div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.6 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: isMobile ? "48px 20px" : "64px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
          <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 3, marginBottom: 10 }}>
            NOTRE HISTOIRE
          </div>
          <h2 style={{
            color: COLORS.dark, fontSize: isMobile ? 24 : 32,
            fontWeight: 900, margin: 0,
            fontFamily: "'Georgia', serif",
          }}>
            Les grandes étapes
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Ligne verticale */}
          {!isMobile && (
            <div style={{
              position:   "absolute",
              left:       "50%",
              top:        0, bottom: 0,
              width:      2,
              background: `linear-gradient(to bottom, ${COLORS.pink}, ${COLORS.blue})`,
              transform:  "translateX(-50%)",
            }} />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 0 }}>
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} style={{
                  display:        "flex",
                  justifyContent: isMobile ? "flex-start" : isLeft ? "flex-end" : "flex-start",
                  paddingRight:   isMobile ? 0 : isLeft ? "calc(50% + 24px)" : 0,
                  paddingLeft:    isMobile ? 0 : isLeft ? 0 : "calc(50% + 24px)",
                  marginBottom:   isMobile ? 0 : 28,
                }}>
                  {/* Point sur la timeline */}
                  {!isMobile && (
                    <div style={{
                      position:   "absolute",
                      left:       "50%",
                      transform:  "translateX(-50%)",
                      width:      14, height: 14,
                      borderRadius: "50%",
                      background: i % 2 === 0 ? COLORS.pink : COLORS.blue,
                      border:     "3px solid #f7f8fc",
                      marginTop:  16,
                      zIndex:     1,
                    }} />
                  )}

                  <div style={{
                    background:   "#fff",
                    borderRadius: 12,
                    padding:      "18px 20px",
                    boxShadow:    "0 2px 12px rgba(0,0,0,.06)",
                    border:       "1px solid #f0f0f0",
                    maxWidth:     isMobile ? "100%" : 280,
                    width:        "100%",
                    borderLeft:   isMobile ? `3px solid ${i % 2 === 0 ? COLORS.pink : COLORS.blue}` : "none",
                  }}>
                    <div style={{
                      display:      "inline-block",
                      background:   i % 2 === 0 ? `${COLORS.pink}15` : `${COLORS.blue}15`,
                      color:        i % 2 === 0 ? COLORS.pink : COLORS.blue,
                      padding:      "3px 10px",
                      borderRadius: 20,
                      fontSize:     11,
                      fontWeight:   800,
                      marginBottom: 8,
                    }}>
                      {m.year}
                    </div>
                    <div style={{ color: "#111", fontWeight: 800, fontSize: 14, marginBottom: 4 }}>
                      {m.label}
                    </div>
                    <div style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>
                      {m.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA final ─────────────────────────────────────────────────── */}
      <div style={{
        background:  `linear-gradient(135deg, ${COLORS.blue} 0%, #0d1f3c 100%)`,
        padding:     isMobile ? "48px 20px" : "64px 40px",
        textAlign:   "center",
      }}>
        <h2 style={{
          color: "#fff", fontSize: isMobile ? 24 : 32,
          fontWeight: 900, margin: "0 0 14px",
          fontFamily: "'Georgia', serif",
        }}>
          Rejoins la communauté
        </h2>
        <p style={{
          color:      "rgba(255,255,255,.6)",
          fontSize:   isMobile ? 14 : 16,
          margin:     "0 auto 32px",
          maxWidth:   480,
          lineHeight: 1.7,
        }}>
          Abonne-toi à la chaîne, suis-nous sur les réseaux et ne rate aucun épisode.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://youtube.com/@sololaveritestudio" target="_blank" rel="noopener noreferrer"
            style={{
              background: "#FF0000", color: "#fff",
              padding: isMobile ? "11px 22px" : "13px 28px",
              borderRadius: 8, fontWeight: 700, fontSize: isMobile ? 13 : 15,
              textDecoration: "none",
            }}>
            ▶ S'abonner sur YouTube
          </a>
          {/* <Link to="/equipe" style={{
            background: "rgba(255,255,255,.1)", color: "#fff",
            border: "1px solid rgba(255,255,255,.2)",
            padding: isMobile ? "11px 22px" : "13px 28px",
            borderRadius: 8, fontWeight: 600, fontSize: isMobile ? 13 : 15,
            textDecoration: "none",
          }}>
            Découvrir l'équipe →
          </Link>/* --- IGNORE --- */}
        </div>
      </div>

    </div>
  );
}