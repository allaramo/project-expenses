//imports model
const Category = require('../models/category.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted and paginated search
  Category.find()
  .sort({name: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Category.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Categories fetched successfully",
      categories: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item based on its id
exports.getOne = (req, res, next)=>{
  Category.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Category not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next)=>{
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  });
  //saves the data
  category.save().then(created=>{
    res.status(201).json({
      msg: 'New Category added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=>{
  const category = new Category({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description
  })
  Category.updateOne({_id: req.params.id}, category).then(result=>{
    res.status(200).json({msg: "Category updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Category.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Category deleted"});
  });
}
