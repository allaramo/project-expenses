const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Permission = require('../models/permission.model');
const Route = require('../models/route.model');

module.exports = (req, res, next) => {
  //gets the current route
  const currentPath = req.baseUrl;
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.TOKEN).userId;

  let access = false;
  User.findById(userId).then(usr =>{
    Route.findOne({path: currentPath}).then(rou=>{
      Permission.findOne({role: usr.role, route: rou}).then(prm=>{
        //if it finds a specific permission checks its status
        if(prm){
          //if the permission is true (no matter if there is an /all route, it will do as the permission states)
          if(prm.status){
            //allows access if it is true
            //console.log('it has specific true access' + currentPath);
            access = true;
            next();
          }
        }
        if(!access){
          //if it doesn't finds an specific permission checks in general an /all route
          Route.findOne({path: "/all"}).then(rte=>{

            Permission.findOne({role: usr.role, route: rte}).then(per=>{
              //if it finds the /all route
              if(per){
                //if the /all is true and there is no specific permission set to false then allows access
                if(per.status==true && prm==null){
                  //console.log('it has all access without specific false access' + currentPath);
                  access = true;
                  next();
                }
              }
              if(!access){
                //console.log("--403--" + currentPath);
                res.status(403).json({
                  msg: "Access Forbidden"
                });
              }
            });
          })
        }
      })
    })
  })
}
