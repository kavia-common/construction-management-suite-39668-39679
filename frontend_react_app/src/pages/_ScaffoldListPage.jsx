import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import api from '../lib/apiClient';

/**
 * PUBLIC_INTERFACE
 * ScaffoldListPage
 * A generic list + modal form scaffold page connected to backend_api endpoints via REST.
 * Props:
 * - moduleKey: string (e.g., 'projects') used to construct REST path: /api/{moduleKey}
 * - title: string
 * - createLabel: string (button label)
 */
export default function ScaffoldListPage({ moduleKey, title, createLabel }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', notes: '' });
  const [loading, setLoading] = useState(false);

  const path = `/api/${moduleKey}`;

  async function load() {
    setLoading(true);
    try {
      const data = await api.get(path).catch(() => []);
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleKey]);

  async function handleCreate(e) {
    e.preventDefault();
    await api.post(path, form).catch(() => null);
    setOpen(false);
    setForm({ name: '', notes: '' });
    load();
  }

  return (
    <>
      <PageHeader
        title={title}
        subtitle={`Manage ${title.toLowerCase()} records and actions.`}
        actions={<button className="btn btn-primary" onClick={() => setOpen(true)}>{createLabel}</button>}
      />
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr><td colSpan={2} style={{ color: 'var(--muted)' }}>No records yet.</td></tr>
                  )}
                  {items.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td>{it.name || '—'}</td>
                      <td>{it.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={open}
        title={`Create ${title.slice(0, -1)}`}
        onClose={() => setOpen(false)}
        actions={
          <>
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCreate}>Save</button>
          </>
        }
      >
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Name</div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
                placeholder="Enter name"
              />
            </label>
            <label>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Notes</div>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
                placeholder="Optional notes"
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
}
