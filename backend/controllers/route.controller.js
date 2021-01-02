//imports model
const Route = require('../models/route.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted and paginated search
  Route.find()
  .sort({path: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Route.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Routes fetched successfully",
      routes: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item based on its id
exports.getOne = (req, res, next)=>{
  Route.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Route not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next)=>{
  const route = new Route({
    path: req.body.path
  });
  //saves the data
  route.save().then(created=>{
    res.status(201).json({
      msg: 'New Route added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=>{
  const route = new Route({
    _id: req.body.id,
    path: req.body.path
  })
  Route.updateOne({_id: req.params.id}, route).then(result=>{
    res.status(200).json({msg: "Route updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Route.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Route deleted"});
  });
}
