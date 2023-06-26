const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let { insertUser, findEmail } = require("../model/user");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

let userController = {
  registerUser: async (req, res) => {
    let { fullname_user, email_user, password_user, role_user } = req.body;
    const { rowCount } = await findEmail(email_user);
    if (rowCount) {
      return res.json({ message: "Email Already Taken" });
    }
    const passwordHash_user = bcrypt.hashSync(password_user);
    const id_user = uuidv4();

    const data = {
      id_user,
      email_user,
      passwordHash_user,
      fullname_user,
      role_user,
    };
    insertUser(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create User Success")
      )
      .catch((err) => res.send(err));
  },
  loginUser: async (req, res) => {
    const { email_user, password_user } = req.body;
    const {
      rows: [user],
    } = await findEmail(email_user);
    if (!user) {
      return res.json({ message: "Email Wrong" });
    }
    const isValidPassword = bcrypt.compareSync(
      password_user,
      user.password_user
    );
    if (!isValidPassword) {
      return res.json({ message: "Password Wrong" });
    }
    delete user.password_user;
    const payload = {
      email_user: user.email_user,
      role_user: user.role_user,
    };
    user.token_user = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, user, 201, "Login Successfuly");
  },

  profileUser: async (req, res) => {
    const email_user = req.payload.email_user;
    const {
      rows: [user],
    } = await findEmail(email_user);
    delete user.password_user;
    commonHelper.response(res, user, 200);
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email_user: decoded.email_user,
      role_user: decoded.role_user,
    };
    const result = {
      token_user: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = userController;
