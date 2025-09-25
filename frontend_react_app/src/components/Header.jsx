import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

const topLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/financials', label: 'Financials' },
  { to: '/reports', label: 'Reports' },
];

// PUBLIC_INTERFACE
export default function Header() {
  /** App top header with brand and quick nav */
  return (
    <header className="app-header">
      <div className="navbar container">
        <Link to="/" className="brand">
          <span className="brand-badge" aria-hidden />
          <span>Construction Suite</span>
        </Link>
        <nav style={{ display: 'flex', gap: 8 }}>
          {topLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                clsx('btn', isActive && 'btn-amber')
              }
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="top-actions">
          <button className="btn">Help</button>
          <button className="btn btn-primary">New</button>
        </div>
      </div>
    </header>
  );
}
