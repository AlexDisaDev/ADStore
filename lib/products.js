// ÚNICO sitio donde se editan los productos.
// El precio se lee aquí en el servidor: nadie puede cambiarlo desde el navegador.
// price = céntimos (2999 = 29,99 €)
module.exports = {
  storeName: "ADStore",
  currency: "eur",
  shippingCountries: ["ES", "PT", "FR", "IT", "DE"],
  freeShippingText: "Envío gratis · Entrega 8-15 días",
  // Cada producto tiene su propia página: tudominio.com/<id>  (añade el id también en vercel.json)
  products: [
    {
      id: "farolillos",
      active: false, // en pausa: pon true para volver a venderlo
      name: "Farolillos LED plegables · Pack de 4",
      tagline: "Luz al instante en cualquier rincón: apagones, terraza, camping o regalo.",
      price: 2490,
      compareAt: 3990,
      images: ["/img/farolillos.svg"],
      bullets: [
        "Se despliegan y se encienden en un segundo",
        "Funcionan con pilas AAA, sin cables ni enchufes",
        "Ligeros y plegables: se guardan en cualquier cajón",
        "Pack de 4: uno para cada habitación"
      ]
    },
    {
      id: "bodyfaja",
      active: true,
      name: "Body faja moldeador con tirantes",
      tagline: "Cintura marcada y vientre plano desde el primer momento, invisible bajo la ropa.",
      price: 2990,
      compareAt: 4990,
      images: ["/img/bodyfaja-negro.jpg"],
      variants: [
        { id: "negro", name: "Negro", swatch: "#1a1a1a", image: "/img/bodyfaja-negro.jpg" },
        { id: "beige", name: "Beige", swatch: "#d8bfa3", image: "/img/bodyfaja-beige.jpg" }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      badge: "Nuevo · Edición invierno",
      bullets: [
        "Comprime cintura y abdomen y realza la figura",
        "Pecho abierto: úsalo con tu sujetador de siempre",
        "Tirantes ajustables y tejido transpirable",
        "No se marca bajo vestidos ni ropa ajustada"
      ],
      // Packs: descuento por unidad al llevar varias (se calcula en el servidor)
      bundles: [
        { qty: 1, discount: 0, label: "1 body" },
        { qty: 2, discount: 15, label: "2 bodies", tag: "Más elegido" },
        { qty: 3, discount: 25, label: "3 bodies", tag: "Mejor precio" }
      ],
      highlights: [
        { icon: "waist", title: "Cintura al instante", text: "Compresión en abdomen y cintura que se nota nada más ponértelo." },
        { icon: "eye", title: "Invisible", text: "Sin costuras marcadas bajo vestidos, camisetas o ropa ajustada." },
        { icon: "air", title: "Todo el día", text: "Tejido transpirable y tirantes ajustables para llevarlo horas." }
      ],
      // ⚠️ Comprueba estas medidas con la tabla del proveedor antes de vender
      sizeGuide: {
        headers: ["Talla", "Cintura (cm)", "Cadera (cm)"],
        rows: [["S", "60-66", "86-92"], ["M", "66-72", "92-98"], ["L", "72-78", "98-104"], ["XL", "78-84", "104-110"], ["XXL", "84-90", "110-116"]],
        tip: "Si estás entre dos tallas, elige la mayor para más comodidad."
      },
      details: [
        { title: "Descripción", text: "Body moldeador con tirantes y pecho abierto para llevarlo con tu propio sujetador. Zona de compresión en abdomen y cintura con tejido elástico y transpirable." },
        { title: "Envío", text: "Envío gratis con seguimiento. Preparamos tu pedido en 1-3 días hábiles y la entrega estimada es de 8-15 días hábiles." },
        { title: "Cambios y devoluciones", text: "Tienes 30 días desde que lo recibes. Si la talla no te queda bien, escríbenos y te ayudamos con el cambio." },
        { title: "Cuidados", text: "Lavar a mano en agua fría. No usar secadora ni lejía. Secar en plano." }
      ],
      faq: [
        { q: "¿Se nota debajo de la ropa?", a: "Está pensado para no marcarse: no tiene costuras gruesas y el acabado es liso." },
        { q: "¿Puedo usar mi sujetador?", a: "Sí, el pecho es abierto precisamente para que lleves el tuyo." },
        { q: "¿Qué talla elijo?", a: "Mira la guía de tallas con tu medida de cintura. Si estás entre dos, elige la mayor." },
        { q: "¿Cuánto tarda en llegar?", a: "Entre 8 y 15 días hábiles, con número de seguimiento por email." }
      ]
    }
  ]
};
