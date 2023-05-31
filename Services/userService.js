const database = require('../database');


// *************** Sign Up *************
// la syntaxe de l'adresse mail valide 
const emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const createutilisateur = (utilisateur, callback) => {


  // Definition des constantes/requetes 
  const queryCheckEmail = 'SELECT COUNT(*) AS emailCount FROM utilisateur WHERE mail = ?'; 
  const queryCheckPhoneNumber = 'SELECT COUNT(*) AS phoneNumberCount FROM utilisateur WHERE numeroDeTel = ?';
  // lire les informations de l'utilisateur 
  const query = 'INSERT INTO utilisateur (nom, prenom, mail, motdepasse, numeroDeTel) VALUES (?, ?, ?, ?, ?)';
  const { nom, prenom, mail, motdepasse, numeroDeTel } = utilisateur;

  // Vérification que l'adresse e-mail est valide 
  if (!emailformat.test(mail)) {
    const errorMessage = 'Adresse mail invalide.';
    callback(errorMessage, null);
    return;
  }

  // Vérification de l'unicité de l'adresse e-mail
    database.query(queryCheckEmail, [mail], (error, emailResult) => {
    if (error) {
      console.error('Error executing email check query:', error);
      callback(error, null);
      return;
    }

    const emailCount = emailResult[0].emailCount;
    if (emailCount > 0) {
      const errorMessage = 'L\'adresse mail existe déjà.';
      callback(errorMessage, null);
      return;
    }

   // Vérification de l'unicité du numéro de téléphone
    database.query(queryCheckPhoneNumber, [numeroDeTel], (error, phoneNumberResult) => {
      if (error) {
        console.error('Error executing phone number check query:', error);
        callback(error, null);
        return;
      }

      const phoneNumberCount = phoneNumberResult[0].phoneNumberCount;
      if (phoneNumberCount > 0) {
        const errorMessage = 'Le numéro de téléphone existe déjà.';
        callback(errorMessage, null);
        return;
      }

      // Insertion de l'utilisateur dans la BDD
      database.query(query, [nom, prenom, mail, motdepasse, numeroDeTel], (error, results) => {
        if (error) {
          console.error('Error executing user insertion query:', error);
          callback(error, null);
          return;
        }

        const utilisateurId = results.insertId;
        callback(null, utilisateurId);
      });
    });
  });
};

// *************** Log In *************
const loginUser = (email, password, callback) => {
  // Definition de la requete 
  const query = 'SELECT * FROM utilisateur WHERE mail = ?';
  // exécution de la requete (recherche de l'utilisateur qui a comme adresse , l'adresse entrée)
  database.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      callback(error, null);
      return;
    }

    // verification de l'existance de l'adresse 
    if (results.length === 0) {
      // si l'ensemble de resultat est vide c'est à dire "aucun utilisateur n'est inscrit avec cette adresse mail"
      const errorMessage = 'Adresse mail incorrecte';
      callback(errorMessage, null);
      return;
    }
     
    // affectation de l'utilisateur trouvé à la constante user
    const user = results[0];
    // Vérification du mot de passe 
    if (user.motDePasse !== password) {
      // si cette condition n'est pas vérifiée c'est à dire que "le mot de passe entré est incorrect"
      const errorMessage = 'Mot de passe incorrect';
      callback(errorMessage, null);
      return;
    }

    // Sinon retourner l'id de l'utilisateur connecté 
    const userId = user.idUtilisateur;
    callback(null, userId);
  });
};



// *************** Authentification google *************
const authGoogle = (nom, prenom, email, callback) => {
  // On va vérifier si l'email existe déjà dans la base de données 
  const query = 'SELECT COUNT(*) AS emailCount FROM utilisateur WHERE mail = ?';
// exécution de la requete
  database.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'exécution de la requête:', error);
      callback('Erreur serveur', null);
      return;
    }

    const emailCount = results[0].emailCount;
    if (emailCount > 0) {
      // Si l'email existe déjà, on considére que l'utilisateur est connecté
      callback(null, 'Utilisateur connecté');
    } else {
      // Si l'email n'existe pas, on crée un nouvel utilisateur et on affecte le nom,prenom et le mail à ces champs dans la BDD
      const nouv_util_query = 'INSERT INTO utilisateur (nom, prenom, mail, motdepasse, numeroDeTel) VALUES (?, ?, ?, ?, ?)';
      const champs = [nom, prenom, email, null, null];

      database.query(nouv_util_query, champs, (error, results) => {
        if (error) {
          console.error('Erreur lors de l\'ajout du nouvel utilisateur:', error);
          callback('Erreur serveur', null);
          return;
        }

        callback(null, 'Le Nouvel utilisateur a été enregistré');
      });
    }
  });
};

// *************** Mot de passe oublié *************
const motDePasse_oublie = (email, nouv_motDePasse, callback) => {
  // Vérifier si l'adresse e-mail existe dans la base de données
  const checkExistEmailQuery = 'SELECT COUNT(*) AS emailCount FROM utilisateur WHERE mail = ?';

  database.query(checkExistEmailQuery, [email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      callback(error, null);
      return;
    }

    const emailCount = results[0].emailCount;
    if (emailCount === 0) { 
      // Cette adresse e-mail n'existe pas
      const errorMessage = "Adresse e-mail incorrecte";
      callback(errorMessage, null);
      return;
    }

    // Mettre à jour le mot de passe
    const updatePasswordQuery = 'UPDATE utilisateur SET motDePasse = ? WHERE mail = ?';

    database.query(updatePasswordQuery, [nouv_motDePasse, email], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }

      // Afficher le succès de la réinitialisation du mot de passe 
      callback(null, "Mot de passe réinitialisé avec succès");
    });
  });
};



// ********** module exports ***********
module.exports = {
  createutilisateur,
  loginUser,
  authGoogle,
  motDePasse_oublie,
};

