// Entrada da versão sem servidor (link para celular): o MESMO app da NEXPLAY, com roteamento por hash
// e a API local (projetos no aparelho, NEXPLAY AI pelo Claude da página).
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import { AuthProvider } from '../src/auth.jsx';
import { ToastProvider } from '../src/components/ui.jsx';
import '../src/styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  </StrictMode>,
);
