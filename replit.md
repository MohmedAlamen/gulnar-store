# Gulnar Store

## Overview

Gulnar Store is a bilingual (Arabic/English) e-commerce platform built with React frontend and Express backend. The application features RTL support for Arabic, product browsing, shopping cart functionality, user authentication, and order management. It's designed as a conversion-focused online store targeting Arabic-speaking markets with full internationalization support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: React Context API for global state (auth, cart, theme, language)
- **Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Design Patterns
- **Context Providers**: Nested providers for theme, language, authentication, and store state
- **Component Structure**: Separation between pages, layout components, and reusable UI components
- **Path Aliases**: `@/` for client source, `@shared/` for shared code between client and server

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful API endpoints under `/api/` prefix
- **Session Management**: Express-session with MemoryStore (configurable for production)
- **Authentication**: Session-based auth with bcrypt password hashing
- **Validation**: Zod schemas for request validation

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Current Storage**: In-memory storage implementation (`server/storage.ts`) with interface designed for easy database migration
- **Database Tables**: users, categories, products, cart_items, orders, order_items

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **TypeScript**: Strict mode enabled with path mapping

### Key Features
- **Internationalization**: Arabic (RTL) and English support with dynamic direction switching
- **Theme System**: Light/dark mode with CSS variable-based theming
- **Cart Persistence**: LocalStorage-based cart with session ID tracking
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations and schema push (`db:push` script)

### Authentication & Sessions
- **express-session**: Server-side session management
- **memorystore**: In-memory session store (development)
- **connect-pg-simple**: PostgreSQL session store (available for production)
- **bcryptjs**: Password hashing

### UI/Frontend Libraries
- **Radix UI**: Headless UI primitives (dialog, dropdown, tabs, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **react-icons**: Additional icon sets (social media icons)
- **embla-carousel-react**: Carousel component
- **react-day-picker**: Date picker component
- **vaul**: Drawer component

### Data & Forms
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation with Zod
- **zod**: Schema validation
- **drizzle-zod**: Drizzle to Zod schema generation

### Build Tools
- **Vite**: Frontend bundler and dev server
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner