const Pool = require("../config/db");

const insertUser = (data) => {
  const { id_user, username_user, passwordHash_user } = data;
  return Pool.query(`INSERT INTO users(id_user, username_user, password_user) 
    VALUES ('${id_user}','${username_user}','${passwordHash_user}')`);
};

const findUsername = (username_user) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE username_user= '${username_user}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  insertUser,
  findUsername,
};
