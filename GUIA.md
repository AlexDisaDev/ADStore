# Guía: lanzar tu tienda (sin Shopify) con Stripe + Vercel

Coste fijo: **solo el dominio (~10-15 €/año)**. Vercel es gratis para empezar y Stripe cobra solo por venta (≈1,5 % + 0,25 € con tarjetas europeas).

## Qué hay en la carpeta
| Archivo | Para qué |
|---|---|
| `lib/products.js` | **Lo único que editas**: nombre de la tienda, productos, precios, fotos, países de envío |
| `index.html` | Página de producto (móvil primero, pensada para tráfico de TikTok/IG) |
| `api/checkout.js` | Crea el pago en Stripe (recoge dirección y teléfono para el envío) |
| `api/webhook.js` | Opcional: te registra cada pedido en los logs de Vercel |
| `gracias.html`, `legal.html` | Página tras pagar y textos legales (**rellena tus datos**) |
| `img/` | Pon aquí las fotos reales del producto (jpg/png/webp) |

Truco para la bio: `tudominio.com/?p=producto-1` muestra solo ese producto.

## Paso 1 · Stripe (15 min)
1. Crea cuenta en https://dashboard.stripe.com/register
2. Activa la cuenta: datos personales/autónomo, IBAN y web (pon tu dominio).
3. Ve a **Desarrolladores → Claves API** y copia la **clave secreta** (`sk_test_...` para probar, `sk_live_...` para vender de verdad).
   ⚠️ No la pegues en el chat ni en el código: va directa en Vercel (paso 3).

## Paso 2 · Código en GitHub
Crea un repositorio vacío en https://github.com/new (p. ej. `tienda`, privado) y dime el nombre. Yo subo el código.

## Paso 3 · Vercel (10 min)
1. Entra en https://vercel.com con tu cuenta de GitHub → **Add New → Project** → importa el repo `tienda` → **Deploy**.
2. **Settings → Environment Variables**, añade:
   - `STRIPE_SECRET_KEY` = tu clave `sk_...`
   - `SITE_URL` = `https://tudominio.com` (cuando tengas dominio)
3. **Deployments → Redeploy** para que coja las variables.

## Paso 4 · Dominio
Lo más fácil: cómpralo dentro de Vercel (**Settings → Domains → Buy**), queda conectado solo.
Si lo compras fuera (Cloudflare, Namecheap…): en Vercel **Domains → Add** y copia los registros DNS que te indica en tu proveedor.

## Paso 5 · Probar
Con clave `sk_test_...`, compra con la tarjeta `4242 4242 4242 4242`, fecha futura, CVC 123. Si llegas a `gracias.html`, funciona. Luego cambia a `sk_live_...` y redeploy.

## Paso 6 (opcional) · Aviso de pedidos
Stripe ya te manda email por cada pago y verás nombre + dirección en **Pagos**. Si además quieres el webhook:
Stripe → **Desarrolladores → Webhooks → Añadir endpoint** `https://tudominio.com/api/webhook`, evento `checkout.session.completed`. Copia el *signing secret* (`whsec_...`) a Vercel como `STRIPE_WEBHOOK_SECRET`.

## Flujo de cada venta (dropshipping)
Cliente paga → te llega el pedido en Stripe → lo compras al proveedor (CJ, AliExpress, Zendrop…) con la dirección del cliente → envías el número de seguimiento al email del cliente.

## Antes de vender
- Rellena `legal.html` con tus datos (Stripe y la ley lo piden).
- En España, vender de forma habitual requiere darte de alta como autónomo.
- Usa proveedores con almacén en la UE si puedes: plazos de 5-9 días y menos devoluciones.
