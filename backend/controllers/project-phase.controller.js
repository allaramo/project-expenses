//imports model
const ProjectPhase = require('../models/project-phase.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted, populated and paginated search
  ProjectPhase.find()
  .populate("project phase")
  .sort({project: 1, order: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return ProjectPhase.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Project Phases fetched successfully",
      projectPhases: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item populated, based on its id
exports.getOne = (req, res, next)=> {
  ProjectPhase.findById(req.params.id).populate("project phase").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Projects Phase not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next) => {
  const projectPhase = new ProjectPhase({
    project: req.body.project._id,
    phase: req.body.phase._id,
    percentage: req.body.percentage,
    status: req.body.status,
    order: req.body.order
  });
  //saves the data
  projectPhase.save().then(created=>{
    res.status(201).json({
      msg: 'New Project Phase added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=> {
  const projectPhase = new ProjectPhase({
    _id: req.body.id,
    project: req.body.project._id,
    phase: req.body.phase._id,
    percentage: req.body.percentage,
    status: req.body.status,
    order: req.body.order
  })
  //updates the data
  ProjectPhase.updateOne({_id: req.params.id}, projectPhase).then(result=>{
    res.status(200).json({msg: "Project Phase updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  ProjectPhase.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Project Phase deleted"});
  });
}
