const express = require('express');
const cors = require('cors');
//const mysql = require('mysql2');
const bodyParser = require('body-parser');


const userController = require('./Controllers/userController')



const app = express();

app.use(cors());
app.use(bodyParser.json())

// Monter les contrôleurs sur des routes spécifiques
app.use('/users', userController);


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
  })

//Démarrer le serveur
app.listen(4000, ()=> {
    console.log("serveur sur le port 4000");
}
)