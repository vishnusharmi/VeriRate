const {DataTypes}=require("sequelize")
const sequelize =require("../Config/DBconnection")

const AuditLogs=sequelize.define("AuditLogs",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        action_type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        action_details:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
    
)
module.exports=AuditLogs