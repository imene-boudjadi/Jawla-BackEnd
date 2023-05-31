const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: '178.32.109.176',       // Adresse de l'hôte de la base de données
  user: 'fgqnfdxm_Aniss',    // Nom d'utilisateur de la base de données
  password: 'CL1@nv~qwtyt',    // Mot de passe de la base de données
  database: 'fgqnfdxm_Jawla',    // Nom de la base de données
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});


module.exports = connection;

