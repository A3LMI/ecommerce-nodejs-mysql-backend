import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin } from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import { GererProduits } from './components/GererProduits';
import { GererCategories } from './components/GererCategories';
import { GererClients } from './components/GererClients';
import { GererCommandes } from './components/GererCommandes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin" element={<Admin />}>
        <Route path="tableau-de-bord" element={<AdminDashboard />} />
        <Route path="gerer-les-produits" element={<GererProduits />} />
        <Route path="gerer-les-clients" element={<GererClients />} />
        <Route path="gerer-les-categories" element={<GererCategories />} />
        <Route path="gerer-les-commandes" element={<GererCommandes />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
