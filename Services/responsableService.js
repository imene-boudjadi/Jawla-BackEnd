const database = require('../database');



// *************** Sign Up *************
const createResponsable = (responsable, callback) => {


  // Definition des constantes/requetes 
  const queryCheckEmail = 'SELECT COUNT(*) AS emailCount FROM responsable WHERE email = ?'; 
  const queryCheckPhoneNumber = 'SELECT COUNT(*) AS phoneNumberCount FROM responsable WHERE numeroDeTel = ?';
  // lire les informations du responsable 
  const query = 'INSERT INTO responsable (nom, prenom, email, motDepasse, numeroDeTel) VALUES (?, ?, ?, ?, ?)';
  const { nom, prenom, mail, motdepasse, numeroDeTel } = responsable;

  // l'adresse mail doit etre de la forme R_1ere lettre du prenom_nom@jawla.dz
  // Vérification du nom et de la première lettre du prenom dans l'adresse e-mail
  const firstLetterOfPrenom = prenom.charAt(0).toLowerCase();
  // la syntaxe de l'adresse mail valide 
  const mailVerif = `R${firstLetterOfPrenom}_${nom.toLowerCase()}@jawla.dz`

  console.log(mailVerif);

  // Vérification que l'adresse e-mail est valide 
  if (mail !== mailVerif) {
    const errorMessage = 'Adresse mail invalide.';
    callback(errorMessage, null);
    return;
  }

  // Vérification de l'unicité de l'adresse e-mail
    database.query(queryCheckEmail, [mailVerif], (error, emailResult) => {
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

      // Insertion du responsable dans la BDD
      database.query(query, [nom, prenom, mailVerif, motdepasse, numeroDeTel], (error, results) => {
        if (error) {
          console.error('Error executing user insertion query:', error);
          callback(error, null);
          return;
        }

        const responsableId = results.insertId;
        callback(null, responsableId);
      });
    });
  });
};



// *************** Log In *************
const ResponsableLogin = (email, password, callback) => {
    // Definition de la requete 
    const query = 'SELECT * FROM responsable WHERE email = ?';
    // exécution de la requete (recherche du responsable qui a comme adresse , l'adresse entrée)
    database.query(query, [email], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }
  
      // verification de l'existance de l'adresse 
      if (results.length === 0) {
        // si l'ensemble de resultat est vide c'est à dire "aucun responsable n'est inscrit avec cette adresse mail"
        const errorMessage = 'Adresse mail incorrecte';
        callback(errorMessage, null);
        return;
      }
       
      // affectation du responsable trouvé à la constante responsable
      const responsable = results[0];
      // Vérification du mot de passe 
      if (responsable.motDepasse !== password) {
        // si cette condition n'est pas vérifiée c'est à dire que "le mot de passe entré est incorrect"
        const errorMessage = 'Mot de passe incorrect';
        callback(errorMessage, null);
        return;
      }
  
      // Sinon retourner l'id du responsable connecté 
      const responsableId = responsable.idResponsable;
      callback(null, responsableId);
    });
  };


// *************** Modifier les informations d'un point d'interet *************
const modifierLieu = (idPointInteret, titre, description, Adresse, valide, latitude, longitude, idResponsable, callback) => {
  // préparation de la requete SQL
  const query = 'UPDATE pointinteret SET titre = ?, description = ?, Adresse = ?, valide = ?, latitude = ?, longitude = ?, idResponsable = ? WHERE idPointInteret = ?';

  // Vérification si le idResponsable qui veut modifier est le même idResponsable correspondant à ce lieu en BDD (le responsable qui a créé le lieu)
  const reqrespo = 'SELECT COUNT(*) AS responsableCount FROM pointinteret WHERE idPointInteret = ? AND idResponsable = ?';

  database.query(reqrespo, [idPointInteret, idResponsable], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification du responsable du lieu :', error);
      callback(error, null);
      return;
    }

    const responsableCount = results[0].responsableCount;
    if (responsableCount === 0) {
      const errorMessage = 'Le responsable du lieu ne correspond pas au responsable qui veut modifié';
      callback(errorMessage, null);
      return;
    }

    // exécution de la requete
    database.query(query, [titre, description, Adresse, valide, latitude, longitude, idResponsable, idPointInteret], (error, results) => {
      if (error) {
        console.error('Erreur lors de la modification du point d\'interet :', error);
        callback(error, null);
        return;
      }

      callback(null, 'Lieu modifié');
    });
  });
};



// ********** module exports ***********
module.exports = {
    ResponsableLogin,
    createResponsable,
    modifierLieu,
  };
  