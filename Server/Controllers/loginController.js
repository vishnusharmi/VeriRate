const database = require('../Config/DBconnection');
const loginSevices = require('../Services/loginServices')



exports.login = async (req,res) => {
  const {email , password} = req.body
  try {
    const {statusCode,message} = await loginSevices.validateLogin({email,password});
    res.status(statusCode).json({
      message
    })


  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}