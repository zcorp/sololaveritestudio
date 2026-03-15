# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile
# Node LTS image — installs dependencies, exposes dev port, supports hot reload.
# Used by docker-compose for the `frontend` service.
# ─────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (layer cache: only re-runs npm install if they change)
COPY package*.json ./

# Install all dependencies (including devDependencies for dev server)
RUN npm install

# Copy the rest of the source
# Note: in docker-compose we mount the volume, so this layer is mainly
# for standalone `docker build` usage.
COPY . .

# Expose the Vite / CRA dev server port
EXPOSE 3000

# Default command: start the dev server with hot reload
# Vite: "npm run dev -- --host"  (--host makes it accessible from outside the container)
# CRA:  "npm start"
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
