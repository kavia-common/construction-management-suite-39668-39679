import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, children, onClose, actions }) {
  /** Generic modal dialog used for forms and previews */
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-actions">
          {actions}
        </div>
      </div>
    </div>
  );
}
