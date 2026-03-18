// ─────────────────────────────────────────────────────────────────────────────
// src/pages/EpisodesPage.jsx  — lazy loaded
// ─────────────────────────────────────────────────────────────────────────────
//import React, { useState, useEffect } from "react";
import { useEpisodes }    from "../hooks/useEpisodes.js";
import { COLORS }         from "../config/site.js";
import { useWindowWidth } from "../hooks/useWindowWidth.js";
import React, { useState, useEffect, useRef } from "react";

export default function EpisodesPage() {
  const { episodes: eps, loading } = useEpisodes();
  const [activeEp, setActiveEp]   = useState(null);
  const [search,   setSearch]     = useState("");
  const [visible,  setVisible]    = useState(9);

  const width     = useWindowWidth();
  const isMobile  = width < 768;
  const isTablet  = width >= 768 && width < 1024;
  const isSmall   = width < 1024;

  useEffect(() => {
    if (eps.length > 0 && !activeEp) setActiveEp(eps[0]);
  }, [eps]);

  useEffect(() => { setVisible(9); }, [search]);

  const filtered  = eps.filter(ep =>
    (ep.title ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;

  const loaderRef = useRef(null);
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && hasMore) setVisible(v => v + 9); },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, displayed.length]);

  // Colonnes grille selon device
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <div style={{
      background:    COLORS.dark,
      height:        isMobile ? "auto" : "100vh",
      minHeight:     isMobile ? "100vh" : "auto",
      display:       "flex",
      flexDirection: "column",
      overflow:      isMobile ? "auto" : "hidden",
    }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div style={{
        background:   "linear-gradient(180deg, #0d1f3c 0%, #0A1628 100%)",
        padding:      isMobile ? "16px" : "24px 32px",
        borderBottom: "1px solid rgba(255,255,255,.1)",
        flexShrink:   0,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display:        "flex",
            alignItems:     isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexDirection:  isMobile ? "column" : "row",
            gap:            isMobile ? 12 : 0,
          }}>
            <div>
              <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 3, marginBottom: 4 }}>
                🎬 TOUS LES ÉPISODES
              </div>
              <h1 style={{
                color:      "#fff",
                fontSize:   isMobile ? 22 : 28,
                fontWeight: 900,
                margin:     0,
                fontFamily: "'Georgia', serif",
              }}>
                La bibliothèque complète
              </h1>
              <p style={{ color: "rgba(255,255,255,.5)", margin: "4px 0 0", fontSize: 13 }}>
                {loading ? "Chargement…" : `${eps.length} épisodes`}
              </p>
            </div>
            {/* Search */}
            <div style={{ position: "relative", width: isMobile ? "100%" : "auto" }}>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setVisible(9); }}
                placeholder="Rechercher un épisode..."
                style={{
                  background:  "rgba(255,255,255,.07)",
                  border:      "1px solid rgba(255,255,255,.12)",
                  color:       "#fff",
                  padding:     "10px 16px 10px 36px",
                  borderRadius: 8,
                  fontSize:    13,
                  width:       isMobile ? "100%" : 220,
                  outline:     "none",
                  boxSizing:   "border-box",
                }}
              />
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.3)" }}>
                🔍
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Player + description ─────────────────────────────────────── */}
      <div style={{
        flexShrink:          0,
        padding:             isMobile ? "16px" : "24px 32px",
        maxWidth:            1200,
        margin:              "0 auto",
        width:               "100%",
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
        gap:                 isMobile ? 16 : 28,
        boxSizing:           "border-box",
      }}>
        {/* Lecteur */}
        <div style={{ background: "#000", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
          <div style={{ aspectRatio: "16/9", position: "relative" }}>
            {activeEp && (
              <iframe
                key={activeEp.videoId}
                src={`https://www.youtube.com/embed/${activeEp.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div style={{
          display:        "flex",
          flexDirection:  "column",
          justifyContent: isMobile ? "flex-start" : "center",
        }}>
          <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>
            ÉPISODE EN VEDETTE
          </div>
          <h2 style={{
            color:      "#fff",
            fontSize:   isMobile ? 16 : 18,
            fontWeight: 900,
            margin:     "0 0 10px",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.4,
          }}>
            {activeEp?.title ?? ""}
          </h2>
          {/* Description masquée sur mobile pour gagner de la place */}
          {!isMobile && (
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>
              {activeEp && (activeEp.desc ?? activeEp.description ?? "")}
            </p>
          )}
          <button
            onClick={() => window.open(`https://www.youtube.com/watch?v=${activeEp?.videoId}`, "_blank")}
            style={{
              background:  COLORS.pink,
              color:       "#fff",
              border:      "none",
              padding:     isMobile ? "10px" : "11px",
              borderRadius: 8,
              fontWeight:  700,
              cursor:      "pointer",
              fontSize:    13,
              marginTop:   isMobile ? 8 : 0,
            }}>
            ▶ Regarder sur YouTube
          </button>
        </div>
      </div>

      {/* ── Grille épisodes ──────────────────────────────────────────── */}
      <div style={{
        flex:      isMobile ? "none" : 1,
        overflow:  isMobile ? "visible" : "hidden",
        padding:   isMobile ? "0 16px 24px" : "0 32px 24px",
        maxWidth:  1200,
        margin:    "0 auto",
        width:     "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
          {filtered.length} ÉPISODE{filtered.length > 1 ? "S" : ""}
        </div>

        {/* Container scrollable sur desktop, naturel sur mobile */}
        <div style={{
          height:     isMobile ? "auto" : "100%",
          overflowY:  isMobile ? "visible" : "auto",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 12 }}>
            {displayed.map(ep => (
              <div key={ep.videoId} onClick={() => setActiveEp(ep)}
                style={{
                  background:  activeEp?.videoId === ep.videoId ? "rgba(255,255,255,.07)" : "#111827",
                  borderRadius: 10,
                  overflow:    "hidden",
                  cursor:      "pointer",
                  border:      activeEp?.videoId === ep.videoId ? `1px solid ${COLORS.pink}` : "1px solid rgba(255,255,255,.06)",
                  transition:  "all .2s",
                }}>
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                  <img
                    src={ep.thumbnail ?? `https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                    alt={ep.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {ep.hot && <div style={{ position: "absolute", top: 6, right: 6, fontSize: 12 }}>🔥</div>}
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>{ep.title}</div>
                  <div style={{ color: "rgba(255,255,255,.35)", fontSize: 11, marginTop: 4 }}>{ep.views}</div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <button
                onClick={() => setVisible(v => v + 9)}
                style={{ background: "rgba(255,255,255,.07)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "10px 28px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Voir plus d'épisodes
              </button>
            </div>
          )}
          {!hasMore && filtered.length > 0 && (
            <div style={{ textAlign: "center", padding: "24px 0", color: "rgba(255,255,255,.2)", fontSize: 12 }}>
              — Tous les épisodes sont affichés —
            </div>
          )}
        </div>
      </div>

    </div>
  );
}