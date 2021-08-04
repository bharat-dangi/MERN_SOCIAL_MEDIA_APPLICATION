const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

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

    //Creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    //Put token in cookie
    res.cookie("token", token);

    //send response to frontend
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        followers: user.followers,
        followings: user.followings,
        isAdmin: user.isAdmin,
        username: user.username,
        email: user.email,
        city: user.city,
        from: user.from,
        desc: user.desc,
        relationship: user.relationship,
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).json(error.message);
  }
};

//Logout
exports.logOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User signout successfully",
  });
};

//Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.json(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === false) {
    return res.status(403).json({
      error: "YOU ARE NOT ADMIN",
    });
  }
  next();
};
