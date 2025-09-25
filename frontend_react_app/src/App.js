import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Financials from './pages/Financials';
import Estimates from './pages/Estimates';
import Jobs from './pages/Jobs';
import Proposals from './pages/Proposals';
import Invoices from './pages/Invoices';
import Receipts from './pages/Receipts';
import Contracts from './pages/Contracts';
import Marketing from './pages/Marketing';
import Backlog from './pages/Backlog';
import Reports from './pages/Reports';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application with routing and main layout */
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
