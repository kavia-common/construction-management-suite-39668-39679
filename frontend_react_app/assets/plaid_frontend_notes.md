# Plaid Frontend Integration Notes

This frontend integrates Plaid Link using @plaid/react-plaid-link and delegates all sensitive operations to the backend.

Endpoints expected on backend_api:
- POST /api/plaid/create_link_token -> { link_token }
- POST /api/plaid/exchange_public_token { public_token } -> { status: 'linked' }
- GET  /api/plaid/accounts -> { accounts: [...] }
- GET  /api/plaid/transactions?account_id=&start_date=&end_date= -> { transactions: [...] }

Security:
- Never store Plaid access tokens in the frontend.
- Only the short-lived link_token is held in memory during the Link session.
- The public_token is immediately sent to backend for exchange and not persisted client-side.

Environment:
- REACT_APP_API_BASE_URL must point to backend_api.
- REACT_APP_SITE_URL recommended for redirects (Supabase/other auth).
- REACT_APP_PLAID_ENV is optional and for display/flagging only.

UI:
- Financials page provides:
  - "Connect a Bank" / "Link Another Bank" via Plaid Link
  - List of linked accounts
  - Transactions table with filter for All vs Account-specific

Troubleshooting:
- If the "Connect a Bank" button does nothing, verify backend /api/plaid/create_link_token is reachable and returns { link_token }.
- Accounts or transactions showing empty: ensure backend has stored access tokens and Plaid sandbox/production credentials are valid.
