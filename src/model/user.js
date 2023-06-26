const Pool = require("../config/db");

const insertUser = (data) => {
  const { id_user, email_user, passwordHash_user, fullname_user, role_user } =
    data;
  return Pool.query(`INSERT INTO users(id_user, email_user, password_user, fullname_user, role_user) 
    VALUES ('${id_user}','${email_user}','${passwordHash_user}','${fullname_user}','${role_user}')`);
};

const findEmail = (email_user) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email_user= '${email_user}' `,
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
  findEmail,
};
