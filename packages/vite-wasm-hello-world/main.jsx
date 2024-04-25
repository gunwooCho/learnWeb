import React from 'react';
import { createRoot } from 'react-dom/client';

import './wasm';

import Pages from './pages';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>,
);
