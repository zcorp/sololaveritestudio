#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// scripts/shopify-fetch.js
// Fetch les produits Shopify via l'API JSON publique (sans token)
// ─────────────────────────────────────────────────────────────────────────────

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SHOP_DOMAIN = process.env.SHOPIFY_DOMAIN ?? "shop.sololaveritestudio.com";
const OUTPUT_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/data/products.json"
);

function toProduct(p) {
  const variant   = p.variants[0];
  const price     = parseFloat(variant.price);
  const compareAt = parseFloat(variant.compare_at_price ?? 0);

  return {
    id:            p.id,
    handle:        p.handle,
    title:         p.title,
    type:          p.product_type ?? "",
    available:     p.variants.some(v => v.available),
    price,
    compareAt:     compareAt > price ? compareAt : null,
    shopUrl:       `https://${SHOP_DOMAIN}/products/${p.handle}`,
    image:         p.images[0]?.src ?? null,
    images:        p.images.map(img => ({ url: img.src, alt: img.alt ?? p.title })),
    options:       p.options.map(o => ({ name: o.name, values: o.values })),
    variants:      p.variants.map(v => ({
      id:        v.id,
      title:     v.title,
      available: v.available,
      price:     parseFloat(v.price),
      image:     p.images.find(img => img.id === v.image_id)?.src ?? null,
      options:   p.options.map((o, i) => ({
        name:  o.name,
        value: v[`option${i + 1}`],
      })),
    })),
  };
}

async function main() {
  console.log(`[shopify-fetch] Fetching → https://${SHOP_DOMAIN}/products.json`);

  const res = await fetch(`https://${SHOP_DOMAIN}/products.json?limit=10`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const { products } = await res.json();
  const mapped = products.map(toProduct);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapped, null, 2), "utf8");

  console.log(`[shopify-fetch] ✅ ${mapped.length} produit(s) → ${OUTPUT_FILE}`);
  mapped.forEach(p => console.log(`  • ${p.title} — ${p.price} €`));
}

main().catch(err => {
  console.error("[shopify-fetch] ❌", err.message);
  process.exit(1);
});