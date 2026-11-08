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
      bullets: [
        "Comprime cintura y abdomen y realza la figura",
        "Pecho abierto: úsalo con tu sujetador de siempre",
        "Tirantes ajustables y tejido transpirable",
        "No se marca bajo vestidos ni ropa ajustada",
        "¿Dudas con la talla? Te lo cambiamos"
      ]
    }
  ]
};
