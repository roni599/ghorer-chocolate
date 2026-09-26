# শোখো (Shokho) — React Storefront

A Vite + React + Tailwind implementation of the Shokho chocolate-shop site,
with routing, a cart, and full product → checkout → order flow.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Pages / routes

| Route              | Page             | What it does                                                        |
|---------------------|------------------|----------------------------------------------------------------------|
| `/`                  | HomePage         | Hero, category carousel, trust badges, custom-box builder, reviews  |
| `/product/:id`       | ProductPage      | Product photo, price, quantity, "Add to cart" / "Buy now"           |
| `/checkout`          | CheckoutPage     | Cart review, shipping form, payment method, places the order        |
| `/order/:orderId`    | OrderPage        | Order confirmation, progress tracker, full order summary            |

Cart state lives in `src/context/CartContext.jsx` (React context +
`localStorage`, so it survives a refresh). Placed orders are also saved to
`localStorage` under `shokho_orders` so the order page can look them up by ID
— in a real deployment you'd replace both with real backend calls.

## Structure

```
src/
  components/            shared building blocks (Header, Footer, Hero, ...)
  pages/
    Layout.jsx            header + footer wrapper used by every page
    HomePage.jsx
    ProductPage.jsx
    CheckoutPage.jsx
    OrderPage.jsx
  context/CartContext.jsx cart state shared across pages
  data/
    content.js             site copy (features, reviews, footer links)
    products.js             product catalog (name, price, image, description)
public/images/            cropped photos from your reference design (see below)
```

## About the images

You said the reference design and its photography are your own, so the
product/lifestyle photos from your uploaded mockup were cropped out and
reused directly as real image assets in this project (`public/images/`):

- `hero-photo.jpg` — the couple making chocolate, used in the homepage hero
- `cat-dark.jpg`, `cat-milk.jpg`, `cat-assorted.jpg`, `cat-festive.jpg` — the
  four category photos
- `gift-box.jpg` — the "shokho"-branded box, used in the custom-box section
  and as the Signature Box product image
- `avatar-female.jpg`, `avatar-male.jpg` — the two reviewer photos

Swap any of these files (same filenames) with your own higher-resolution
originals whenever you have them — nothing else needs to change.

## Notes

- **Section headings**: the reference image had wireframe-style labels like
  "3. Product Categories" / "4. Local Trust & Features" mixed into an
  otherwise all-Bengali design — these read as spec annotations rather than
  shopper-facing copy, so this build uses plain Bengali headings instead.
  Rename them in each component if you want that literal numbering shown.
- **Fonts**: `Tiro Bangla` (headlines) + `Hind Siliguri` (body) load from
  Google Fonts in `index.html`.
- **Colors**: all custom tokens (cocoa, gold, maroon, cream) live in
  `tailwind.config.js`.
- **Payment methods** on checkout are illustrative (Cash on Delivery, bKash,
  Card) — wire them up to real payment gateways before going live.
- **Payment logos in the footer** (`public/images/payments/`): Visa and
  Mastercard are real brand marks from the [simple-icons](https://simpleicons.org/)
  project (CC0-licensed, free for commercial use — Mastercard's monochrome
  mark was recolored into the standard two-tone circles using its official
  brand colors). bKash, Nagad, Upay and Cellfin are Bangladeshi fintech
  brands with no free/open logo library available, so those four are
  original color-coded wordmark badges (not the real logos) as a stand-in.
  For pixel-exact official logos, download them from each brand's own
  merchant/press-kit page and replace the matching SVG file in
  `public/images/payments/` — the filenames already match what `Footer.jsx`
  expects, so no code changes are needed.
