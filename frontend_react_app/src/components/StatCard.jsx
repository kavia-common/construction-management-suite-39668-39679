import React from 'react';

// PUBLIC_INTERFACE
export default function StatCard({ label, value, accent = 'blue' }) {
  /** Small stat card widget */
  const accentStyle = accent === 'amber'
    ? { background: 'linear-gradient(180deg, rgba(245,158,11,0.12), transparent)' }
    : { background: 'linear-gradient(180deg, rgba(37,99,235,0.12), transparent)' };

  return (
    <div className="card" style={accentStyle}>
      <div className="card-body">
        <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{value}</div>
      </div>
    </div>
  );
}
