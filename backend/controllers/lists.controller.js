//imports model
const Project = require('../models/project.model');
const ProjectPhase = require('../models/project-phase.model');
const Category = require('../models/category.model');
const Subcategory = require('../models/subcategory.model');
const User = require('../models/user.model');

//retrieves all Projects
exports.getProjects = (req, res, next)=>{
  Project.find({status: "wip"})
  .sort({name: 1})
  .then(docs => {
      res.status(200).json({
      msg: "Projects fetched successfully",
      projects: docs
    });
  });
}

//retrieves all Phases
exports.getProjectPhases = (req, res, next)=>{
  ProjectPhase.find({status: "wip"}).populate("phase project")
  .sort({order: 1})
  .then(docs => {
      res.status(200).json({
      msg: "Phases fetched successfully",
      projectPhases: docs
    });
  });
}

//retrieves all Categories
exports.getCategories = (req, res, next)=>{
  Category.find()
  .sort({name: 1})
  .then(docs => {
      res.status(200).json({
      msg: "Categories fetched successfully",
      categories: docs
    });
  });
}

//retrieves all Subcategories
exports.getSubcategories = (req, res, next)=>{
  Subcategory.find().populate("category")
  .sort({name: 1})
  .then(docs => {
      res.status(200).json({
      msg: "Subcategories fetched successfully",
      subcategories: docs
    });
  });
}

//retrieves all Users
exports.getUsers = (req, res, next)=>{
  User.find({status: true})
  .sort({email: 1})
  .then(docs => {
      res.status(200).json({
      msg: "Users fetched successfully",
      users: docs
    });
  });
}
