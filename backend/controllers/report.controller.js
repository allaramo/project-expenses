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
    console.log("1");
    let project = "";
    let phase = "";
    let totalByPhase = 0;
    let totalByProject = 0;
    let i = -1;
    let j = -1;
    for(let pro of docs){
      console.log("2");
      //if it finds a new project
      if(pro.project._id != project){
        console.log("3");
        i += 1;
        j = -1;
        project = pro.project._id;
        //reinitializes accumulator for project and counts expenses for that project
        totalByProject = 0;
        for(let all of docs){
          console.log("4");
          if(all.project._id==pro.project._id) {
            console.log("5");
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
          console.log("6");
          //if it finds a new phase
          if(pha.project._id==pro.project._id && pha.phase._id != phase){
            console.log("7");
            j += 1;
            phase = pha.phase._id;
            //reinitializes accumulator for phase and counts expenses for that phase
            totalByPhase = 0;
            for(let all of docs){
              console.log("8");
              if(all.project._id==pro.project._id && all.phase._id==pha.phase._id) {
                console.log("9");
                totalByPhase += all.total;
              }
            }
            //pushes a new phase
            report[i]["phases"].push(
              {
                order: pha.projectPhase.order,
                phase: pha.phase.description,
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
              console.log("10");
              //if it finds a new phase
              if(exp.project._id==pro.project._id && exp.phase._id == pha.phase._id){
                console.log("11");
                report[i]["phases"][j]["expenses"].push(
                  {
                    date: new Date(exp.date).toDateString(),
                    category: exp.category.name,
                    subcategory: exp.subcategory.name,
                    user: exp.user.email,
                    total: new Intl.NumberFormat('en-IE',{style: 'currency', currency: 'EUR'}).format(exp.total),
                    spent: ((exp.total / (pha.project.budget * (pha.projectPhase.percentage/100))) *100).toFixed(2) + "%"
                  }
                )
              }
            }
          }
        }
      }
    }
    console.log("12");
    res.status(200).json({
      msg: "Report fetched successfully",
      report: report
    });
  })
}
