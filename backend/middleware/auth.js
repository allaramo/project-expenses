const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //second after Bearer convention
  //using headers to get the token
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN);
    next();
  } catch (error){
    res.status(401).json({
      msg: "Authentication Failed"
    });
  }

}
