const sequelize = require("../Config/DBconnection");
const { DataTypes } = require("sequelize");
const User = require("./user");

const UserTracking = sequelize.define("UserTracking", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: User,
          key: "id",
        },
    },
    ip: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    browser: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    os: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    device: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    referrer: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    latitude: { 
        type: DataTypes.FLOAT, 
        allowNull: true 
    },
    longitude: { 
        type: DataTypes.FLOAT, 
        allowNull: true 
    },
    language: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    isBot: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    pagesVisited: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, { 
    timestamps: true, // Enables createdAt & updatedAt fields
});
// Define the relationship
// User.hasMany(UserTracking, { foreignKey: "userId", onDelete: "CASCADE" });
// UserTracking.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = UserTracking;
