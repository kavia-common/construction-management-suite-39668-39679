import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const modules = [
  'Projects', 'Financials', 'Estimates', 'Jobs', 'Proposals',
  'Invoices', 'Receipts', 'Contracts', 'Marketing', 'Backlog', 'Reports'
];

function toPath(name) {
  return `/${name.toLowerCase()}`;
}

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Side menu for module navigation */
  return (
    <aside className="sidebar">
      <div className="side-title">Modules</div>
      <nav className="menu" aria-label="Primary">
        {modules.map((m) => (
          <NavLink
            key={m}
            to={toPath(m)}
            className={({ isActive }) => clsx(isActive && 'active')}
          >
            {m}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
