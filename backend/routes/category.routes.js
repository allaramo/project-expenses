const express = require("express");
const router = express.Router();
const Category = require('../models/category.model');

router.get('', (req, res, next)=>{
  Category.find()
  .then(docs => {
    res.status(200).json({
      msg: "Categories fetched successfully",
      categories: docs
    });
  });
});

router.get('/:id', (req, res, next)=> {
  Category.findById(req.params.id).then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Category not found'});
    }
  })
});

router.post('', (req, res, next) => {
  const category = new Category({
    name: req.body.name
  });
  category.save().then(created=>{
    res.status(201).json({
      msg: 'New Category added', id: created._id
    });
  });
});

router.put('/:id', (req, res, next)=> {
  const category = new Category({
    _id: req.body.id,
    name: req.body.name
  })
  Category.updateOne({_id: req.params.id}, category).then(result=>{
    res.status(200).json({msg: "Category updated"});
  });
});

router.delete('/:id', (req, res, next)=>{
  Category.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Category deleted"});
  });
});

module.exports = router;
