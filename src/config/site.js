// ─────────────────────────────────────────────────────────────────────────────
// config/site.js
// Central configuration for Solola Vérité Studio
// All domain names, URLs and nav items are defined here — never hardcoded elsewhere
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  // ── Domains ──────────────────────────────────────────────────────────────
  mainUrl:  "https://www.sololaveritestudio.com",
  shopUrl:  "https://shop.sololaveritestudio.com",

  // ── Brand ─────────────────────────────────────────────────────────────────
  name:     "Solola Vérité Studio",
  tagline:  "Le talk-show qui dit la vérité — sans filtre.",
  logoUrl:  "https://yt3.googleusercontent.com/7GBuxwrHmFOzcYoROHTfquMDauRCD0hUEgRO10gAeSPrVTDoEjCli-68PYWhZDe6CoQDzyfwwOc=s160-c-k-c0x00ffffff-no-rj",

  // ── YouTube ───────────────────────────────────────────────────────────────
  youtubeChannelId: "UCxxxxxxxxxxxxxxxxxx",   // ← replace with real channel ID
  //youtubeApiKey:    import.meta.env.VITE_YOUTUBE_API_KEY ?? "",

  // ── Data paths ────────────────────────────────────────────────────────────
  episodesDataPath: "/data/episodes.json", 
  productsDataPath: "/data/products.json",
};

//public/data/episodes.json

// ── Main site navigation (React router links) ────────────────────────────────
export const MAIN_NAV = [
  { label: "HOME",     path: "/",        external: false },
  { label: "ÉPISODES", path: "/episodes", external: false },
  { label: "SHOP",     path: "/shop",     external: true }, // triggers redirect
  //{ label: "ÉQUIPE",   path: "/equipe",   external: false },
  { label: "CONTACT",  path: "/contact",  external: false },
  { label: "À PROPOS", path: "/about",    external: false },
];

// ── Shopify nav (absolute links back to main site) ────────────────────────────
// These are injected into the Shopify theme navigation
export const SHOPIFY_NAV = [
  { label: "Accueil",  url: `${SITE.mainUrl}/`        },
  { label: "Vidéos",   url: `${SITE.mainUrl}/episodes` },
  { label: "Contact",  url: `${SITE.mainUrl}/contact`  },
  { label: "Boutique", url: SITE.shopUrl               },
];

// ── Colors (mirrors CSS variables — single source of truth) ──────────────────
export const COLORS = {
  blue:    "#1565C0",
  pink:    "#E91E8C",
  dark:    "#0A1628",
  lblue:   "#E3F0FF",
  lpink:   "#FCE4F3",
  white:   "#FFFFFF",
};
