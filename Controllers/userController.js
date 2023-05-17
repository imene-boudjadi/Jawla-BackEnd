const express = require('express');
const  userService  = require('../Services/userService');

const connection = require('../database');


const {
  getUsers,
  getUserById,
  createUser,
  getUserByEmail
} = userService;


const userController = express.Router();

//définir la route pour récupérer tous les utilisateurs
userController.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userController.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userController.post('/register', async (req, res) => {
  try {
    const user = req.body;
    console.log(user);

    const result0 = await getUserByEmail(user.email);
    if (result0.length > 0) {
      res.status(409).send("Email already exists");
    } else {
      const result = await createUser(user)
      return res.status(200).send("OK");
    }   
  } catch (error) {
    res.status(500).send(error);
  }
} )

module.exports = userController;

