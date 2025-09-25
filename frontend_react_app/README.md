# Construction Management Suite - React Frontend

Ocean Professional themed React app with modular routing and REST + Supabase scaffolding.

## Features
- Ocean Professional theme (blue primary, amber accents), modern minimal UI
- Header + side menu layout, responsive grid/card system, modal component
- Routes for modules: Projects, Financials, Estimates, Jobs, Proposals, Invoices, Receipts, Contracts, Marketing, Backlog, Reports
- REST client using REACT_APP_API_BASE_URL
- Supabase client scaffolding for authentication and data usage
- Plaid Link integration to connect bank accounts and view accounts/transactions

## Getting Started

1. Copy env example and set values:
   cp .env.example .env
   - REACT_APP_API_BASE_URL (e.g., http://localhost:8000)
   - REACT_APP_SITE_URL (e.g., http://localhost:3000)
   - REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY (required to enable Supabase auth)
   - REACT_APP_PLAID_ENV (optional; defaults to sandbox)
- REACT_APP_SITE_URL (used for auth redirects; default to window.origin if not set)

2. Install and run:
   npm install
   npm start

## Plaid Integration (Frontend)
- The Financials page includes a "Connect a Bank" button using Plaid Link (@plaid/react-plaid-link).
- The frontend calls the backend for:
  - POST /api/plaid/create_link_token
  - POST /api/plaid/exchange_public_token
  - GET  /api/plaid/accounts
  - GET  /api/plaid/transactions
- Sensitive tokens are never stored in the frontend (.env avoids secrets). The backend must securely store access tokens.

See assets/plaid_frontend_notes.md for details.

## Folder Structure
- src/lib/apiClient.js: REST client
- src/lib/plaidService.js: Plaid-related API calls to backend
- src/lib/supabaseClient.js: Supabase client
- src/components: Header, Sidebar, Modal, PageHeader, StatCard
- src/layouts/MainLayout.jsx: App shell
- src/pages: Dashboard and all module pages; Financials contains Plaid UI

## Style Guide
Theme tokens and layout styles are in src/index.css. Use:
- --primary: #2563EB
- --secondary: #F59E0B
- Rounded corners, subtle shadows, and gradients
