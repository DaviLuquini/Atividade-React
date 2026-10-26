import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/Toast';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
      <Toast />
    </ToastProvider>
  </React.StrictMode>,
);
