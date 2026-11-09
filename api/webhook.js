// Opcional: Stripe avisa aquí de cada pago. Se ve en los logs de Vercel
// con nombre, dirección y producto para hacer el pedido al proveedor.
const Stripe = require("stripe");

module.exports.config = { api: { bodyParser: false } };

function rawBody(req) {
  return new Promise((ok, ko) => {
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => ok(Buffer.concat(chunks)));
    req.on("error", ko);
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).send(`Invalid signature: ${e.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    console.log("NUEVO PEDIDO", JSON.stringify({
      producto: s.metadata.productId, unidades: s.metadata.items, cantidad: s.metadata.quantity,
      total: s.amount_total / 100, email: s.customer_details?.email,
      nombre: s.collected_information?.shipping_details?.name || s.shipping_details?.name,
      direccion: s.collected_information?.shipping_details?.address || s.shipping_details?.address,
      telefono: s.customer_details?.phone
    }));
  }
  res.status(200).json({ received: true });
};
