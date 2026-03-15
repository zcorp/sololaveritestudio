// ─────────────────────────────────────────────────────────────────────────────
// src/pages/HomePage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import { SITE, COLORS }    from "../config/site.js";

// Static preview episodes — replaced by real data once youtube-sync runs
const PREVIEW_EPISODES = [
  { title: "Ep. 42 — La Vérité sur l'amour",      youtubeId: "6NDY8QlXAOo" },
  { title: "Ep. 41 — Mensonges & Réseaux",         youtubeId: "pV8u26vT1Jw" },
  { title: "Ep. 40 — Le pouvoir de l'argent",      youtubeId: "Usq_dBUAnvI" },
];

const PREVIEW_PRODUCTS = [
  { name: "T-Shirt Logo",   price: "24,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio/c99a95c0181e3893e9d94360021dca93e4f746cd/shop/image%20copie.jpg" },
  { name: "T-Shirt Studio", price: "27,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio/c99a95c0181e3893e9d94360021dca93e4f746cd/shop/image.jpg" },
  { name: "Mug Officiel",   price: "12,99 €", image: "https://raw.githubusercontent.com/zcorp/sololaveritestudio/4e6bd3be649a65c6b37c5af2dcf492c459c6fa87/shop/pink-shirt.jpg" },
];

const STUDIO_PHOTOS = [
  { src: null, alt: "Vue générale du plateau",    wide: true  },
  { src: null, alt: "La régie",                   wide: true },
  { src: null, alt: "Espace invités",             wide: true },
  { src: null, alt: "Caméra principale",          wide: true },
  { src: null, alt: "Les coulisses",              wide: true },
  { src: null, alt: "La console son",             wide: true  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null);

  return (
    <div>
      {/* ── Hero video ────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        <iframe
          src="https://www.youtube.com/embed/gKEEsigUIls?autoplay=1&mute=1&controls=0&loop=1&playlist=gKEEsigUIls&modestbranding=1&showinfo=0"
          title={SITE.name}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={styles.heroIframe}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroFade} />

        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>{SITE.name}</h1>
          <p style={styles.heroSub}>{SITE.tagline}</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={styles.btnWhite} onClick={() => navigate("/episodes")}>▶ Regarder</button>
            <button style={styles.btnGray}  onClick={() => navigate("/shop")}>🛍️ Boutique</button>
          </div>
        </div>
      </div>

      {/* ── Studio gallery ───────────────────────────────────────────── */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📸 Le Studio</h2>
        <div style={styles.galleryGrid}>
          {STUDIO_PHOTOS.map((photo, i) => (
          <div key={i} style={{
            ...styles.galleryItem,
            gridColumn: photo.wide ? "span 2" : "span 1",
          }}>
            {photo.src ? (
              <img src={photo.src} alt={photo.alt} style={styles.galleryImg} />
            ) : (
              // Placeholder en attendant les vraies photos
              <div style={{ ...styles.galleryImg, ...styles.galleryPlaceholder }}>
                <span style={styles.placeholderIcon}>📷</span>
                <span style={styles.placeholderLabel}>{photo.alt}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
      {/* ── Shop preview ──────────────────────────────────────────────── */}
      <div style={{ ...styles.section, background: "#fff" }}>
        <h2 style={{ ...styles.sectionTitle, color: COLORS.pink }}>🛍️ Boutique officielle</h2>
        <div style={styles.grid3}>
          {PREVIEW_PRODUCTS.map((p, i) => (
            <div key={i} style={styles.productCard}>
              <div style={styles.productImg}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardTitle}>{p.name}</div>
                <div style={{ color: COLORS.pink, fontWeight: 800, fontSize: 16, margin: "6px 0" }}>{p.price}</div>
                <button style={styles.btnPink} onClick={() => navigate("/shop")}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button style={styles.btnOutlinePink} onClick={() => navigate("/shop")}>
            Voir la boutique →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  hero: { position: "relative", height: "75vh", width: "100%", overflow: "hidden", background: "#000" },
  heroIframe: { position: "absolute", top: 0, left: "50%", width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh", transform: "translateX(-50%)", pointerEvents: "none" },
  heroOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" },
  heroFade: { position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)" },
  heroText: { position: "absolute", bottom: 80, left: 80, maxWidth: 520 },
  heroTitle: { color: "#fff", fontSize: 48, fontWeight: 900, marginBottom: 16, fontFamily: "'Georgia', serif" },
  heroSub: { color: "rgba(255,255,255,.85)", fontSize: 18, lineHeight: 1.6, marginBottom: 28 },
  btnWhite: { background: "#fff", color: "#000", padding: "12px 28px", borderRadius: 6, border: "none", fontWeight: 800, fontSize: 15, cursor: "pointer" },
  btnGray:  { background: "rgba(109,109,110,.7)", color: "#fff", padding: "12px 28px", borderRadius: 6, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  btnBlue:  { background: COLORS.blue, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  btnPink:  { background: COLORS.pink, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13 },
  btnOutlinePink: { background: "transparent", color: COLORS.pink, border: `2px solid ${COLORS.pink}`, padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  section: { padding: "40px", background: "#f8f9ff" },
  sectionTitle: { color: COLORS.blue, fontSize: 22, fontWeight: 800, marginBottom: 20 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 },
  card: { background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.06)", border: "1px solid #e0e0e0", cursor: "pointer" },
  thumbWrap: { position: "relative", aspectRatio: "16/9" },
  thumbIframe: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover" },
  playOverlay: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.3)" },
  playBtn: { width: 48, height: 48, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, paddingLeft: 4 },
  cardBody: { padding: "12px" },
  cardTitle: { fontSize: 13, fontWeight: 600, color: "#222" },
  productCard: { background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.06)", border: "1px solid #e0e0e0" },
  productImg: { aspectRatio: "1", overflow: "hidden" },
  //
  galleryGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12,
},
galleryItem: {
  borderRadius: 10,
  overflow: "hidden",
  aspectRatio: "16/9",
  cursor: "pointer",
},
galleryImg: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform .3s ease",
},
galleryPlaceholder: {
  background: "linear-gradient(135deg, #1a2744 0%, #0d1b3e 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  border: "1px dashed rgba(255,255,255,.15)",
},
placeholderIcon: {
  fontSize: 28,
  opacity: 0.4,
},
placeholderLabel: {
  color: "rgba(255,255,255,.3)",
  fontSize: 12,
  fontWeight: 500,
  textAlign: "center",
  padding: "0 12px",
},
};
