#!/usr/bin/env node
import fs   from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import { fileURLToPath }      from "url";

const CHANNEL_ID  = import.meta.env.YOUTUBE_CHANNEL_ID ?? "UCxxxxxxxxxxxxxxxxxx";
const RSS_URL     = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/data/episodes.json"
);

async function main() {
  console.log(`[youtube-fetch] Fetching RSS → ${RSS_URL}`);

  const res  = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const xml  = await res.text();
  const feed = await parseStringPromise(xml, { explicitArray: false });

  const entries  = feed?.feed?.entry ?? [];
  const episodes = entries.map((entry, i) => {
    const videoId = entry["yt:videoId"];
    return {
      id:          videoId,
      num:         entries.length - i,           // plus récent = num le plus haut
      title:       entry.title,
      description: entry["media:group"]?.["media:description"] ?? "",
      date:        entry.published ?? "",
      thumbnail:   entry["media:group"]?.["media:thumbnail"]?.["$"]?.url
                   ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      youtubeId:   videoId,
      youtubeUrl:  `https://www.youtube.com/watch?v=${videoId}`,
      views:       null,
      duration:    null,
      season:      1,
    };
  });

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(episodes, null, 2), "utf8");
  console.log(`[youtube-fetch] ✅ ${episodes.length} épisodes → ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error("[youtube-fetch] ❌", err.message);
  process.exit(1);
});