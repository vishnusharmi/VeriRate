const { DataTypes, JSONB } = require("sequelize");
const database = require("../Config/DBconnection");
const Company = require("../Models/companies");
const User = require("./user");
const crypto = require("../utils/cryptoUtils"); // Utility for encryption/decryption

const Employee = database.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Company,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue("first_name", crypto.encrypt(value));
      },
      get() {
        return crypto.decrypt(this.getDataValue("first_name"));
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue("last_name", crypto.encrypt(value));
      },
      get() {
        return crypto.decrypt(this.getDataValue("last_name"));
      },
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateOfJoin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue("phone_number", crypto.encrypt(value));
        }
      },
      get() {
        const encryptedValue = this.getDataValue("phone_number");
        return encryptedValue ? crypto.decrypt(encryptedValue) : null;
      },
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    panCard: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue("panCard", crypto.encrypt(value)); // Corrected to "panCard"
        }
      },
      get() {
        const encryptedValue = this.getDataValue("panCard"); // Corrected to "panCard"
        return encryptedValue ? crypto.decrypt(encryptedValue) : null;
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    aadharCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IFSCcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_verified: {
      // type: DataTypes.BOOLEAN,
      type: DataTypes.ENUM("Pending","Verified"),
      allowNull: true,
      defaultValue: "Pending",
    },

  
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    employment_history: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },

    //
    employee_type: {
      type: DataTypes.ENUM("Internship", "Part-time", "Full-time"),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Female", "Male", "Others"),
      allowNull: true,
    },
    pf_account: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father_or_husband_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UPI_Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },

  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
