import React from 'react';
import ReactDOM from 'react-dom/client';

const TinaAdmin: React.FC = () => {
  return (
    <div id="tina-admin-placeholder">
      <h1>TinaCMS Admin</h1>
      <p>Configure TinaCMS Cloud to enable editing</p>
    </div>
  );
};

if (typeof window !== 'undefined') {
  const container = document.getElementById('tina-admin');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<TinaAdmin />);
  }
}

export default TinaAdmin;