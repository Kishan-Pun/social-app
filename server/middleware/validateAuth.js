module.exports.signupValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be at least 6 characters" });
  }

  next();
};

module.exports.loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  next();
};