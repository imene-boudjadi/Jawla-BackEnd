const pool = require('../database');

async function getUsers() {
    const connection = await pool.getConnection();
    try {
    //   const users = await connection.query("SELECT * from users");
    //   return users[0];
    } finally {
      connection.release();
    }
};

async function getUserById(idUser) {
  const connection = await pool.getConnection();
  try {
    // const user = await connection.query('SELECT * FROM users WHERE idUser = ?', [idUser]);
    // return user[0];
  } finally {
    connection.release();
  }
};

async function getUserByEmail(email) {
  const connection = await pool.getConnection();
  try {
    // const user = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    // return user[0];
  } finally {
    connection.release();
  }
};

async function createUser(user) {
  const connection = await pool.getConnection();
  try {
    // const result = await connection.query('INSERT INTO users (nom,prenom,email,password) VALUES (?,?,?,?);',
    // [user.nom, user.prenom, user.email, user.password]);
    // return result[0];
  } finally {
    connection.release();
  }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    getUserByEmail

};


// // Définir le service des utilisateurs
// class UserService {
//     constructor(connection) {
//         this.connection = connection;
//     }

//     getUsers(callback) {
//         // Sélectionner toutes les tâches dans la base de données
//         const query = 'SELECT * FROM users';
//         this.connection.query(query, (err, results) => {
//           if (err) throw err;
//           callback(results);
//         });
//     }
    
//     addUser(user, callback) {
//         // Sélectionner toutes les tâches dans la base de données
//         "INSERT INTO EntrepriseFavori (idEntreprise, idUtilisateur) VALUES (?, ?)",
//       [entrepriseId, userId]

//         const query = 'INSERT INTO users (nom, prenom, email, password) VALUES (?,?,?,?)'
//         this.connection.query(query, [user.nom, user.prenom, user.email, user.password],
//              (err) => {
//           if (err) throw err;
//           callback(results);
//         });
//     }
      

//     async getUserById() {

//         const result = [];
//         return result;
//     }

//     async addUser(user) {
//         const result = [];
//         return result.insertId;
//     }


// }

// // Instancier le service
// const userService = new UserService();

// // Exporter le service
// module.exports = userService;
