const database = require('../database');

// *************** Log In *************
const EmployeLogin = (email, password, callback) => {
    // Definition de la requete 
    const query = 'SELECT * FROM employé WHERE email = ?';
    // exécution de la requete (recherche de l'employé qui a comme adresse , l'adresse entrée)
    database.query(query, [email], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }
  
      // verification de l'existance de l'adresse 
      if (results.length === 0) {
        // si l'ensemble de resultat est vide c'est à dire "aucun employé n'est inscrit avec cette adresse mail"
        const errorMessage = 'Adresse mail incorrecte';
        callback(errorMessage, null);
        return;
      }
       
      // affectation de l'employé trouvé à la constante employe
      const employe = results[0];
      // Vérification du mot de passe 
      if (employe.motDepasse !== password) {
        // si cette condition n'est pas vérifiée c'est à dire que "le mot de passe entré est incorrect"
        const errorMessage = 'Mot de passe incorrect';
        callback(errorMessage, null);
        return;
      }
  
      // Sinon retourner l'id de l'employé connecté 
      const employeId = employe.idEmployé;
      callback(null, employeId);
    });
  };

  
// ********** module exports ***********
module.exports = {
    EmployeLogin,
}