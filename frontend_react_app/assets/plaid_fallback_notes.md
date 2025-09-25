# Plaid Link Fallback Loader

In CI environments where adding new npm packages is restricted, the Financials page uses the official Plaid Link script loader:

- Script: https://cdn.plaid.com/link/v2/stable/link-initialize.js
- API: window.Plaid.create({ token, onSuccess, onExit })

When available, prefer using @plaid/react-plaid-link. The current implementation is compatible with both approaches with minimal changes required.
