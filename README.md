# Solola Vérité Studio — Setup Guide

Stack : React + Vite · GitHub Pages · Shopify · YouTube API · Docker

---

## Démarrage rapide

```bash
# 1. Cloner le repo
git clone https://github.com/ton-org/sololaveritestudio.git
cd sololaveritestudio

# 2. Créer le fichier d'environnement
cp .env.example .env
# → éditer .env et remplir YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID

# 3. Lancer avec Docker (recommandé)
docker compose up

# → Site disponible sur http://localhost:3000
```

---

## Sans Docker

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Avec bash

./start.sh          # lance le dev server → http://localhost:3000
./start.sh sync     # sync YouTube puis lance le frontend
./start.sh build    # build production → dist/
## docker compose build frontend
./start.sh deploy
./start.sh stop     # arrête et nettoie les conteneurs

---

## Synchroniser les épisodes YouTube manuellement

```bash
# Avec Docker
docker compose run --profile sync youtube-sync

# Sans Docker
npm run youtube-sync
```

Cela génère/met à jour `public/data/episodes.json`.

---

## Structure du projet

```
/config           → configuration centralisée (domaines, nav, couleurs)
/src
  /components     → Navbar, Footer, composants réutilisables
  /pages          → une page = un fichier
  /hooks          → useEpisodes, useProducts…
  /services       → jsonService.js (fetch + cache)
  /utils          → redirect.js
/data             → épisodes statiques de fallback
/scripts          → youtube-fetch.js
/public/data      → episodes.json généré automatiquement
/.github/workflows → youtube-sync.yml (CRON quotidien)
/docker           → docs Shopify
```

---

## Variables d'environnement

| Variable              | Description                        | Requis |
|-----------------------|------------------------------------|--------|
| `YOUTUBE_API_KEY`     | Clé API YouTube v3                 | ✅ Oui |
| `YOUTUBE_CHANNEL_ID`  | ID de la chaîne YouTube            | ✅ Oui |
| `VITE_MAIN_URL`       | URL du site React                  | ✅ Oui |
| `VITE_SHOP_URL`       | URL du store Shopify               | ✅ Oui |

Pour GitHub Actions, ajouter ces variables dans :
**Settings → Secrets and variables → Actions**

---

## Déploiement GitHub Pages

```bash
npm run build
# → dossier dist/ à déployer sur la branche gh-pages
```

Ou configurer une GitHub Action de déploiement automatique.

---

## Shopify

Voir `docker/shopify-nav.md` pour les instructions d'intégration navigation + CSS.
