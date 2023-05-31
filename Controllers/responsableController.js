const responsableService = require('../services/responsableService');

// express = require("express");
// const responsableController = express.Router();


// *********** Sign Up Responsable ****************
const signUpResponsable = (req, res) => {
    const responsable = req.body;
  
    responsableService.createResponsable(responsable, (error, responsableId) => {
      if (error) {
        console.error('Error creating responsable:', error);
        res.status(500).send(error);
        return;
      }
  
      res.json({ responsableId });
    });
  };

  

// *********** Log In Responsable ****************
const loginResponsable = (req, res) => {
    const { email, password } = req.body;
  
    responsableService.ResponsableLogin(email, password, (error, Responsable) => {
      if (error) {
        console.error('Error LogIn:', error);
        res.status(500).send(error);
        return;
      }
  
        res.json({ ' idResponsable ':  Responsable });
    });
  };


// ******* Modifier lieu **********
const modifierLieu = (req, res) => {
  const { idPointInteret, titre, description, adresse, valide, latitude, longitude, idResponsable } = req.body;

  responsableService.modifierLieu(idPointInteret, titre, description, adresse, valide, latitude, longitude, idResponsable, (error, result) => {
    if (error) {
      console.error('Erreur lors de la modification du lieu :', error);
      res.status(400).json({ message: error });
      return;
    }

    res.json({ message: result });
  });
};



// *********** module exports **********
module.exports = {
    signUpResponsable,
    loginResponsable,
    modifierLieu,
  };