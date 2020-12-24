//imports model
const Subcategory = require('../models/subcategory.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted, populated and paginated search
  Subcategory.find()
  .populate("category")
  .sort({name: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Subcategory.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Subcategories fetched successfully",
      subcategories: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item populated, based on its id
exports.getOne = (req, res, next)=> {
  Subcategory.findById(req.params.id).populate("category").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Subcategory not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next) => {
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.category._id
  });
  //saves the data
  subcategory.save().then(created=>{
    res.status(201).json({
      msg: 'New Subcategory added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=> {
  const subcategory = new Subcategory({
    _id: req.body.id,
    name: req.body.name,
    category: req.body.category._id
  })
  //updates the data
  Subcategory.updateOne({_id: req.params.id}, subcategory).then(result=>{
    res.status(200).json({msg: "Subcategory updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Subcategory.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Subcategory deleted"});
  });
}
