import React from 'react';

// PUBLIC_INTERFACE
export default function PageHeader({ title, subtitle, actions }) {
  /** Common page header with title and actions */
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {subtitle && <div style={{ color: 'var(--muted)', marginTop: 6 }}>{subtitle}</div>}
      </div>
      {actions && <div className="card-body" style={{ paddingTop: 12 }}>{actions}</div>}
    </div>
  );
}
