# Construction Management Suite - React Frontend

Ocean Professional themed React app with modular routing and REST + Supabase scaffolding.

## Features
- Ocean Professional theme (blue primary, amber accents), modern minimal UI
- Header + side menu layout, responsive grid/card system, modal component
- Routes for modules: Projects, Financials, Estimates, Jobs, Proposals, Invoices, Receipts, Contracts, Marketing, Backlog, Reports
- REST client using REACT_APP_API_BASE_URL
- Supabase client scaffolding for authentication and data usage

## Getting Started

1. Copy env example and set values:
   cp .env.example .env
   - REACT_APP_API_BASE_URL (e.g., http://localhost:8000)
   - REACT_APP_SITE_URL (e.g., http://localhost:3000)
   - REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY (optional for auth now)

2. Install and run:
   npm install
   npm start

## Folder Structure
- src/lib/apiClient.js: REST client
- src/lib/supabaseClient.js: Supabase client
- src/components: Header, Sidebar, Modal, PageHeader, StatCard
- src/layouts/MainLayout.jsx: App shell
- src/pages: Dashboard and all module pages

## Style Guide
Theme tokens and layout styles are in src/index.css. Use:
- --primary: #2563EB
- --secondary: #F59E0B
- Rounded corners, subtle shadows, and gradients
