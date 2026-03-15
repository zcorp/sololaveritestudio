// ─────────────────────────────────────────────────────────────────────────────
// src/components/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { SITE } from "../config/site.js";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <img src={SITE.logoUrl} alt={SITE.name} style={styles.logo} />
        <span style={styles.name}>{SITE.name}</span>
      </div>
      <span style={styles.copy}>sololaveritestudio.com — © {new Date().getFullYear()}</span>
      <div style={styles.links}>
        <span style={styles.link}>Mentions légales</span>
        <span style={styles.link}>Confidentialité</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background:     "#060d1a",
    borderTop:      "1px solid rgba(255,255,255,.1)",
    padding:        "20px 32px",
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
    flexWrap:       "wrap",
    gap:            12,
  },
  left: {
    display:    "flex",
    alignItems: "center",
    gap:        8,
  },
  logo: {
    width:        28,
    height:       28,
    borderRadius: 6,
    objectFit:    "cover",
  },
  name: {
    color:      "#fff",
    fontWeight: 700,
    fontSize:   13,
  },
  copy: {
    color:    "rgba(255,255,255,.4)",
    fontSize: 12,
  },
  links: {
    display: "flex",
    gap:     16,
  },
  link: {
    color:    "rgba(255,255,255,.4)",
    fontSize: 12,
    cursor:   "pointer",
  },
};
