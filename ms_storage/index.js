// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './address/config/config.js';
import addressRoutes from './address/routes/address.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Utilisation des routes d'adresse
app.use('/api/addresses', addressRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
