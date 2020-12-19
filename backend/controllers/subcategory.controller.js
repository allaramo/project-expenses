const Subcategory = require('../models/subcategory.model');

exports.getAll = (req, res, next)=>{
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  let fetchedDocs;
  Subcategory.find()
  .populate("category")
  .sort({name: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    return Subcategory.countDocuments();
  })
  .then(count=>{
    res.status(200).json({
      msg: "Categories fetched successfully",
      subcategories: fetchedDocs,
      count: count
    });
  });
}

exports.getOne = (req, res, next)=> {
  Subcategory.findById(req.params.id).populate("category").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Subcategory not found'});
    }
  })
}

exports.add = (req, res, next) => {
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.category._id
  });
  subcategory.save().then(created=>{
    res.status(201).json({
      msg: 'New Subcategory added', id: created._id
    });
  });
}

exports.update = (req, res, next)=> {
  const subcategory = new Subcategory({
    _id: req.body.id,
    name: req.body.name,
    category: req.body.category._id
  })
  Subcategory.updateOne({_id: req.params.id}, subcategory).then(result=>{
    res.status(200).json({msg: "Subcategory updated"});
  });
}

exports.delete = (req, res, next)=>{
  Subcategory.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Subcategory deleted"});
  });
}
