// const { DataTypes } = require("sequelize");
// const sequelize = require("../Config/DBconnection");
// const User = require("./user");

// const AdminSettings = sequelize.define(
//   "AdminSettings",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     superAdminId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     adminId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     accessControl: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     complianceCheck: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     blacklistControl: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     twoFactorAuth: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     systemMonitoring: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     performanceTracking: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = AdminSettings;



const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");
const User = require("./user");

const AdminSettings = sequelize.define(
  "AdminSettings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    superAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    accessControl: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    complianceCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blacklistControl: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorAuth: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    systemMonitoring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    performanceTracking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AdminSettings;
