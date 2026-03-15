// ─────────────────────────────────────────────────────────────────────────────
// src/main.jsx — Vite entry point
// ─────────────────────────────────────────────────────────────────────────────
import React    from "react";
import ReactDOM from "react-dom/client";
import App      from "./App.jsx";
import "./index.css";

const redirect = new URLSearchParams(window.location.search).get("redirect");
if (redirect) {
  window.history.replaceState(null, "", redirect);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
