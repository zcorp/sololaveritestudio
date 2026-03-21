// ─────────────────────────────────────────────────────────────────────────────
// src/pages/HomePage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// src/pages/HomePage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import { SITE, COLORS }    from "../config/site.js";
import { useProducts } from "../hooks/useProducts.js";
import { useWindowWidth }  from "../hooks/useWindowWidth.js";

const PREVIEW_PRODUCTS = [
  { name: "T-Shirt Logo",   price: "24,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio2/c99a95c0181e3893e9d94360021dca93e4f746cd/shop/image%20copie.jpg" },
  { name: "T-Shirt Studio", price: "27,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio2/c99a95c0181e3893e9d94360021dca93e4f746cd/shop/image.jpg" },
  { name: "Mug Officiel",   price: "12,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio2/4e6bd3be649a65c6b37c5af2dcf492c459c6fa87/shop/pink-shirt.jpg" },
];

const STUDIO_PHOTOS = [
  { src: null, alt: "Vue générale du plateau", wide: true  },
  { src: null, alt: "La régie",                wide: true },
  { src: null, alt: "Espace invités",          wide: true },
  { src: null, alt: "Caméra principale",       wide: true },
  { src: null, alt: "Les coulisses",           wide: true },
  { src: null, alt: "La console son",          wide: true  },
];

