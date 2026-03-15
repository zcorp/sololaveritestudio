#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// scripts/youtube-fetch.js
// Fetch le flux RSS YouTube et append les nouvelles vidéos dans episodes.json
// Ne modifie pas les vidéos déjà présentes.
// ─────────────────────────────────────────────────────────────────────────────

import fs                        from "fs";
import path                      from "path";
import { parseStringPromise }    from "xml2js";
import { fileURLToPath }         from "url";

const CHANNEL_ID  = process.env.YOUTUBE_CHANNEL_ID ?? "UCxxxxxxxxxxxxxxxxxx";
const RSS_URL     = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/data/episodes.json"
);

// ── Charger le fichier existant ───────────────────────────────────────────────
function loadExisting() {
  try {
    const raw = fs.readFileSync(OUTPUT_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    // Fichier absent ou invalide — on repart de zéro
    return [];
  }
}

// ── Mapper une entrée RSS vers notre format ───────────────────────────────────
function toVideo(entry) {
  const videoId   = entry["yt:videoId"];
  const channelId = entry["yt:channelId"];

  return {
    channelId,
    videoId,
    title:       entry.title ?? "",
    description: entry["media:group"]?.["media:description"] ?? "",
    thumbnail:   entry["media:group"]?.["media:thumbnail"]?.["$"]?.url
                 ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    insertedAt:  { $date: entry.published ?? new Date().toISOString() },
    updated:     entry.updated ?? null,
    url:         `https://www.youtube.com/watch?v=${videoId}`,
    duration:    null,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[youtube-fetch] Fetching RSS → ${RSS_URL}`);

  const res = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const xml      = await res.text();
  const feed     = await parseStringPromise(xml, { explicitArray: false });
  const entries  = feed?.feed?.entry ?? [];
 
  // Charger les vidéos existantes et construire un Set des IDs connus
  const existing   = loadExisting();
  const knownIds   = new Set(existing.map(v => v.videoId));



  // Filtrer uniquement les nouvelles vidéos
  const newVideos  = entries
    .map(toVideo)
    .filter(v => !knownIds.has(v.videoId));

  //console.log(`[entries]  : `, newVideos);

  if (newVideos.length === 0) {
    console.log("[youtube-fetch] ✅ Aucune nouvelle vidéo.");
    return;
  }

  // Append — les nouvelles vidéos en tête de liste (plus récentes en premier)
  const updated = [...newVideos, ...existing];

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(updated, null, 2), "utf8");

  console.log(`[youtube-fetch] ✅ ${newVideos.length} nouvelle(s) vidéo(s) ajoutée(s) → ${OUTPUT_FILE}`);
  newVideos.forEach(v => console.log(`  + ${v.videoId} — ${v.title}`));
}

main().catch(err => {
  console.error("[youtube-fetch] ❌", err.message);
  process.exit(1);
});