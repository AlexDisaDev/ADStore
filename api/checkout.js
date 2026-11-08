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
  let variant = null;
  if (product.variants && product.variants.length) {
    variant = product.variants.find(v => v.id === body.variantId);
    if (!variant) return res.status(400).json({ error: "Elige un color" });
  }
  let size = null;
  if (product.sizes && product.sizes.length) {
    size = product.sizes.find(x => x === body.size);
    if (!size) return res.status(400).json({ error: "Elige una talla" });
  }
  const name = [product.name, variant && variant.name, size && `Talla ${size}`].filter(Boolean).join(" - ");
  const basePrice = (variant && variant.price) || product.price;
  const bundle = (product.bundles || []).find(b => b.qty === qty);
  const price = Math.round(basePrice * (1 - ((bundle && bundle.discount) || 0) / 100));
  const lineName = bundle && bundle.discount ? `${name} (pack ${qty}, -${bundle.discount}%)` : name;
  const images = (variant && variant.image) ? [variant.image] : product.images;

  const origin = process.env.SITE_URL || `https://${req.headers.host}`;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity: qty,
        price_data: {
          currency: config.currency,
          unit_amount: price,
          product_data: { name: lineName, images: images.map(i => i.startsWith("http") ? i : origin + i).filter(i => !i.endsWith(".svg")) }
        }
      }],
      shipping_address_collection: { allowed_countries: config.shippingCountries },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      customer_creation: "always",
      payment_intent_data: { description: `${name} x${qty}`, metadata: { productId: product.id, variant: variant ? variant.id : "", size: size || "", quantity: String(qty) } },
      metadata: { productId: product.id, variant: variant ? variant.id : "", size: size || "", quantity: String(qty) },
      success_url: `${origin}/gracias.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${product.id}?cancelado=1`
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudo crear el pago" });
  }
};
