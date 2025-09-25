import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AuthError() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get('type');

  const message =
    type === 'redirect'
      ? 'Redirect URL not allowed. Ensure it is in the Supabase allowlist.'
      : type === 'email'
      ? 'There was an issue sending or confirming the email.'
      : type === 'not-configured'
      ? 'Supabase is not configured. Please set environment variables.'
      : type === 'session-missing'
      ? 'No active session found after auth callback.'
      : 'An authentication error occurred.';

  return (
    <div className="container" style={{ padding: 20 }}>
      <h2>Authentication Error</h2>
      <p style={{ color: 'var(--muted)' }}>{message}</p>
      <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
    </div>
  );
}
