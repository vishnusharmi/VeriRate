const database = require('../Config/DBconnection');
const loginSevices = require('../Services/loginServices')



exports.login = async (req,res) => {
  // const loginData = req.body
  try {
  const loginData = req.body
  console.log(loginData);
  
    const loginUser = await loginSevices.validateLogin(loginData);
    console.log('kasjdnfkjasdf');
    
    res.status(200).json(loginUser)


  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}