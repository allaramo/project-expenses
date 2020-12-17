const express = require("express");
const router = express.Router();
const Subcategory = require('../models/subcategory.model');
const Category = require('../models/category.model');

router.get('', (req, res, next)=>{
  Subcategory.find()
  .populate("category")
  .sort({name: 1})
  .then(docs => {
    Category.find().sort({name: 1}).then(cats => {
      res.status(200).json({
        msg: "Categories fetched successfully",
        subcategories: docs,
        categories: cats
      });
    });
  });
});

router.get('/:id', (req, res, next)=> {
  Subcategory.findById(req.params.id).populate("category").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Subcategory not found'});
    }
  })
});

router.post('', (req, res, next) => {
  const subcategory = new Subcategory({
    name: req.body.name,
    category: req.body.category._id
  });
  subcategory.save().then(created=>{
    res.status(201).json({
      msg: 'New Subcategory added', id: created._id
    });
  });
});

router.put('/:id', (req, res, next)=> {
  const subcategory = new Subcategory({
    _id: req.body.id,
    name: req.body.name,
    category: req.body.category._id
  })
  Subcategory.updateOne({_id: req.params.id}, subcategory).then(result=>{
    res.status(200).json({msg: "Subcategory updated"});
  });
});

router.delete('/:id', (req, res, next)=>{
  Subcategory.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Subcategory deleted"});
  });
});

module.exports = router;
