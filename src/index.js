import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-tabs/style/react-tabs.css';

import './index.css';
import App from './App';
import WrapContexts from './contexts/wrapContexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WrapContexts>
    <App />

      </WrapContexts>
  </React.StrictMode>
);


