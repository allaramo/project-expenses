//imports model
const Permission = require('../models/permission.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted, populated and paginated search
  Permission.find()
  .populate("role route")
  .sort({role: 1, order: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Permission.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Permissions fetched successfully",
      permissions: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item populated, based on its id
exports.getOne = (req, res, next)=> {
  Permission.findById(req.params.id).populate("role route").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Permission not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next) => {
  const permission = new Permission({
    role: req.body.role._id,
    route: req.body.route._id,
    status: req.body.status
  });
  //saves the data
  permission.save().then(created=>{
    res.status(201).json({
      msg: 'New Permission added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=> {
  const permission = new Permission({
    _id: req.body.id,
    role: req.body.role._id,
    route: req.body.route._id,
    status: req.body.status
  })
  //updates the data
  Permission.updateOne({_id: req.params.id}, permission).then(result=>{
    res.status(200).json({msg: "Permission updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Permission.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Permission deleted"});
  });
}
