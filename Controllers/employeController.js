const employeService = require('../services/employeService');


// *********** Employe Log In ****************
const loginEmploye = (req, res) => {
    const { email, password } = req.body;
  
    employeService.EmployeLogin(email, password, (error, Employe) => {
      if (error) {
        console.error('Error LogIn:', error);
        res.status(500).send(error);
        return;
      }
  
        res.json({ ' idEmployé ':  Employe });
    });
  };

// *********** module exports **********
module.exports = {
    loginEmploye,
  };