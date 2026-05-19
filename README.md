# Postmodern Tectonics

The world's first **Creative Label™** — a platform for emerging artists and designers to actualize their visions through creative joint ventures.

## About

Postmodern Tectonics exists at the intersection of art, design, and commerce. We focus on four human art forms:

- **Architecture** - Spatial design and construction
- **Objects** - Functional art and furniture (including our Musical Furniture™ line)
- **Words** - Essays, articles, and written content
- **Sounds** - Music curation, DJ sets, and audio experiences

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Ghost CMS (headless)
- **E-commerce**: Shopify Storefront API
- **Hosting**: Netlify
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image + Sharp

## Key Features

- 🎵 **Musical Furniture™** - Custom DJ furniture catalog with integrated e-commerce
- 📝 **Dynamic Content** - Blog posts and articles fetched from Ghost CMS
- 🛒 **Shopping Cart** - Full cart functionality with Shopify integration
- 🎨 **Custom Design** - Unique typography, custom cursors, and brand-specific styling
- 📱 **Responsive** - Fully responsive design for mobile and desktop
- ⚡ **Performance** - Optimized images, lazy loading, and ISR caching

## Getting Started

First, clone the repo and install dependencies:

```bash
npm install
```

Create a `.env.local` file with required environment variables:

```env
NEXT_PUBLIC_API_URL=your_shopify_storefront_url
NEXT_PUBLIC_ACCESS_TOKEN=your_shopify_access_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_signing_secret
GHOST_CONTENT_API_KEY=your_ghost_content_api_key
# optional alias:
# GHOST_API_KEY=your_ghost_content_api_key
RESEND_API_KEY=your_resend_api_key
```

### Shopify product cache (instant updates)

The `/products` grid is cached for up to 5 minutes. To refresh it immediately when you add or edit products in Shopify, register webhooks in **Shopify Admin → Settings → Notifications → Webhooks**:

| Event | URL |
| --- | --- |
| Product creation | `https://your-domain.com/api/shopify/webhooks` |
| Product update | same |
| Product deletion | same |
| Collection update | same |

Use the same signing secret for each webhook and set it as `SHOPIFY_WEBHOOK_SECRET` in your environment (Netlify env vars for production).

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── products/          # Product catalog and detail pages
│   ├── words/             # Blog/articles from Ghost CMS
│   ├── sounds/            # Music and DJ sets
│   └── cart/              # Shopping cart
├── components/            # React components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── assets/                # Images and static assets
└── fonts/                 # Custom fonts
```

## Contributing

This is a private project for Postmodern Tectonics LLC.

## License

© 2024-2025 Postmodern Tectonics LLC. All rights reserved.
