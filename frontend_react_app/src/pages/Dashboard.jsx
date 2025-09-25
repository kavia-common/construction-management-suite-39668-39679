import React from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your remodeling operations."
        actions={<Link to="/projects" className="btn btn-primary">Go to Projects</Link>}
      />
      <div className="grid-3">
        <StatCard label="Revenue (MTD)" value="$128,400" accent="amber" />
        <StatCard label="Open Proposals" value="7" />
        <StatCard label="Jobs in Progress" value="5" />
      </div>
      <div className="grid-2" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Upcoming Jobs</div></div>
          <div className="card-body">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Kitchen Remodel - 10/05</li>
              <li>Bathroom Upgrade - 10/08</li>
              <li>Deck Repair - 10/12</li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Recent Invoices</div></div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr><th>Invoice</th><th>Client</th><th>Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>INV-2045</td><td>Smith</td><td>$3,200</td></tr>
                <tr><td>INV-2046</td><td>Lee</td><td>$1,480</td></tr>
                <tr><td>INV-2047</td><td>Patel</td><td>$5,060</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
