#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# start.sh — Lance l'environnement Docker SVS et nettoie à la sortie
#
# Usage:
#   ./start.sh          → lance le frontend (dev server)
#   ./start.sh sync     → lance le frontend + sync YouTube une fois
#   ./start.sh build    → build de production (pas de Docker)
#   ./start.sh stop     → arrête et nettoie sans relancer
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Couleurs terminal ────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; PINK='\033[0;35m'; NC='\033[0m'

# ── Helpers ──────────────────────────────────────────────────────────────────
log()     { echo -e "${BLUE}[SVS]${NC} $*"; }
success() { echo -e "${GREEN}[SVS] ✓${NC} $*"; }
warn()    { echo -e "${YELLOW}[SVS] ⚠${NC} $*"; }
error()   { echo -e "${RED}[SVS] ✗${NC} $*"; }

# ── Fonction de nettoyage (appelée à la sortie) ───────────────────────────────
cleanup() {
  echo ""
  log "Arrêt en cours..."

  # Arrêter et supprimer les conteneurs du projet
  docker compose down --remove-orphans 2>/dev/null || true

  # Supprimer les images de build intermédiaires (optionnel — commenter si trop lent)
  # docker image prune -f --filter "label=com.docker.compose.project=sololaveritestudio" 2>/dev/null || true

  success "Environnement arrêté et nettoyé."
  echo -e "${PINK}  Solola Vérité Studio — à bientôt !${NC}"
}

# Enregistrer cleanup sur Ctrl+C, kill, et sortie normale
trap cleanup EXIT INT TERM

# ─────────────────────────────────────────────────────────────────────────────
# COMMANDE : stop
# ─────────────────────────────────────────────────────────────────────────────
if [[ "${1:-}" == "stop" ]]; then
  log "Arrêt de l'environnement..."
  docker compose down --remove-orphans
  success "Arrêté."
  exit 0
fi

# ─────────────────────────────────────────────────────────────────────────────
# COMMANDE : build
# ─────────────────────────────────────────────────────────────────────────────
if [[ "${1:-}" == "build" ]]; then
  log "Build de production..."
  npm run build
  success "Build terminé → dossier dist/"
  exit 0
fi

# ─────────────────────────────────────────────────────────────────────────────
# VÉRIFICATIONS PRÉ-LANCEMENT
# ─────────────────────────────────────────────────────────────────────────────
log "Vérification des prérequis..."

# Docker installé ?
if ! command -v docker &>/dev/null; then
  error "Docker n'est pas installé. https://docs.docker.com/get-docker/"
  exit 1
fi

# Docker Compose disponible ?
if ! docker compose version &>/dev/null; then
  error "Docker Compose plugin manquant. https://docs.docker.com/compose/install/"
  exit 1
fi

# Fichier .env présent ?
if [[ ! -f ".env" ]]; then
  warn ".env non trouvé — copie de .env.example"
  cp .env.example .env
  warn "Éditez .env et ajoutez vos clés API, puis relancez ./start.sh"
  exit 1
fi

success "Prérequis OK"

# ─────────────────────────────────────────────────────────────────────────────
# COMMANDE : sync  (YouTube + frontend)
# ─────────────────────────────────────────────────────────────────────────────
if [[ "${1:-}" == "sync" ]]; then
  log "Synchronisation YouTube..."
  docker compose --profile sync run --rm youtube-sync
  success "episodes.json mis à jour dans public/data/"
fi

# ─────────────────────────────────────────────────────────────────────────────
# LANCEMENT DU FRONTEND
# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${PINK}  ╔══════════════════════════════════════╗"
echo -e "  ║     SOLOLA VÉRITÉ STUDIO — DEV      ║"
echo -e "  ╚══════════════════════════════════════╝${NC}"
echo ""

log "Construction de l'image Docker..."
docker compose build --quiet frontend

log "Démarrage du serveur de développement..."
echo ""
echo -e "  ${GREEN}→ Site disponible sur : http://localhost:3000${NC}"
echo -e "  ${YELLOW}→ Ctrl+C pour arrêter et nettoyer${NC}"
echo ""

# Lance le frontend en mode attaché (les logs s'affichent dans le terminal)
# EXIT TRAP s'occupera du cleanup quand l'utilisateur fait Ctrl+C
docker compose up frontend
