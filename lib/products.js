// ÚNICO sitio donde se editan los productos.
// El precio se lee aquí en el servidor: nadie puede cambiarlo desde el navegador.
// price = céntimos (2999 = 29,99 €)
module.exports = {
  storeName: "ADStore",
  currency: "eur",
  shippingCountries: ["ES", "PT", "FR", "IT", "DE"],
  freeShippingText: "Free shipping · Delivery in 8-15 days",
  // Cada producto tiene su propia página: tudominio.com/<id>  (añade el id también en vercel.json)
  products: [
    {
      id: "farolillos",
      active: false, // en pausa: pon true para volver a venderlo
      name: "Collapsible LED Lanterns · 4-Pack",
      tagline: "Instant light anywhere: power cuts, patio, camping or as a gift.",
      price: 2490,
      compareAt: 3990,
      images: ["/img/farolillos.svg"],
      bullets: [
        "Pop up and switch on in a second",
        "Run on AAA batteries, no cables or plugs",
        "Light and collapsible: fit in any drawer",
        "4-pack: one for every room"
      ]
    },
    {
      id: "bodyfaja",
      active: true,
      name: "Sculpting Strap Bodysuit Shapewear",
      tagline: "Defined waist and flatter tummy from the moment you put it on, invisible under clothes.",
      price: 2990,
      compareAt: 4990,
      images: ["/img/bodyfaja-negro.jpg", "/img/bodyfaja-details-en.jpg", "/img/bodyfaja-colors-en.jpg", "/img/bodyfaja-guarantee-en.jpg"],
      variants: [
        { id: "negro", name: "Black", swatch: "#1a1a1a", image: "/img/bodyfaja-negro.jpg" },
        { id: "beige", name: "Nude", swatch: "#d8bfa3", image: "/img/bodyfaja-beige.jpg" }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      badge: "New · Winter edition",
      bullets: [
        "Compresses waist and tummy and enhances your figure",
        "Open bust: wear it with your own bra",
        "Adjustable straps and breathable fabric",
        "No visible lines under dresses or tight clothes"
      ],
      // Bundles: per-item discount when buying several (calculated on the server)
      bundles: [
        { qty: 1, discount: 0, label: "1 bodysuit" },
        { qty: 2, discount: 15, label: "2 bodysuits", tag: "Most popular" },
        { qty: 3, discount: 25, label: "3 bodysuits", tag: "Best value" }
      ],
      highlights: [
        { icon: "waist", title: "Instant waist", text: "Compression on tummy and waist you can feel as soon as you put it on." },
        { icon: "eye", title: "Invisible", text: "No bulky seams showing under dresses, tees or fitted clothes." },
        { icon: "air", title: "All-day comfort", text: "Breathable fabric and adjustable straps to wear it for hours." }
      ],
      // ⚠️ Check these measurements against the supplier's size chart before selling
      sizeGuide: {
        headers: ["Size", "Waist (cm)", "Hips (cm)"],
        rows: [["S", "60-66", "86-92"], ["M", "66-72", "92-98"], ["L", "72-78", "98-104"], ["XL", "78-84", "104-110"], ["XXL", "84-90", "110-116"]],
        tip: "If you're between two sizes, choose the larger one for comfort."
      },
      details: [
        { title: "Description", text: "Strap bodysuit shapewear with an open bust so you can wear your own bra. Compression zone on tummy and waist made of stretchy, breathable fabric." },
        { title: "Shipping", text: "Free tracked shipping. We prepare your order in 1-3 business days and estimated delivery is 8-15 business days." },
        { title: "Exchanges & returns", text: "You have 30 days from delivery. If the size doesn't fit, email us and we'll help you exchange it." },
        { title: "Care", text: "Hand wash in cold water. Do not tumble dry or bleach. Dry flat." }
      ],
      faq: [
        { q: "Does it show under clothes?", a: "It's designed not to: no thick seams and a smooth finish." },
        { q: "Can I wear my own bra?", a: "Yes, the bust is open precisely so you can wear yours." },
        { q: "Which size should I choose?", a: "Check the size guide with your waist measurement. If you're between two sizes, choose the larger one." },
        { q: "How long does delivery take?", a: "Between 8 and 15 business days, with a tracking number sent by email." }
      ]
    }
  ]
};
