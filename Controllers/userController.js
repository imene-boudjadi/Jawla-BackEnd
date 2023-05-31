const UserService = require('../services/UserService');


// *********** Sign Up User ****************
const signUpUtilisateur = (req, res) => {
  const utilisateur = req.body;

  UserService.createutilisateur(utilisateur, (error, utilisateurId) => {
    if (error) {
      console.error('Error creating utilisateur:', error);
      res.status(500).send(error);
      return;
    }

    res.json({ utilisateurId });
  });
};


// *********** Log In User ****************   
const loginUtilisateur = (req, res) => {
  const { email, password } = req.body;

  UserService.loginUser(email, password, (error, Utilisateur) => {
    if (error) {
      console.error('Error LogIn:', error);
      res.status(500).send(error);
      return;
    }

      res.json({ 'idUtilisateur:':  Utilisateur });
  });
};


// ******* Google Log In **********
const GoogleLogin = (req, res) => {

  const {nom, prenom , email } = req.body;

  UserService.authGoogle(nom, prenom,email, (error, message) => {
    if (error) {
      console.error('Erreur lors de l\'authentification de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur du serveur' });
      return;
    }

    res.json({ message });
  });
};


// ******* Mot de passe oublié **********
const mod_motDePasse = (req, res) => {
  
  const { email, nouv_password } = req.body;

  UserService.motDePasse_oublie(email, nouv_password, (error, message) => {
    if (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      res.status(400).json({ message: error });
      return;
    }

    res.json({ message });
  });
};


// *********** module exports **********
module.exports = {
  signUpUtilisateur, 
  loginUtilisateur,
  GoogleLogin,
  mod_motDePasse,
};

