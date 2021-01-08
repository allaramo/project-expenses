//imports model
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signs up an user
exports.signUp = (req, res, next)=>{
  //hashing the password with salt 10
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      role: null,
      status: false,
      logged: false
    });
    //saves the data
    user.save()
    .then(created=>{
      res.status(201).json({
        msg: 'You have been signed up successfully',
        id: created._id,
        error: ''
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error: Sign Up Unsuccessful',
        id: null,
        error: err
      });
    });
  })
}

//logs in an user
exports.login = (req, res, next)=>{
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if(!user) {
      return res.status(401).json({
        msg: "Authentication Failed",
        error: "Wrong Email",
        token: null
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if(!result){
      return res.status(401).json({
        msg: "Authentication Failed",
        error: "Wrong Password",
        token: null
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
       'MIRISTAMIDOPROPILDIMETILAMINA',
       {expiresIn: "1h"}
    );
    res.status(200).json({
      msg: "Authentication Successfully",
      error: '',
      token: token
    })
  })
  .catch(err => {
    return res.status(401).json({
      msg: "Authentication Failed",
      error: err,
      token: null
    });
  });
}

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted, populated and paginated search
  User.find()
  .populate("role")
  .sort({email: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return User.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Users fetched successfully",
      users: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item populated, based on its id
exports.getOne = (req, res, next)=> {
  User.findById(req.params.id).populate("role").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'User not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next) => {
  //hashing the password with salt 10
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      role: req.body.role._id,
      status: req.body.status,
      logged: false
    });
    //saves the data
    user.save()
    .then(created=>{
      res.status(201).json({
        msg: 'New User added', id: created._id
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });;
  })
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=> {
  let pass = null;
  User.findById(req.params.id).populate("role").then(doc => {
    if(doc){
      if(doc.password != req.body.password){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            _id: req.body.id,
            password: hash,
            role: req.body.role._id,
            status: req.body.status
          })
          //updates the data
          User.updateOne({_id: req.params.id}, user).then(result=>{
            res.status(200).json({msg: "User updated"});
          });
        });
      } else {
        const user = new User({
          _id: req.body.id,
          password: req.body.password,
          role: req.body.role._id,
          status: req.body.status
        })
        //updates the data
        User.updateOne({_id: req.params.id}, user).then(result=>{
          res.status(200).json({msg: "User updated"});
        });
      }
    }
  })
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  User.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "User deleted"});
  });
}
