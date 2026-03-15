#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// scripts/youtube-fetch.js
// Fetches the latest videos from a YouTube channel and writes episodes.json.
// Run manually:  node scripts/youtube-fetch.js
// Run via CI:    see .github/workflows/youtube-sync.yml
// ─────────────────────────────────────────────────────────────────────────────

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ── Config ────────────────────────────────────────────────────────────────────
const CHANNEL_ID    =  import.meta.env.YOUTUBE_CHANNEL_ID ?? "UCxxxxxxxxxxxxxxxxxx";
const API_KEY       = import.meta.env.VITE_YOUTUBE_API_KEY ?? "";
const MAX_RESULTS   = 50;
const OUTPUT_FILE   = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/data/episodes.json"
);

// ── Validate ──────────────────────────────────────────────────────────────────
if (!API_KEY) {
  console.error("[youtube-fetch] ❌ YOUTUBE_API_KEY environment variable is missing.");
  process.exit(1);
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

/**
 * Fetch the uploads playlist ID for a channel.
 */
async function getUploadsPlaylistId(channelId) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", API_KEY);

  const res  = await fetch(url.toString());
  const json = await res.json();

  const playlistId =
    json?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!playlistId) {
    throw new Error(`Could not find uploads playlist for channel: ${channelId}`);
  }

  return playlistId;
}

/**
 * Fetch all video items from a playlist (up to MAX_RESULTS).
 */
async function fetchPlaylistItems(playlistId) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part",       "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", MAX_RESULTS);
  url.searchParams.set("key",        API_KEY);

  const res  = await fetch(url.toString());
  const json = await res.json();

  return json?.items ?? [];
}

/**
 * Map a raw YouTube playlistItem to our episode shape.
 */
function toEpisode(item, index) {
  const snippet = item.snippet;
  const videoId = item.contentDetails?.videoId ?? snippet?.resourceId?.videoId;

  return {
    id:          videoId,
    num:         index + 1,                         // episode number (newest = highest)
    title:       snippet?.title        ?? "Sans titre",
    description: snippet?.description ?? "",
    date:        snippet?.publishedAt  ?? "",
    thumbnail:   snippet?.thumbnails?.high?.url
                 ?? snippet?.thumbnails?.default?.url
                 ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    youtubeUrl:  `https://www.youtube.com/watch?v=${videoId}`,
    youtubeId:   videoId,
    views:       null,  // not available via playlistItems — enrich separately if needed
    duration:    null,  // not available via playlistItems — enrich separately if needed
    season:      1,     // set manually or infer from date ranges if needed
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[youtube-fetch] Fetching channel: ${CHANNEL_ID}`);

  const playlistId = await getUploadsPlaylistId(CHANNEL_ID);
  console.log(`[youtube-fetch] Uploads playlist: ${playlistId}`);

  const items    = await fetchPlaylistItems(playlistId);
  const episodes = items.map((item, i) => toEpisode(item, i)).reverse();
  // reverse so ep.num 1 = oldest, highest num = newest

  // ── Write output ────────────────────────────────────────────────────────
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(episodes, null, 2), "utf8");

  console.log(`[youtube-fetch] ✅ Wrote ${episodes.length} episodes → ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error("[youtube-fetch] ❌", err.message);
  process.exit(1);
});
