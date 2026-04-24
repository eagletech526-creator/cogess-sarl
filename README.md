# Cogese SARL - Site Web Officiel

Bienvenue sur le dépôt du site web officiel de **Cogese SARL**, une entreprise multiservices basée au Cameroun (Loum & Douala), offrant des services en beauté, immigration, logistique et immobilier.

## Technologies Utilisées
- **Frontend** : React.js (Vite), TailwindCSS, Framer Motion
- **Backend** : Node.js, Express.js
- **Base de données** : NeonDB (PostgreSQL) avec Drizzle ORM
- **Emails** : API Resend

## Prérequis
- Node.js (v18+)
- URL de base de données NeonDB et clé API Resend configurées.

## Installation Locale

1. Installation des dépendances :
   ```bash
   npm install
   ```
2. Créez un fichier `.env` à la racine et ajoutez vos variables d'environnement (ex: `RESEND_API_KEY`, `DATABASE_URL`).
3. Lancer le projet en mode développement (Frontend & Backend côté serveur) :
   ```bash
   npm run dev
   ```

## Structure du Projet
- `/src` : Code source frontend React (Composants et Pages).
- `/api` : Endpoints backend, schémas de la base de données (`schema.ts`).
- `/public` : Images, logos, et autres actifs statiques (`/welcome image.jpg`, `/perruques.jpg`, images de l'équipe).

## Déploiement
Le projet est configuré pour être déployé sur des plateformes telles que Vercel, avec une résolution stricte des modules ES (`NodeNext`) et un routage côté serveur pour les APIs.

---
© 2026 Cogese SARL. Tous droits réservés.
