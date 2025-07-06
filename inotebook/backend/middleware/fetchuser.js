var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next)=> {
// get the user from the jwt token and add id to req object
const token = req.header('auth-token');
if(!token) {
return res.status(401).json({msg: 'No token, authorization denied'});
}
try{
const data = jwt.verify(token, JWT_SECRET);
req.user = data.user;
next();
}

catch(err){
return res.status(403).json({msg: 'Token is not valid'});
}
}
module.exports = fetchuser;