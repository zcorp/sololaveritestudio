// ─────────────────────────────────────────────────────────────────────────────
// src/pages/TeamPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { COLORS }          from "../config/site.js";

const TEAM = [
  { name: "Migue Niema",  role: "Animateur principal",  bio: "Le visage du show. Il mène les débats avec franchise et humour.",               image: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-1/611274609_1314143887184179_1592544907377044415_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=psXCLP-W1_AQ7kNvwGAW-CB&_nc_oc=AdmVftjXm6a1XSsxywgUjud5erWHQ4EfKDA-CrphWhOhoOdbObarjVP6D054yasVRNPkmEk0M9tkbWNR0QJdAjFA&_nc_zt=24&_nc_ht=scontent-cdg4-2.xx&_nc_gid=VsowZSxVRE344He6Tdf3cw&_nc_ss=8&oh=00_AfzhCkN-WdPqneZuDqZ_Sb9yuRfS-Kx0NYkYiz0kFnaYYQ&oe=69B21464" },
  { name: "À définir",    role: "Producteur",            bio: "Le cerveau derrière le concept. Il sélectionne les sujets et les invités.",     image: null },
  { name: "À définir",    role: "Réalisateur",           bio: "Il transforme chaque conversation en expérience visuelle captivante.",          image: null },
  { name: "À définir",    role: "Community Manager",     bio: "Le lien entre le show et sa communauté. Il anime les réseaux au quotidien.",    image: null },
];

export default function TeamPage() {
  const [active, setActive] = useState(null);

  return (
    <div style={{ padding: 40, background: "#f8f9ff", minHeight: 500 }}>
      <h2 style={{ color: COLORS.blue, fontSize: 22, fontWeight: 800, marginBottom: 8 }}>👥 L'équipe derrière le show</h2>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 28 }}>Les personnes qui donnent vie à Solola Vérité Studio chaque semaine.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TEAM.map((m, i) => (
          <div key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{ background: "#fff", borderRadius: 12, padding: 20, display: "flex", gap: 20, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,.06)", border: `1px solid ${active === i ? COLORS.pink : "#e0e0e0"}`, cursor: "pointer", transition: "border-color .2s" }}>

            {/* Avatar */}
            <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.pink})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {m.image
                ? <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ color: "#fff", fontSize: 28 }}>👤</span>
              }
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: COLORS.blue }}>{m.name}</div>
              <div style={{ color: COLORS.pink, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{m.role}</div>
              <div style={{ color: "#555", fontSize: 13, lineHeight: 1.5 }}>{m.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
