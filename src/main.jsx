import React from 'react' // nodig voor <React.StrictMode>
import ReactDOM from 'react-dom/client' // createRoot: koppelt React aan een HTML-element
import App from './App.jsx' // het dashboard-component
import './index.css' // algemene styling voor de hele pagina

// Zoek <div id="root"> in index.html en teken App daarin.
// StrictMode laat React in development extra controleren; daardoor kunnen console.logs twee keer verschijnen.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
