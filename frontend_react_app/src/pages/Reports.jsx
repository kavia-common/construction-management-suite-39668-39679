import React from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

// PUBLIC_INTERFACE
export default function Reports() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Operational and financial insights." />
      <div className="grid-3">
        <StatCard label="Active Projects" value="12" />
        <StatCard label="Open Invoices" value="$48,230" accent="amber" />
        <StatCard label="Avg. Lead Time" value="9.4 days" />
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header"><div className="card-title">Recent Activity</div></div>
        <div className="card-body">
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>Invoice INV-2045 paid</li>
            <li>Proposal PR-119 accepted</li>
            <li>Job J-883 scheduled</li>
          </ul>
        </div>
      </div>
    </>
  );
}