export default function HomePage() {
  const navigate  = useNavigate();
  const width     = useWindowWidth();
  const isMobile  = width < 768;
  const isTablet  = width >= 768 && width < 1024;
  const isSmall   = width < 1024;

  const { products }       = useProducts();
  const previewProducts    = products.slice(0, 3); // 3 premiers produits

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div style={{ ...s.hero, height: isMobile ? "60vh" : "75vh" }}>

        {/* Iframe responsive */}
        <div style={s.iframeWrap}>
          <iframe
            src="https://www.youtube.com/embed/gKEEsigUIls?autoplay=1&mute=1&controls=0&loop=1&playlist=gKEEsigUIls&modestbranding=1&showinfo=0"
            title={SITE.name}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={s.heroIframe}
          />
        </div>

        <div style={s.heroOverlay} />
        <div style={s.heroFade} />

        <div style={{
          ...s.heroText,
          left:      isMobile ? 20 : isTablet ? 40 : 80,
          right:     isMobile ? 20 : "auto",
          bottom:    isMobile ? 40 : 80,
          maxWidth:  isMobile ? "100%" : 520,
        }}>
          <h1 style={{
            ...s.heroTitle,
            fontSize:     isMobile ? 28 : isTablet ? 36 : 48,
            marginBottom: isMobile ? 10 : 16,
          }}>
            {SITE.name}
          </h1>
          <p style={{
            ...s.heroSub,
            fontSize: isMobile ? 14 : 18,
            marginBottom: isMobile ? 20 : 28,
          }}>
            {SITE.tagline}
          </p>
          <div style={{
            display:       "flex",
            gap:           12,
            flexDirection: isMobile ? "column" : "row",
          }}>
            <button style={{
              ...s.btnWhite,
              fontSize: isMobile ? 14 : 15,
              padding:  isMobile ? "10px 20px" : "12px 28px",
            }} onClick={() => navigate("/episodes")}>
              ▶ Regarder
            </button>
            <button style={{
              ...s.btnGray,
              fontSize: isMobile ? 14 : 15,
              padding:  isMobile ? "10px 20px" : "12px 28px",
            }} onClick={() => navigate("/shop")}>
              🛍️ Boutique
            </button>
          </div>
        </div>
      </div>

      {/* ── Galerie studio ────────────────────────────────────────────── */}
      <div style={{ ...s.section, padding: isMobile ? "28px 16px" : "40px" }}>
        <h2 style={{ ...s.sectionTitle, fontSize: isMobile ? 18 : 22 }}>📸 Le Studio</h2>
        <div style={{
          ...s.galleryGrid,
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2, 1fr)"
              : "repeat(auto-fill, minmax(240px, 1fr))",
        }}>
          {STUDIO_PHOTOS.map((photo, i) => (
            <div key={i} style={{
              ...s.galleryItem,
              gridColumn: isMobile ? "span 1" : photo.wide ? "span 2" : "span 1",
            }}>
              {photo.src ? (
                <img src={photo.src} alt={photo.alt} style={s.galleryImg} />
              ) : (
                <div style={{ ...s.galleryImg, ...s.galleryPlaceholder }}>
                  <span style={{ fontSize: isMobile ? 22 : 28, opacity: 0.4 }}>📷</span>
                  <span style={s.placeholderLabel}>{photo.alt}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Shop preview ──────────────────────────────────────────────── */}
      <div style={{ ...s.section, background: "#fff", padding: isMobile ? "28px 16px" : "40px" }}>
        <h2 style={{ ...s.sectionTitle, color: COLORS.pink, fontSize: isMobile ? 18 : 22 }}>
          🛍️ Boutique officielle
        </h2>
        <div style={{
          ...s.grid3,
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        }}>
          {previewProducts.map((p, i) => (
            <div key={i} style={s.productCard}>
              <div style={s.productImg}>
                <a href={p.shopUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", width: "100%", height: "100%" }}>
                  {p.image
                    ? <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#e3f0ff,#fce4f3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>👕</div>
                  } 
                </a>
              </div>
              <div style={s.cardBody}>
                <div style={s.cardTitle}>{p.title}</div>
                <div style={{ color: COLORS.pink, fontWeight: 800, fontSize: 16, margin: "6px 0" }}>
                {p.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>
              <button style={s.btnPink} onClick={() => window.open(p.shopUrl, "_blank")}>
                Voir le produit
              </button>
          </div>
        </div>
      ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button style={s.btnOutlinePink} onClick={() => navigate("/shop")}>
            Voir la boutique →
          </button>
        </div>
      </div>

    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  // Hero
  hero:       { position: "relative", width: "100%", overflow: "hidden", background: "#000" },
  iframeWrap: { position: "absolute", inset: 0, overflow: "hidden" },
  heroIframe: {
    position: "absolute",
    top: "50%", left: "50%",
    // Couvre toujours le conteneur quelle que soit la taille d'écran
    width: "177.78vh", height: "100vh",
    minWidth: "100%", minHeight: "56.25vw",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  heroOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" },
  heroFade:    { position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)" },
  heroText:    { position: "absolute" },
  heroTitle:   { color: "#fff", fontWeight: 900, fontFamily: "'Georgia', serif", margin: "0 0 16px" },
  heroSub:     { color: "rgba(255,255,255,.85)", lineHeight: 1.6, margin: "0 0 28px" },

  // Buttons
  btnWhite:      { background: "#fff", color: "#000", borderRadius: 6, border: "none", fontWeight: 800, cursor: "pointer" },
  btnGray:       { background: "rgba(109,109,110,.7)", color: "#fff", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer" },
  btnPink:       { background: COLORS.pink, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13 },
  btnOutlinePink:{ background: "transparent", color: COLORS.pink, border: `2px solid ${COLORS.pink}`, padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 },

  // Sections
  section:      { padding: "40px", background: "#f8f9ff" },
  sectionTitle: { color: COLORS.blue, fontSize: 22, fontWeight: 800, marginBottom: 20 },
  grid3:        { display: "grid", gap: 16, marginBottom: 24 },
  cardBody:     { padding: "12px" },
  cardTitle:    { fontSize: 13, fontWeight: 600, color: "#222" },
  productCard:  { background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.06)", border: "1px solid #e0e0e0" },
  productImg:   { aspectRatio: "1", overflow: "hidden" },

  // Gallery
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 12,
  },
  galleryItem: {
    borderRadius: 10,
    overflow:     "hidden",
    aspectRatio:  "16/9",
    cursor:       "pointer",
  },
  galleryImg: {
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
    display:    "block",
    transition: "transform .3s ease",
  },
  galleryPlaceholder: {
    background:     "linear-gradient(135deg, #1a2744 0%, #0d1b3e 100%)",
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    gap:            8,
    border:         "1px dashed rgba(255,255,255,.15)",
  },
  placeholderLabel: {
    color:      "rgba(255,255,255,.3)",
    fontSize:   12,
    fontWeight: 500,
    textAlign:  "center",
    padding:    "0 12px",
  },
};