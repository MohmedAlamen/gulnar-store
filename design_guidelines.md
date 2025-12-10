# Gulnar Store - Design Guidelines

## Design Approach
**Reference-Based E-commerce Design** drawing inspiration from successful Arabic and international e-commerce platforms (Noon, Amazon, Shopify stores) with strong RTL support.

## Core Design Principles
1. **Product-First Philosophy**: Visual hierarchy emphasizes product imagery and pricing
2. **Arabic-Optimized**: Native RTL layout with Arabic typography excellence
3. **Trust & Clarity**: Clear pricing, shipping info, and customer reviews prominent
4. **Conversion-Focused**: Streamlined paths to purchase with minimal friction

## Typography System
**Font Stack**: 
- Primary (Arabic): 'Cairo', 'Tajawal' via Google Fonts
- Fallback: system-ui, -apple-system

**Hierarchy**:
- Hero Headlines: text-5xl md:text-6xl, font-bold
- Product Titles: text-2xl md:text-3xl, font-semibold
- Section Headers: text-3xl md:text-4xl, font-bold
- Body Text: text-base md:text-lg
- Product Descriptions: text-sm md:text-base, leading-relaxed
- Prices: text-2xl md:text-3xl, font-bold
- Labels/Metadata: text-xs uppercase, tracking-wide

## Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: py-12 md:py-16 lg:py-20
- Grid gaps: gap-4, gap-6, gap-8

**Container Strategy**:
- Full-width: w-full with max-w-7xl mx-auto px-4
- Product grids: max-w-6xl
- Checkout flow: max-w-4xl

**Grid Systems**:
- Product Catalogs: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Featured Products: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Checkout Steps: Single column on mobile, 2-column (cart summary + form) on desktop

## Core Components

### Navigation Header
**Structure**:
- Top bar: Shipping info, language switcher, account links (h-10)
- Main header: Logo (h-16), search bar (flex-1, max-w-2xl), cart icon with badge, account dropdown (h-20)
- Category nav: Horizontal scrolling category links (h-12)
- Mobile: Hamburger menu, sticky header with search

### Product Cards
**Layout**:
- Image container: aspect-square with hover zoom
- Title: 2 lines with text-overflow ellipsis
- Price: Bold, large, with strikethrough for sales
- Rating: Stars + review count
- Quick add-to-cart button overlay on hover
- Badge positioning: absolute top-2 right-2 for "Sale" or "New"

### Product Detail Page
**Structure**:
- 2-column desktop layout: 60% images, 40% details
- Image gallery: Main image (aspect-square) with thumbnail strip below
- Details panel: Title, rating, price, size/color selectors, quantity, add-to-cart (sticky on scroll)
- Tabs below: Description, Specifications, Reviews (full-width)
- Related products carousel at bottom

### Shopping Cart
**Layout**:
- Desktop: 2-column (70% items list, 30% summary sidebar - sticky)
- Cart items: Product image (w-24), title, price, quantity controls, remove button
- Empty cart: Centered illustration with "Continue Shopping" CTA

### Checkout Flow
**Multi-Step Layout**:
- Progress indicator: Steps (Shipping → Payment → Review)
- Form sections: Generous spacing (space-y-6)
- Input fields: h-12, rounded-lg, border-2
- Order summary: Sticky sidebar on desktop, collapsible accordion on mobile

### Homepage Sections
1. **Hero**: Full-width banner (h-[60vh]) with product showcase, primary CTA
2. **Featured Categories**: 4-column grid with image + title overlays
3. **Trending Products**: Horizontal scrolling carousel
4. **Promotional Banners**: 2-column asymmetric grid
5. **Customer Reviews**: 3-column testimonial cards
6. **Newsletter**: Centered, max-w-xl

### Footer
**4-Column Layout** (desktop):
- Column 1: About, logo, social links
- Column 2: Customer Service links
- Column 3: Quick Links (categories, policies)
- Column 4: Contact info, payment methods icons
- Bottom bar: Copyright, payment security badges

## RTL Considerations
- All layouts mirror for Arabic (flex-row-reverse, text-right)
- Icons flip appropriately (arrows, carets)
- Number formatting: Arabic-Indic numerals option
- Form labels positioned right-aligned

## Interaction Patterns
**Micro-interactions** (minimal animations):
- Product card hover: Subtle scale (scale-105), shadow elevation
- Add-to-cart: Success notification toast (slide-in from top)
- Image galleries: Crossfade transitions (300ms)
- Quantity buttons: Number change with fade transition

**Loading States**:
- Skeleton screens for product grids (animate-pulse)
- Shimmer effect for images loading

## Image Strategy

### Hero Section
Large lifestyle banner (1920x800px) showing products in use, overlaid text with blurred-background CTA button

### Product Images
- Catalog: Square format (800x800px minimum), white/neutral background
- Detail pages: High-res (1200x1200px), multiple angles, lifestyle shots
- Thumbnails: 100x100px

### Category Banners
Wide format (1200x400px) with product arrangements or lifestyle photography

### Trust Elements
- Payment provider logos (footer)
- Customer review photos (100x100px circles)
- Shipping/return icons (simple, monochrome SVGs)

## Form Design
**Input Fields**:
- Height: h-12
- Border: border-2, rounded-lg
- Labels: Above input, text-sm font-medium, mb-2
- Error states: Red border-2, error text below (text-sm)
- Success: Green border-2

**Buttons**:
- Primary CTA: h-12 md:h-14, px-8, rounded-lg, font-semibold
- Secondary: Same size, outline variant
- Icon buttons: w-12 h-12, rounded-full

## Spacing & Rhythm
- Card padding: p-4 md:p-6
- Section gaps: space-y-12 md:space-y-16
- Grid gaps: gap-4 md:gap-6
- Form field spacing: space-y-4

## Accessibility
- ARIA labels for RTL navigation
- Keyboard navigation for all interactive elements
- Focus states: ring-2 ring-offset-2
- Alt text for all product images
- Form validation with clear error messages