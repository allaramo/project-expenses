//imports model
const Phase = require('../models/phase.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted and paginated search
  Phase.find()
  .sort({description: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Phase.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Phases fetched successfully",
      phases: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item based on its id
exports.getOne = (req, res, next)=>{
  Phase.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Phase not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next)=>{
  const phase = new Phase({
    description: req.body.description
  });
  //saves the data
  phase.save().then(created=>{
    res.status(201).json({
      msg: 'New Phase added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=>{
  const phase = new Phase({
    _id: req.body.id,
    description: req.body.description
  })
  Phase.updateOne({_id: req.params.id}, phase).then(result=>{
    res.status(200).json({msg: "Phase updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Phase.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Phase deleted"});
  });
}
