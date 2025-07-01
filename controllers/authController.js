const authService = require("../services/authService");

async function login(req, res) {
  const { email, password } = req.body;

  const result = await authService.authenticateUser(email, password);
  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ token: result.token, user: result.user });
}

async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    const user = await authService.createUser({ email, password, name });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ message: "Failed to register user" });
  }
}

module.exports = {
  login,
  register,
};
