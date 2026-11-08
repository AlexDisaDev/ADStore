// ÚNICO sitio donde se editan los productos.
// El precio se lee aquí en el servidor: nadie puede cambiarlo desde el navegador.
// price = céntimos (2999 = 29,99 €)
module.exports = {
  storeName: "ADStore",
  currency: "eur",
  shippingCountries: ["ES", "PT", "FR", "IT", "DE"],
  freeShippingText: "Envío gratis · Entrega 5-9 días",
  products: [
    {
      id: "producto-1",
      name: "Producto estrella",
      tagline: "La frase que engancha en una línea.",
      price: 2999,
      compareAt: 4999,
      images: ["/img/producto-1.svg"],
      bullets: [
        "Beneficio 1: qué problema resuelve",
        "Beneficio 2: por qué es mejor",
        "Beneficio 3: garantía 30 días"
      ]
    },
    {
      id: "producto-2",
      name: "Segundo producto",
      tagline: "Complemento perfecto del primero.",
      price: 1999,
      compareAt: 3499,
      images: ["/img/producto-2.svg"],
      bullets: ["Beneficio 1", "Beneficio 2", "Beneficio 3"]
    }
  ]
};
