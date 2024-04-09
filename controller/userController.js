const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
const userResistration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameExist = await userModel.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed" });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      // If user does not exist with the provided username
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // If the password provided does not match the user's password
      return res.status(401).json({ error: "Incorrect password" });
    }

    // If username and password are correct, generate JWT token
    const token = jwt.sign({ userId: user._id }, "jwt-secrete-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  userResistration,
  loginUser,
};
