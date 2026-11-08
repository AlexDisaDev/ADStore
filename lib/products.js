// ÚNICO sitio donde se editan los productos.
// El precio se lee aquí en el servidor: nadie puede cambiarlo desde el navegador.
// price = céntimos (2999 = 29,99 €)
module.exports = {
  storeName: "ADStore",
  currency: "eur",
  shippingCountries: ["ES", "PT", "FR", "IT", "DE"],
  freeShippingText: "Envío gratis · Entrega 5-9 días",
  // Cada producto tiene su propia página: tudominio.com/<id>  (añade el id también en vercel.json)
  products: [
    {
      id: "farolillos",
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
      name: "Body faja fácil de quitar",
      tagline: "Moldea la silueta y se quita en segundos.",
      price: 2990,
      compareAt: 4990,
      images: ["/img/bodyfaja.svg"],
      variants: [
        { id: "negro", name: "Negro", swatch: "#1a1a1a" },
        { id: "beige", name: "Beige", swatch: "#d8bfa3" },
        { id: "marron", name: "Marrón", swatch: "#6b4a35" }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      bullets: [
        "Efecto vientre plano y cintura marcada",
        "Fácil de poner y quitar",
        "Invisible bajo la ropa",
        "¿Dudas con la talla? Cambio gratis"
      ]
    }
  ]
};
