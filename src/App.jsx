// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx — Root component with all routes
// EpisodesPage is lazy-loaded (separate chunk, downloaded on demand)
// ─────────────────────────────────────────────────────────────────────────────
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SITE } from "./config/site.js";


import AboutPage from "./pages/AboutPage.jsx";
import Navbar           from "./components/Navbar.jsx";
import Footer           from "./components/Footer.jsx";
import HomePage         from "./pages/HomePage.jsx";
import TeamPage         from "./pages/TeamPage.jsx";
import ContactPage      from "./pages/ContactPage.jsx";


// Lazy-loaded — downloaded only when user navigates to /episodes
const EpisodesPage = lazy(() => import("./pages/EpisodesPage.jsx"));

function ShopRedirect() {
  // Redirect immédiat, pas de loader
  window.location.replace(SITE.shopUrl);
  return null;
}

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Chargement…</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/"         element={<HomePage />} />
              <Route path="/episodes" element={<EpisodesPage />} />
              <Route path="/shop/*" element={<ShopRedirect />} />
              <Route path="/equipe"   element={<TeamPage />} />
              <Route path="/contact"  element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
