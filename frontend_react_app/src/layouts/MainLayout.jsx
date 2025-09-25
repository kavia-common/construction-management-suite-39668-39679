import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// PUBLIC_INTERFACE
export default function MainLayout({ children }) {
  /** App shell layout with header, sidebar, and main content */
  return (
    <>
      <Header />
      <div className="app-shell container">
        <Sidebar />
        <main className="main">
          <div className="main-inner">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
