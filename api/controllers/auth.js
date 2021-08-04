const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER LOGIC
exports.register = async (req, res) => {
  try {
    
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user to the database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//LOGIN LOGIC
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user &&
      res.status(404).json({
        error: "User not found",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword &&
      res.status(400).json({
        error: "User and Password doesnot match.",
      });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
