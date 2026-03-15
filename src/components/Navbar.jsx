// ─────────────────────────────────────────────────────────────────────────────
// src/components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE, MAIN_NAV, COLORS } from "../config/site.js";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={styles.nav}>
      {/* Logo + brand */}
      <Link to="/" style={styles.brand}>
        <img src={SITE.logoUrl} alt={SITE.name} style={styles.logo} />
        <span style={styles.brandName}>{SITE.name}</span>
      </Link>

      {/* Navigation links */}
      <div style={styles.links}>
        {MAIN_NAV.map(({ label, path }) => {

          if (path === "/shop") {
            return (
              <a key={path} href={SITE.shopUrl} style={styles.link}>
                {label}
              </a>
            );
          }

          const active = pathname === path || (path !== "/" && pathname.startsWith(path));



          return (
            <Link key={path} to={path}
              style={{ ...styles.link, ...(active ? styles.linkActive : {}) }}>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background:    COLORS.blue,
    padding:       "0 24px",
    display:       "flex",
    alignItems:    "center",
    justifyContent:"space-between",
    height:        64,
    boxShadow:     "0 2px 12px rgba(0,0,0,0.25)",
    position:      "sticky",
    top:           0,
    zIndex:        100,
  },
  brand: {
    display:    "flex",
    alignItems: "center",
    gap:        10,
    textDecoration: "none",
  },
  logo: {
    width:        44,
    height:       44,
    borderRadius: 8,
    objectFit:    "cover",
  },
  brandName: {
    color:      "#fff",
    fontWeight: 800,
    fontSize:   18,
    letterSpacing: 1,
  },
  links: {
    display: "flex",
    gap:     4,
  },
  link: {
    color:        "#fff",
    padding:      "8px 14px",
    borderRadius: 6,
    fontWeight:   400,
    fontSize:     13,
    cursor:       "pointer",
    transition:   "all .2s",
    textDecoration: "none",
  },
  linkActive: {
    background: COLORS.pink,
    fontWeight: 700,
  },
};
