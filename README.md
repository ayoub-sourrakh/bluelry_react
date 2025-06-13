# Bluelry Frontend

Frontend de l'application e-commerce [Bluelry](https://www.bluelry.com), développé en **React 18**. Cette SPA consomme une API Ruby on Rails sécurisée. Le projet intègre les solutions de paiement **Stripe** et **PayPal**, une interface responsive avec **React-Bootstrap**, et une gestion dynamique du panier via le Context API.

---

## 🚀 Stack technique

- **React 18** + **React Router 6** – app SPA moderne
- **Stripe + PayPal SDKs** – intégration de paiements
- **React-Bootstrap** – composants UI responsive
- **Font Awesome** – icônes vectorielles
- **Testing Library** – base de tests en place
- **Create React App** (CRA)

---

## 🧩 Fonctionnalités

- 🛍️ **Catalogue** : affichage dynamique des produits
- 🛒 **Panier** : ajout/retrait avec stockage local + gestion live
- 👤 **Auth** : interaction avec une API JWT sécurisée (login/signup)
- 💳 **Paiement** :
  - Stripe Checkout intégré (client secret fourni par backend)
  - PayPal via `@paypal/react-paypal-js`
- 📱 **Responsive** : support mobile/tablette/desktop
- ⚙️ **Séparation des responsabilités** :
  - composants UI isolés
  - routes protégées
  - appels API centralisés (via `axios`)

---

## ▶️ Lancer le projet en local

```bash
git clone https://github.com/ayoub-sourrakh/bluelry_react.git
cd bluelry_react
npm install
npm start
