const Users = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cv = require('../models/cv');
const secret = process.env.SECRET;
const saltRounds = 10;
hashedPassword = ""

exports.getusers = async (req, res) => {
    try {
        const users = await Users.find({ _id: res.locals.currentObject._id });
        return res.status(200).json(users)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
exports.getsearch = async (req, res) => {
    try {
        const users = await Users.find(req.query.name);
        return res.status(200).json(users)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

exports.SignUp = async (req, res) => {
    try {
      const isUser = await Users.findOne({ name: req.body.name });
      const isUser1 = await Users.findOne({ password: req.body.password });
  
      if (!isUser && !isUser1) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hashedPassword);
        const createUser = await Users.create({
          name: req.body.name,
          password: hashedPassword,
        });
        const token = jwt.sign({ _id: createUser._id, name: createUser.name }, "1234");
        return res.status(200).json({ user: createUser, token });
      }
  
      return res.status(400).json("Try another");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

exports.Login = async (req, res) => {
    try {
        const isUser = await Users.findOne({ name: req.body.name })
        if (!isUser) {
            return res.status(400).json("User not found")
        }
        const isMatch = await bcrypt.compare(req.body.password, isUser.password)
        if (isMatch) {
            const { _id, name } = isUser
            const token = jwt.sign({ _id, name }, "1234")
            return res.status(200).json(token)
        }
        return res.status(400).json("Wrong password")
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

exports.translateToken = async (req, res) => {
    try {
        const token = req.body.token
        console.log(token);
        const username = jwt.verify(token, "1234")
        console.log(username);

        const UserData = await Users.findOne({ name: username.name }).populate("cvInfo")
        return res.status(200).json(UserData)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }

}
