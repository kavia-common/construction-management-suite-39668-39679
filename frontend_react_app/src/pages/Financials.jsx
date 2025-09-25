import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  createPlaidLinkToken,
  exchangePublicToken,
  getLinkedAccounts,
  getTransactions
} from '../lib/plaidService';

/**
 * PUBLIC_INTERFACE
 * Financials
 * Financials hub for connecting bank accounts via Plaid Link and viewing accounts & transactions.
 * Backend endpoints expected:
 * - POST /api/plaid/create_link_token -> { link_token }
 * - POST /api/plaid/exchange_public_token { public_token } -> { status: 'linked' }
 * - GET  /api/plaid/accounts -> { accounts: [...] }
 * - GET  /api/plaid/transactions?account_id=&start_date=&end_date= -> { transactions: [...] }
 *
 * Notes:
 * - Tokens are never stored in the frontend.
 * - All config comes from .env through backend and api client base URL.
 */
export default function Financials() {
  const [linkToken, setLinkToken] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [linkOpenRequested, setLinkOpenRequested] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [txLoading, setTxLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch accounts on load
  const loadAccounts = useCallback(async () => {
    setAccountsLoading(true);
    setError('');
    try {
      const resp = await getLinkedAccounts();
      const list = resp?.accounts || [];
      setAccounts(list);
      if (list.length && !selectedAccountId) {
        setSelectedAccountId('all'); // default to all
      }
    } catch (e) {
      setError(renderApiError(e));
    } finally {
      setAccountsLoading(false);
    }
  }, [selectedAccountId]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  // Fetch transactions when selection changes
  const loadTransactions = useCallback(async () => {
    setTxLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedAccountId && selectedAccountId !== 'all') params.account_id = selectedAccountId;
      const resp = await getTransactions(params);
      setTransactions(resp?.transactions || []);
    } catch (e) {
      setError(renderApiError(e));
    } finally {
      setTxLoading(false);
    }
  }, [selectedAccountId]);

  useEffect(() => {
    if (selectedAccountId) {
      loadTransactions();
    }
  }, [selectedAccountId, loadTransactions]);

  // Initialize Plaid Link by requesting a link token
  const initLink = useCallback(async () => {
    setInitializing(true);
    setError('');
    setSuccess('');
    try {
      const resp = await createPlaidLinkToken();
      if (!resp?.link_token) {
        throw new Error('Failed to get link_token from server');
      }
      setLinkToken(resp.link_token);
      setLinkOpenRequested(true);
    } catch (e) {
      setError(renderApiError(e));
    } finally {
      setInitializing(false);
    }
  }, []);

  const onSuccess = useCallback(async (public_token, metadata) => {
    // Exchange public token on backend, then reload accounts
    try {
      setError('');
      setSuccess('');
      await exchangePublicToken(public_token);
      setSuccess('Bank account linked successfully.');
      await loadAccounts();
    } catch (e) {
      setError(renderApiError(e));
    }
  }, [loadAccounts]);

  const onExit = useCallback((err) => {
    if (err) {
      setError(`Plaid Link error: ${err.error_message || err.display_message || 'Exited'}`);
    }
  }, []);

  // Fallback Plaid Link loader (when @plaid/react-plaid-link isn't available in CI)
  const plaidHandlerRef = useRef(null);
  const [plaidReady, setPlaidReady] = useState(false);

  // Load the Plaid Link script once
  useEffect(() => {
    const existing = document.querySelector('script[src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"]');
    if (existing) {
      setPlaidReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.async = true;
    script.onload = () => setPlaidReady(true);
    script.onerror = () => setError('Failed to load Plaid Link script.');
    document.body.appendChild(script);
  }, []);

  // Initialize Plaid handler when we have token and script is ready
  useEffect(() => {
    if (!plaidReady || !linkToken || !window.Plaid) return;
    if (plaidHandlerRef.current) {
      try {
        plaidHandlerRef.current.destroy();
      } catch (_) {}
      plaidHandlerRef.current = null;
    }
    plaidHandlerRef.current = window.Plaid.create({
      token: linkToken,
      onSuccess,
      onExit,
    });
  }, [plaidReady, linkToken, onSuccess, onExit]);

  useEffect(() => {
    if (linkOpenRequested && plaidReady && plaidHandlerRef.current) {
      plaidHandlerRef.current.open();
      setLinkOpenRequested(false);
    }
  }, [linkOpenRequested, plaidReady]);

  const accountsCount = accounts?.length || 0;

  return (
    <>
      <PageHeader
        title="Financials"
        subtitle="Connect your bank accounts securely with Plaid and view your accounts and transactions."
        actions={
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={initLink} disabled={initializing}>
              {initializing ? 'Preparing...' : accountsCount ? 'Link Another Bank' : 'Connect a Bank'}
            </button>
            <button className="btn" onClick={loadAccounts} disabled={accountsLoading}>
              Refresh
            </button>
          </div>
        }
      />

      {error && (
        <div className="card" style={{ borderColor: 'rgba(239,68,68,.35)' }}>
          <div className="card-body" style={{ color: 'var(--error)' }}>
            {error}
          </div>
        </div>
      )}
      {success && (
        <div className="card" style={{ borderColor: 'rgba(16,185,129,.35)' }}>
          <div className="card-body" style={{ color: 'var(--success)' }}>
            {success}
          </div>
        </div>
      )}

      <div className="grid-2">
        <div className="card" style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,0.6))' }}>
          <div className="card-header">
            <div className="card-title">Linked Accounts</div>
          </div>
          <div className="card-body">
            {accountsLoading ? (
              <div>Loading accounts...</div>
            ) : accountsCount === 0 ? (
              <div style={{ color: 'var(--muted)' }}>
                No accounts connected yet. Click "Connect a Bank" to get started.
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                  <button
                    className={`btn ${selectedAccountId === 'all' ? 'btn-amber' : ''}`}
                    onClick={() => setSelectedAccountId('all')}
                  >
                    All accounts
                  </button>
                  {accounts.map((acc) => (
                    <button
                      key={acc.account_id || acc.id}
                      className={`btn ${selectedAccountId === acc.account_id ? 'btn-amber' : ''}`}
                      onClick={() => setSelectedAccountId(acc.account_id)}
                      title={`${acc.name || acc.official_name || acc.mask || 'Account'}`}
                    >
                      {(acc.name || acc.official_name || 'Account')} {acc.mask ? `••••${acc.mask}` : ''}
                    </button>
                  ))}
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Institution</th>
                        <th>Account</th>
                        <th>Mask</th>
                        <th>Type</th>
                        <th>Subtype</th>
                        <th>Current Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((acc) => (
                        <tr key={acc.account_id || acc.id}>
                          <td>{acc.institution_name || acc.institution || '—'}</td>
                          <td>{acc.name || acc.official_name || '—'}</td>
                          <td>{acc.mask ? `••••${acc.mask}` : '—'}</td>
                          <td>{acc.type || '—'}</td>
                          <td>{acc.subtype || '—'}</td>
                          <td>{formatCurrency(acc.balances?.current)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Transactions</div>
          </div>
          <div className="card-body">
            {txLoading ? (
              <div>Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div style={{ color: 'var(--muted)' }}>No transactions to display.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, idx) => (
                      <tr key={t.transaction_id || idx}>
                        <td>{t.date || t.authorized_date || '—'}</td>
                        <td>{t.name || t.merchant_name || '—'}</td>
                        <td>{Array.isArray(t.category) ? t.category.join(' / ') : (t.category || '—')}</td>
                        <td style={{ color: (t.amount || 0) < 0 ? 'var(--error)' : 'inherit' }}>
                          {formatCurrency(t.amount)}
                        </td>
                        <td>{t.account_name || t.account_id || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function formatCurrency(val) {
  if (val == null || Number.isNaN(Number(val))) return '—';
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(val));
  } catch {
    return `$${Number(val).toFixed(2)}`;
  }
}

function renderApiError(e) {
  if (!e) return 'Unknown error';
  if (e.data?.message) return e.data.message;
  if (e.data?.detail) return e.data.detail;
  if (typeof e.message === 'string') return e.message;
  return 'An error occurred while communicating with the server.';
}
