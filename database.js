const mysql = require('mysql');

const createPool = require("mysql2/promise").createPool;
require('dotenv').config();

// Créer la connexion à la base de données MySQL
var pool = createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DB
  });

// Exporter la connexion à la base de données MySQL
module.exports = pool;