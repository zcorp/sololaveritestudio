// ─────────────────────────────────────────────────────────────────────────────
// src/components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE, MAIN_NAV, COLORS } from "../config/site.js";
import { useWindowWidth } from "../hooks/useWindowWidth.js";

export default function Navbar() {
  const { pathname } = useLocation();
  const width        = useWindowWidth();
  const isMobile     = width < 1024;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const renderLink = ({ label, path }) => {
    //const isShop   = path === "/shop";
    const active   = /*!isShop &&*/ (pathname === path || (path !== "/" && pathname.startsWith(path)));
    const linkStyle = {
      ...styles.link,
      ...(active   ? styles.linkActive : {}),
      //...(isShop   ? styles.linkShop   : {}),
      ...(isMobile ? styles.linkMobile : {}),
    };

    /*if (isShop) {
      return (
        <a key={path} href={SITE.shopUrl} style={linkStyle} onClick={closeMenu}>
          {label}
        </a>
      );
    }*/

    return (
      <Link key={path} to={path} style={linkStyle} onClick={closeMenu}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <nav style={styles.nav}>
        {/* Logo + brand */}
        <Link to="/" style={styles.brand} onClick={closeMenu}>
          <img src={SITE.logoUrl} alt={SITE.name} style={styles.logo} />
          {!isMobile && (
            <span style={styles.brandName}>{SITE.name}</span>
          )}
          {isMobile && (
            <span style={{ ...styles.brandName, fontSize: 15 }}>
              {SITE.name}
            </span>
          )}
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={styles.links}>
            {MAIN_NAV.map(renderLink)}
          </div>
        )}

        {/* Hamburger button — mobile/tablette */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={styles.hamburger}
            aria-label="Menu">
            <span style={{ ...styles.bar, ...(menuOpen ? styles.barTop : {}) }} />
            <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.barBottom : {}) }} />
          </button>
        )}
      </nav>

      {/* Menu mobile déroulant */}
      {isMobile && (
        <div style={{
          ...styles.drawer,
          maxHeight: menuOpen ? 400 : 0,
          opacity:   menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}>
          {MAIN_NAV.map(renderLink)}
        </div>
      )}

      {/* Overlay pour fermer en cliquant à côté */}
      {isMobile && menuOpen && (
        <div style={styles.overlay} onClick={closeMenu} />
      )}
    </>
  );
}

const styles = {
  nav: {
    background:     COLORS.blue,
    padding:        "0 24px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    height:         64,
    boxShadow:      "0 2px 12px rgba(0,0,0,0.25)",
    position:       "sticky",
    top:            0,
    zIndex:         200,
  },
  brand: {
    display:        "flex",
    alignItems:     "center",
    gap:            10,
    textDecoration: "none",
    minWidth:       0,
  },
  logo: {
    width:        44,
    height:       44,
    borderRadius: 8,
    objectFit:    "cover",
    flexShrink:   0,
  },
  brandName: {
    color:         "#fff",
    fontWeight:    800,
    fontSize:      18,
    letterSpacing: 1,
    whiteSpace:    "nowrap",
    overflow:      "hidden",
    textOverflow:  "ellipsis",
  },
  links: {
    display: "flex",
    gap:     4,
  },
  link: {
    color:          "#fff",
    padding:        "8px 14px",
    borderRadius:   6,
    fontWeight:     400,
    fontSize:       13,
    cursor:         "pointer",
    transition:     "all .2s",
    textDecoration: "none",
    letterSpacing:  0.5,
  },
  linkActive: {
    background: COLORS.pink,
    fontWeight: 700,
  },
  linkShop: {
    background: COLORS.pink,
    fontWeight: 700,
  },
  // Liens dans le drawer mobile
  linkMobile: {
    display:       "block",
    padding:       "14px 24px",
    borderRadius:  0,
    fontSize:      15,
    borderBottom:  "1px solid rgba(255,255,255,.08)",
  },

  // ── Hamburger ───────────────────────────────────────────────────────────────
  hamburger: {
    background:    "none",
    border:        "none",
    cursor:        "pointer",
    padding:       "8px",
    display:       "flex",
    flexDirection: "column",
    gap:           5,
    zIndex:        201,
  },
  bar: {
    display:         "block",
    width:           24,
    height:          2,
    background:      "#fff",
    borderRadius:    2,
    transition:      "all .25s ease",
    transformOrigin: "center",
  },
  barTop: {
    transform: "translateY(7px) rotate(45deg)",
  },
  barBottom: {
    transform: "translateY(-7px) rotate(-45deg)",
  },

  // ── Drawer ──────────────────────────────────────────────────────────────────
  drawer: {
    position:       "sticky",
    top:            64,
    zIndex:         199,
    background:     COLORS.blue,
    display:        "flex",
    flexDirection:  "column",
    overflow:       "hidden",
    transition:     "max-height .3s ease, opacity .25s ease",
    boxShadow:      "0 8px 24px rgba(0,0,0,0.3)",
    paddingBottom:  8,
  },

  // ── Overlay ─────────────────────────────────────────────────────────────────
  overlay: {
    position:   "fixed",
    inset:      0,
    zIndex:     198,
    background: "rgba(0,0,0,.4)",
  },
};