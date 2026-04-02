const { signup, login } = require("../services/authService");

// SIGNUP CONTROLLER
exports.signupController = async (req, res) => {
  try {
    const result = await signup(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// LOGIN CONTROLLER
exports.loginController = async (req, res) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};