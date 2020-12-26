//imports model
const Project = require('../models/project.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted and paginated search
  Project.find()
  .sort({name: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Project.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Projects fetched successfully",
      projects: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item based on its id
exports.getOne = (req, res, next)=>{
  Project.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Project not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next)=>{
  const project = new Project({
    name: req.body.name,
    budget: req.body.budget,
    description: req.body.description,
    status: req.body.status
  });
  //saves the data
  project.save().then(created=>{
    res.status(201).json({
      msg: 'New Project added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=>{
  const project = new Project({
    _id: req.body.id,
    name: req.body.name,
    budget: req.body.budget,
    description: req.body.description,
    status: req.body.status
  })
  Project.updateOne({_id: req.params.id}, project).then(result=>{
    res.status(200).json({msg: "Project updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Project.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Project deleted"});
  });
}
