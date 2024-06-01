import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { HistoryProvider } from "./Components/HistoryProvider";


ReactDOM.createRoot(document.getElementById("root__body")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
