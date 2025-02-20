const database = require('../Config/DBconnection');
const loginSevices = require('../Services/loginServices')



exports.login = async (req,res) => {
  const loginData = req.body
  try {
  const loginData = req.body
    const {statusCode,message} = await loginSevices.validateLogin(loginData);
    res.status(statusCode).json({
      message
    })


  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}