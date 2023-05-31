const express = require('express');
const app = express();

const userController = require('./controllers/userController');
const responsableController = require('./controllers/responsableController');
const employeController = require('./controllers/employeController');


app.use(express.json());


// ******* Route SignUp touriste **********
app.post('/signup', userController.signUpUtilisateur);

// ******* Route Log In touriste **********
app.post('/login', userController.loginUtilisateur);

// ******* Route Google Log In touriste **********
app.post('/googlelogin', userController.GoogleLogin);

//******* Route responsable Sign Up **********
app.post('/resposignup', responsableController.signUpResponsable);

//******* Route responsable Log In **********
app.post('/respologin', responsableController.loginResponsable);

// ******* Route employe de ministere Log In **********
app.post('/employelogin', employeController.loginEmploye);

// ******* Route pour modifier un lieu **********
app.put('/lieu/modifier', responsableController.modifierLieu);
// app.post('/ModifierLieu/:idPI', responsableController.modifierLieu);

// ******* Route pour mot de passe oublié **********
app.post('/motdepasseOublie', userController.mod_motDePasse);

// ********* Listening to port *********
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




