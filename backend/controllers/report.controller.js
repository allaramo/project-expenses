//imports model
const Expense = require('../models/expense.model');

//retrieves the report
exports.getReport = (req, res, next) => {
  let report = [];
  Expense
  .find()
  .populate("category subcategory project phase user projectPhase")
  .sort({project: 1, phase: 1, date: 1})
  .then(docs => {
    let project = "";
    let phase = "";
    let totalByPhase = 0;
    let totalByProject = 0;
    let i = -1;
    let j = -1;
    for(let pro of docs){
      //if it finds a new project
      if(pro.project._id != project){
        i += 1;
        j = -1;
        project = pro.project._id;
        //reinitializes accumulator for project and counts expenses for that project
        totalByProject = 0;
        for(let all of docs){
          if(all.project._id==pro.project._id) {
            totalByProject += all.total;
          }
        }
        //pushes a new project
        report.push(
          {
            project: pro.project.name,
            description: pro.project.description,
            status: pro.project.status,
            budget: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format(pro.project.budget),
            total: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format(totalByProject),
            spent: ((totalByProject / pro.project.budget) *100).toFixed(2) + "%",
            phases: []
          }
        );

        //starts looking phases of the project
        for(let pha of docs){
          //if it finds a new phase
          if(pha.project._id==pro.project._id && pha.phase._id != phase){
            j += 1;
            phase = pha.phase._id;
            //reinitializes accumulator for phase and counts expenses for that phase
            totalByPhase = 0;
            for(let all of docs){
              if(all.project._id==pro.project._id && all.phase._id==pha.phase._id) {
                totalByPhase += all.total;
              }
            }
            //pushes a new phase
            report[i]["phases"].push(
              {
                order: pha.projectPhase.order,
                name: pha.phase.description,
                status: pha.projectPhase.status,
                percentage: pha.projectPhase.percentage + "%",
                budget: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format((pha.project.budget * (pha.projectPhase.percentage/100))),
                total: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format(totalByPhase),
                spent: ((totalByPhase / (pha.project.budget * (pha.projectPhase.percentage/100))) *100).toFixed(2) + "%",
                expenses : []
              }
            );

            //starts looking expenses of the project
            for(let exp of docs){
              //if it finds a new phase
              if(exp.project._id==pro.project._id && exp.phase._id == pha.phase._id){
                report[i]["phases"][j]["expenses"].push(
                  {
                    date: new Date(exp.date).toDateString(),
                    category: exp.category.name,
                    subcategory: exp.subcategory.name,
                    user: exp.user.email,
                    total: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format(exp.total),
                    spent: ((exp.total / totalByPhase) *100).toFixed(2) + "%"
                  }
                )
              }
            }
          }
        }
      }
    }
    res.status(200).json({
      msg: "Report fetched successfully",
      results: report
    });
  })
}
