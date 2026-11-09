const Stripe = require("stripe");
const config = require("../lib/products");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: "Falta STRIPE_SECRET_KEY en Vercel" });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const product = config.products.find(p => p.id === body.productId && p.active !== false);
  const qty = Math.min(Math.max(parseInt(body.quantity, 10) || 1, 1), 10);
  if (!product) return res.status(400).json({ error: "Producto no encontrado" });
  // Cada unidad puede llevar su propio color y talla: items = [{ variantId, size }, ...]
  const raw = Array.isArray(body.items) && body.items.length ? body.items : [{ variantId: body.variantId, size: body.size }];
  if (raw.length !== 1 && raw.length !== qty) return res.status(400).json({ error: "Selección incompleta" });
  const picks = [];
  for (let i = 0; i < qty; i++) {
    const it = raw[raw.length === 1 ? 0 : i] || {};
    let variant = null, size = null;
    if (product.variants && product.variants.length) {
      variant = product.variants.find(v => v.id === it.variantId);
      if (!variant) return res.status(400).json({ error: "Elige un color" });
    }
    if (product.sizes && product.sizes.length) {
      size = product.sizes.find(x => x === it.size);
      if (!size) return res.status(400).json({ error: "Elige una talla para cada unidad" });
    }
    picks.push({ variant, size });
  }
  const bundle = (product.bundles || []).find(b => b.qty === qty);
  const discount = (bundle && bundle.discount) || 0;

  // Agrupa unidades iguales en una misma línea
  const groups = new Map();
  for (const { variant, size } of picks) {
    const key = `${variant ? variant.id : ""}|${size || ""}`;
    if (!groups.has(key)) groups.set(key, { variant, size, n: 0 });
    groups.get(key).n++;
  }
  const lines = [...groups.values()].map(({ variant, size, n }) => {
    const name = [product.name, variant && variant.name, size && `Talla ${size}`].filter(Boolean).join(" - ");
    return {
      label: `${n}x ${[variant && variant.name, size].filter(Boolean).join(" ") || product.name}`,
      name: discount ? `${name} (pack ${qty}, -${discount}%)` : name,
      price: Math.round(((variant && variant.price) || product.price) * (1 - discount / 100)),
      images: (variant && variant.image) ? [variant.image] : product.images.slice(0, 1),
      n
    };
  });
  const summary = lines.map(l => l.label).join(", ");

  const origin = process.env.SITE_URL || `https://${req.headers.host}`;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines.map(l => ({
        quantity: l.n,
        price_data: {
          currency: config.currency,
          unit_amount: l.price,
          product_data: { name: l.name, images: l.images.map(i => i.startsWith("http") ? i : origin + i).filter(i => !i.endsWith(".svg")) }
        }
      })),
      shipping_address_collection: { allowed_countries: config.shippingCountries },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      customer_creation: "always",
      payment_intent_data: { description: `${product.name}: ${summary}`.slice(0, 900), metadata: { productId: product.id, items: summary.slice(0, 480), quantity: String(qty) } },
      metadata: { productId: product.id, items: summary.slice(0, 480), quantity: String(qty) },
      success_url: `${origin}/gracias.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${product.id}?cancelado=1`
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudo crear el pago" });
  }
};
