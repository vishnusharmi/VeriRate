const blackList = require("../Models/blackList-model")

//create
exports.createBlackList = async (data)=>{
    try {
        const user = await blackList.create(data)
        return user
    } catch (error) {
        console.error("Error occured",error.message);
    }
}

//read
exports.readBlackList = async (id)=>{
    try {
        const user = await blackList.findByPk(id)
        if (!user){
            return 'Id not available'
        }
        return user
    } catch (error) {
        console.error("Error occured" , error.message);
        
    }
}

//read all
exports.readAllBlackList = async ()=>{
    try {
        const users = await blackList.findAll({})
        // if (!user){
        //     return 'Id not available'
        // }
        return users
    } catch (error) {
        console.error("Error occured" , error.message);
        
    }
}

//update
exports.updateBlackList = async (id, data)=>{
    try {
        // const user = await blackList.findByPk(id)
        // if (!user){
        //     return 'User id not available'
        // }

        const updateUser = await blackList.update(data,{where : {id}})
        return updateUser
    } catch (error) {
        console.error("Error occured" , error.message);
        
    }
}

//delete
exports.deleteBlackList = async (id)=>{
    try {
        // const user = await blackList.findByPk(id)
        // if (!user){
        //     return new Promise((_, reject) => reject({message: "User not found!"}))
        // }

        const deletedUser = await blackList.destroy({where : {id}})
        return deletedUser
    } catch (error) {
        console.error("Error occured" , error.message);
        
    }
}