//imports model
const Expense = require('../models/expense.model');

//retrieves all items
exports.getAll = (req, res, next)=>{
  //used for paginating
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  //used to store the results
  let fetchedDocs;

  //performs a sorted, populated and paginated search
  Expense.find()
  .populate("category subcategory project phase projectphase user")
  .sort({date: 1})
  .skip(pageSize * page - pageSize)
  .limit(pageSize)
  .then(docs => {
    fetchedDocs = docs;
    //counts how many docs are in the collection
    return Expense.countDocuments();
  })
  .then(count=>{
    //returns a json with the data fetched
    res.status(200).json({
      msg: "Expenses fetched successfully",
      expenses: fetchedDocs,
      count: count
    });
  });
}

//retrieves a single item populated, based on its id
exports.getOne = (req, res, next)=> {
  Expense.findById(req.params.id).populate("category subcategory project phase projectphase user").then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({msg: 'Expense not found'});
    }
  })
}

//adds a new item based on model
exports.add = (req, res, next) => {
  const expense = new Expense({
    date: req.body.date,
    total: req.body.total,
    category: req.body.category._id,
    subcategory: req.body.subcategory._id,
    project: req.body.project._id,
    phase: req.body.phase._id,
    //projectPhase: req.body.projectPhase._id,
    user: req.body.user._id
  });
  //saves the data
  expense.save().then(created=>{
    res.status(201).json({
      msg: 'New Expense added', id: created._id
    });
  });
}

//updates the item selected by its id, based on its model
exports.update = (req, res, next)=> {
  const expense = new Expense({
    _id: req.body.id,
    date: req.body.date,
    total: req.body.total,
    category: req.body.category._id,
    subcategory: req.body.subcategory._id,
    project: req.body.project._id,
    phase: req.body.phase._id,
    //projectPhase: req.body.projectPhase._id,
    user: req.body.user._id
  });
  //updates the data
  Expense.updateOne({_id: req.params.id}, expense).then(result=>{
    res.status(200).json({msg: "Expense updated"});
  });
}

//deletes the item selected by its id
exports.delete = (req, res, next)=>{
  //deletes the data
  Expense.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({msg: "Expense deleted"});
  });
}
