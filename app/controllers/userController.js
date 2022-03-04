const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.users;
const userController = {
  async register(req, res, next) {
    
    const payload = req.body;

    const { username, email, rollNumber, password } = req.body;
    // console.log(email)
    // const user = await User.findOne({ email:email });

    // console.log(user)


    // if(user){
    //   return next(error);
    // }
    payload.password = await bcrypt.hash(password, 10);
    // let access_token;
    try {
      const user = await User.create({
        ...payload,
      });
      res
        .status(200)
        .json({ msg: "Register Successfully", user: user.dataValues });
    } catch (error) {
res.status(500).json(error);
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
       res.json("user not found");
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
       res.json("password not match");  
      }
      res.status(200).json({ msg: "Login successfully"});
    } catch (error) {
      return next(error);
    }
  },

  async updatedUser(req, res, next) {
    const users = await User.findById(req.params.id);
    try {
      if (users) {
        users.username = req.body.username || users.username;
        users.email = req.body.email || users.email;
        users.rollNumber = req.body.rollNumber || users.rollNumber;

        if (req.body.password) {
          users.password = await bcrypt.hash(req.body.password, 10);
        }
      const user = await users.save();
      res.status(200).send({ msg: "Updated successfully",user });
      }
    } catch (error) {
  res.send(error);
    }
  },


  async showUser(req, res, next) {
try {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
} catch (error) {
  res.send(error);
}
  },


  async showAllUser(req, res, next) {
    try {
      const users = await User.find({});
      console.log(users.email);
      res.send(users);
    } catch (error) {
    res.send(error);
    }
  },

  async DeleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
    if (user) {
      if (user.roles === 'admin'||user.roles === 'Admin') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
    } catch (error) {
res.send(error);
    }
  },
};

module.exports = userController;
