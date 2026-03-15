// ─────────────────────────────────────────────────────────────────────────────
// hooks/useEpisodes.js
// React hook — fetches episodes from local JSON, exposes loading/error states.
// Components never call fetchEpisodes() directly; they use this hook.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { fetchEpisodes } from "../services/jsonService.js";

/**
 * @returns {{ episodes: Array, loading: boolean, error: string|null }} 
 */
export function useEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const data = await fetchEpisodes();

      if (cancelled) return;

      if (!data || data.length === 0) {
        setError("Impossible de charger les épisodes.");
      } else {
        setEpisodes(data);
      }

      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { episodes, loading, error };
}
