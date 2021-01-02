//imports model
const Role = require('../models/role.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted and paginated search
  Role.find()
  .sort({name: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Role.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Roles fetched successfully",
      roles: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item based on its id
exports.getOne = (req, res, next)=>{
  Role.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Role not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next)=>{
  const role = new Role({
    name: req.body.name
  });
  //saves the data
  role.save().then(created=>{
    res.status(201).json({
      msg: 'New Role added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=>{
  const role = new Role({
    _id: req.body.id,
    name: req.body.name
  })
  Role.updateOne({_id: req.params.id}, role).then(result=>{
    res.status(200).json({msg: "Role updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Role.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Role deleted"});
  });
}
