// ─────────────────────────────────────────────────────────────────────────────
// src/pages/EpisodesPage.jsx  — lazy loaded
// ─────────────────────────────────────────────────────────────────────────────
//import React, { useState, useEffect } from "react";
import { useEpisodes }    from "../hooks/useEpisodes.js";
import { COLORS }         from "../config/site.js";
import { useWindowWidth } from "../hooks/useWindowWidth.js";
import React, { useState, useEffect, useRef } from "react";

const EPISODE_DAYS_FILTER = 0; // 0 = tout afficher, 7 = 7 derniers jours, 30 = dernier mois...

function filterByDays(eps, days) {
  if (days === 0) return eps;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  //console.log("cutoff:", cutoff);
  //console.log("premier ep date:", eps[0]?.insertedAt);

  return eps.filter(ep => {
    const dateStr = ep.insertedAt?.["$date"] ?? ep.insertedAt ?? ep.date ?? null;

    if(dateStr.includes("2025"))
      console.log("dateStr:", dateStr, "parsed:", new Date(dateStr));
    if (!dateStr) return true;
    return new Date(dateStr) < cutoff;
  });
}

export default function EpisodesPage() {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [maxH, setMaxH] = useState("320px");
  const { episodes: eps, loading } = useEpisodes();
  const [activeEp, setActiveEp]   = useState(null);
  const [search,   setSearch]     = useState("");
  const [visible,  setVisible]    = useState(9);

  const width     = useWindowWidth();
  const isMobile  = width < 768;
  const isTablet  = width >= 768 && width < 1024;
  const isSmall   = width < 1024;
  const isSmallLaptop = width >= 1024 && width <= 1440;

  useEffect(() => {
    if (eps.length > 0 && !activeEp) setActiveEp(eps[0]);
  }, [eps]);

  useEffect(() => { setVisible(9); }, [search]);

  const filtered = filterByDays(eps, EPISODE_DAYS_FILTER).filter(ep =>
    (ep.title ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;
  
  //console.log("visible:", visible, "filtered:", filtered.length, "hasMore:", hasMore);

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

  useEffect(() => {
  const update = () => {
    if (containerRef.current) {
      const rect   = containerRef.current.getBoundingClientRect();
      const footer = document.querySelector("footer");
      const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      setMaxH(`${footerTop - rect.top - 174}px`);
    }
  };
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);


  return (
  <div style={{
    background:    COLORS.dark,
    height:        (isMobile || isSmallLaptop) ? "auto" : "calc(100vh - 64px)",
    minHeight:     "calc(100vh - 64px)",
    display:       "flex",
    flexDirection: "column",
    overflow:      (isMobile || isSmallLaptop) ? "auto" : "hidden",
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
          <div style={{ position: "relative", width: isMobile ? "100%" : "auto" }}>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setVisible(9); }}
              placeholder="Rechercher un épisode..."
              style={{
                background:   "rgba(255,255,255,.07)",
                border:       "1px solid rgba(255,255,255,.12)",
                color:        "#fff",
                padding:      "10px 16px 10px 36px",
                borderRadius: 8,
                fontSize:     13,
                width:        isMobile ? "100%" : 220,
                outline:      "none",
                boxSizing:    "border-box",
              }}
            />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.3)" }}>
              🔍
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* ── Layout YouTube (small laptop) ───────────────────────────── */}
    {isSmallLaptop && !isMobile ? (
      <div style={{
        flex:    1,
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap:     0,
        overflow: "hidden",
        maxWidth: 1200,
        margin:  "0 auto",
        width:   "100%",
        padding: "24px 32px",
        boxSizing: "border-box",
      }}>

        {/* ── Player gauche ─────────────────────────────────────────── */}
        <div style={{ paddingRight: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div ref={playerRef} style={{ background: "#000", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
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

          {/* Titre + description sous le player */}
          <div>
            <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 900, margin: "0 0 8px", fontFamily: "'Georgia', serif", lineHeight: 1.4 }}>
              {activeEp?.title ?? ""}
            </h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>
              {activeEp && (activeEp.desc ?? activeEp.description ?? "")}
            </p>
            <button
              onClick={() => window.open(`https://www.youtube.com/watch?v=${activeEp?.videoId}`, "_blank")}
              style={{ background: COLORS.pink, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              ▶ Regarder sur YouTube
            </button>
          </div>
        </div>

        {/* ── Liste épisodes droite (style YouTube) ─────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginBottom: 10, fontWeight: 600, letterSpacing: 1, flexShrink: 0 }}>
            {filtered.length} ÉPISODE{filtered.length > 1 ? "S" : ""}
          </div>

          <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
            {displayed.map(ep => (
              <div key={ep.videoId}
                onClick={() => setActiveEp(ep)}
                style={{
                  display:      "flex",
                  gap:          10,
                  padding:      "8px",
                  borderRadius: 8,
                  cursor:       "pointer",
                  background:   activeEp?.videoId === ep.videoId ? "rgba(255,255,255,.07)" : "transparent",
                  border:       activeEp?.videoId === ep.videoId ? `1px solid ${COLORS.pink}` : "1px solid transparent",
                  transition:   "all .2s",
                  marginBottom: 6,
                }}>
                {/* Thumbnail */}
                <div style={{ width: 120, height: 68, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#000" }}>
                  <img
                    src={ep.thumbnail ?? `https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                    alt={ep.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color:      "#fff",
                    fontSize:   12,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    overflow:   "hidden",
                    display:    "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}>
                    {ep.title}
                  </div>
                  <div style={{ color: "rgba(255,255,255,.35)", fontSize: 11, marginTop: 4 }}>
                    {ep.views}
                  </div>
                </div>
              </div>
            ))}

            {/* Bouton voir plus */}
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              {hasMore ? (
                <button
                  onClick={() => setVisible(v => v + 9)}
                  style={{ background: "rgba(255,255,255,.07)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "8px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Voir plus d'épisodes
                </button>
              ) : (
                <div style={{ color: "rgba(255,255,255,.2)", fontSize: 11 }}>
                  — Tous les épisodes sont affichés —
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    ) : !isMobile ? (

      // ── Layout desktop large ─────────────────────────────────────
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, boxSizing: "border-box", flexShrink: 0 }}>
        {/* Player */}
        <div ref={playerRef} style={{ background: "#000", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: COLORS.pink, fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>ÉPISODE EN VEDETTE</div>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 900, margin: "0 0 10px", fontFamily: "'Georgia', serif", lineHeight: 1.4 }}>
            {activeEp?.title ?? ""}
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>
            {activeEp && (activeEp.desc ?? activeEp.description ?? "")}
          </p>
          <button
            onClick={() => window.open(`https://www.youtube.com/watch?v=${activeEp?.videoId}`, "_blank")}
            style={{ background: COLORS.pink, color: "#fff", border: "none", padding: "11px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            ▶ Regarder sur YouTube
          </button>
        </div>
      </div>

    ) : null}

    {/* ── Grille épisodes (desktop large uniquement) ──────────────── */}
    {!isMobile && !isSmallLaptop && (
      <div style={{
        padding:   "0 32px 24px",
        maxWidth:  1200,
        margin:    "0 auto",
        width:     "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
          {filtered.length} ÉPISODE{filtered.length > 1 ? "S" : ""}
        </div>
        <div ref={containerRef} style={{
          maxHeight:     maxH,
          overflowY:     "auto",
          paddingRight:  4,
          paddingBottom: 16,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 12 }}>
            {displayed.map(ep => (
              <div key={ep.videoId} onClick={() => setActiveEp(ep)}
                style={{
                  background:   activeEp?.videoId === ep.videoId ? "rgba(255,255,255,.07)" : "#111827",
                  borderRadius: 10,
                  overflow:     "hidden",
                  cursor:       "pointer",
                  border:       activeEp?.videoId === ep.videoId ? `1px solid ${COLORS.pink}` : "1px solid rgba(255,255,255,.06)",
                  transition:   "all .2s",
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
          <div style={{ textAlign: "center", padding: "80px 0 70px" }}>
            {hasMore ? (
              <button
                onClick={() => setVisible(v => v + 9)}
                style={{ background: "rgba(255,255,255,.07)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "10px 28px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Voir plus d'épisodes
              </button>
            ) : (
              <div style={{ color: "rgba(255,255,255,.2)", fontSize: 12 }}>
                — Tous les épisodes sont affichés —
              </div>
            )}
          </div>
        </div>
        
      </div>
    )}
    {/* ── Layout mobile ───────────────────────────────────────────── */}
    {isMobile && (
      <>
        {/* Player */}
        <div style={{ flexShrink: 0, padding: "16px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <div ref={playerRef} style={{ background: "#000", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)" }}>
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
          <div style={{ marginTop: 12 }}>
            <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 900, margin: "0 0 8px", fontFamily: "'Georgia', serif", lineHeight: 1.4 }}>
              {activeEp?.title ?? ""}
            </h2>
            <button
              onClick={() => window.open(`https://www.youtube.com/watch?v=${activeEp?.videoId}`, "_blank")}
              style={{ width: "100%", background: COLORS.pink, color: "#fff", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              ▶ Regarder sur YouTube
            </button>
          </div>
        </div>

        {/* Grille mobile */}
        <div style={{ padding: "0 16px 24px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
            {filtered.length} ÉPISODE{filtered.length > 1 ? "S" : ""}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 12 }}>
            {displayed.map(ep => (
              <div key={ep.videoId} onClick={() => {
                setActiveEp(ep);
                if (playerRef.current) playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
                style={{
                  background:   activeEp?.videoId === ep.videoId ? "rgba(255,255,255,.07)" : "#111827",
                  borderRadius: 10,
                  overflow:     "hidden",
                  cursor:       "pointer",
                  border:       activeEp?.videoId === ep.videoId ? `1px solid ${COLORS.pink}` : "1px solid rgba(255,255,255,.06)",
                  transition:   "all .2s",
                }}>
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                  <img
                    src={ep.thumbnail ?? `https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                    alt={ep.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>{ep.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            {hasMore ? (
              <button
                onClick={() => setVisible(v => v + 9)}
                style={{ background: "rgba(255,255,255,.07)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "10px 28px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Voir plus d'épisodes
              </button>
            ) : (
              <div style={{ color: "rgba(255,255,255,.2)", fontSize: 12 }}>
                — Tous les épisodes sont affichés —
              </div>
            )}
          </div>
        </div>
      </>
    )}

    </div>
  );
}