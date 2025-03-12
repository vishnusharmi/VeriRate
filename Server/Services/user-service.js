const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const employeeModel = require("../Models/EmployeeModel");
const logActivity = require("../Activity/activityFunction");
const AdminSettings = require("../Models/adminSettings");
const User = require("../Models/user");
const Company = require("../Models/companies");

const bcrypt = require("bcryptjs");

exports.registerUser = async (adminId, data, files) => {
  const transaction = await userModel.sequelize.transaction();
  try {
    console.log("Received data:", data); // Add this line to log the received data

    if (!data.email || !data.password || !data.role) {
      throw new Error("Missing required fields");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user inside transaction
    const userData = await userModel.create(
      {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        username: !data.username
          ? `${data.first_name} ${data.last_name} `
          : data.username,
      },
      { transaction }
    );

    let additionalData = null;

    if (data.role === "Employee" || data.role === "Employee Admin") {
      // Create employee entry inside transaction
      additionalData = await employeeModel.create(
        {
          userId: userData.id,
          company_id: data.company_id,
          first_name: data.first_name,
          last_name: data.last_name,
          salary: data.salary,
          dateOfBirth: data.dateOfBirth,
          dateOfJoin: data.dateOfJoin,
          phone_number: data.phone_number,
          qualification: data.qualification,
          address: data.address,
          panCard: data.panCard,
          aadharCard: data.aadharCard,
          bankAccount: data.bankAccount,
          bankName: data.bankName,
          IFSCcode: data.IFSCcode,
          position: data.position,
          department: data.department,
          employment_history: data.employment_history,
          employee_type: data.employee_type,
          gender: data.gender,
          pf_account: data.pf_account,
          father_or_husband_name: data.father_or_husband_name,
          permanent_address: data.permanent_address,
          current_address: data.current_address,
          UPI_Id: data.UPI_Id,
          created_by: adminId,
        },
        { transaction }
      );

      if (data.role === "Employee Admin") {
        try {
          const superAdminInfo = await userModel.findByPk(adminId);
          if (!superAdminInfo) {
            throw new Error("Super Admin not found");
          }
          if (superAdminInfo.role !== "Super Admin") {
            throw new Error("Only Super Admin can create Employee Admin");
          }

          await AdminSettings.create(
            {
              adminId: userData.id,
              superAdminId: adminId,
              accessControl: false,
              complianceCheck: true,
              blacklistControl: false,
              twoFactorAuth: false,
              systemMonitoring: true,
              performanceTracking: true,
            },
            { transaction }
          );
        } catch (error) {
          throw error;
        }
      }
    }

    let documentResponses = [];

    if (files && Array.isArray(files)) {
      for (const file of files) {
        if (file.path) {
          const document = await Documents.create({
            empId: userData.id,
            documentType: file.mimetype,
            file_path: file.path,
          });

          documentResponses.push(document);
        }
      }
    } else if (files && files.path) {
      const document = await Documents.create({
        empId: userData.id,
        documentType: files.mimetype,
        file_path: files.path,
      });

      documentResponses.push(document);
    }

    await logActivity({
      userId: userData.id,
      action: `New ${data.role || "Employee"} created`,
      details: userData.username,
      type: "User",
      entity: "User Management",
      entityId: userData.id,
    });

    await transaction.commit();

    return {
      message: "User created successfully",
      data: {
        user: userData,
        additionalData,
        document: documentResponses,
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


exports.getAllusers = async (page, pageSize, tokenId) => {
  page = page || 1;
  pageSize = pageSize || 10;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  try {
    const { count, rows } = await userModel.findAndCountAll({
      include: [
        Documents,
        {
          model: employeeModel,
          required: true,
          where: { created_by: tokenId },
          include: [
            {
              model: Company,
              attributes: ["companyName"],
            },
          ],
        },
      ],
      limit,
      offset,
      order: [["id", "DESC"]],
    });
    return {
      totalRecords: count, // Total number of records
      totalPages: Math.ceil(count / pageSize), // Total pages
      currentPage: page,
      pageSize: pageSize,
      data: rows, // Current page data
    };
  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error", error: error.message };
  }
};

exports.getUserbyid = async (id) => {
  try {
    const getuser = await userModel.findByPk(id, {
      include: [Documents, employeeModel, companyModel],
    });
    if (!getuser) {
      return { message: "User not found" };
    }
    return { data: getuser };
  } catch (error) {
    return { message: "Internal Server Error", error: error.message };
  }
};

// exports.updateUserById = async (id, data, documentPath) => {

//   try {
//     if (!id) {
//       throw new Error("User ID is missing");
//     }

//     // Fetch the user with associated Employee data
//     const getuser = await userModel.findByPk(id, {
//       include: [
//         {
//           model: Documents,
//         },
//         {
//           model: employeeModel,
//         },
//       ],
//     });

//     if (!getuser) {
//       throw new Error("User not found");
//     }

//     // Update User data
//     const [rowsUpdated] = await userModel.update(data, { where: { id } });

//     if (rowsUpdated === 0) {
//       throw new Error("User update failed");
//     }

//     // Update Employee data if it exists
//     if (getuser.Employee && data.Employee) {
//       const employeeId = getuser.Employee.id;
//       await employeeModel.update(data.Employee, { where: { id: employeeId } });
//     }

//     // Fetch updated user data
//     const updatedUser = await userModel.findByPk(id, {
//       include: [{ model: Documents }, { model: employeeModel }],
//     });

//     return updatedUser;
//   } catch (error) {
//     console.error("Error in updateUserById:", error); // Debug log
//     throw error;
//   }
// };



exports.updateUserById = async (id, data, documentPath) => {
  console.log(data, '*************************88');
  try {
    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,

        },
        {
          model: employeeModel
        }
      ],
    });

    console.log(getuser.Employee.id, 'get users');


    if (!getuser) {
      throw new Error("User not found");
    }

    if (getuser.Documents) {

      let docId = getuser.Documents[0].id;

      if (documentPath) {
        await Documents.update(
          { file_path: documentPath },
          { where: { id: docId } }
        );
      }
    };

    if (getuser.Employee) {
      let id = getuser.Employee.id
      console.log(id, 'idddddddddd');
      await employeeModel.update(data, { where: { id } })

    }



    const [rowsUpdated] = await userModel.update(data, { where: { id } });

    if (rowsUpdated === 0) {
      throw new Error("User update failed");
    }
    const updatedUser = await userModel.findByPk(id, {
      include: [{ model: Documents }, { model: employeeModel }],
    });
    // console.log(docResponse, "responss");

    await logActivity(
      this.updateUserById.id,
      `${this.updateUserById.role || "User"} updated`,
      `${this.updateUserById.username ||
      `${updatedUser.first_name || ""} ${updatedUser.last_name || ""}`.trim()
      }`,
      "User",
      "User Management"
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};


exports.deleteUser = async (id) => {
  try {
    const findUser = await userModel.findByPk(id);
    if (!findUser) {
      throw new Error("User not found");
    }
    const deletedUser = await userModel.destroy({ where: { id } });

    // log Activity
    await logActivity({
      userId: findUser.id,
      action: `New ${findUser.role || "User"} Updated`,
      details: findUser.username,
      type: "User",
      entity: "User Management",
      entityId: findUser.id,
    });
    return deletedUser;
  } catch (error) {
    throw error;
  }
};


exports.getEmployeeAdmins = async () => {
  try {
    const employeeAdmins = await userModel.findAll({
      where: { role: "Employee Admin" },
    });
    return employeeAdmins;
  } catch (error) {
    throw new Error("Failed to fetch Employee Admins");
  }
};

// employer data with his employees
exports.getEmployerbyid = async (id) => {
  try {
    // Fetch user details with related models
    const getEmployer = await userModel.findByPk(id, {
      attributes: ["id", "email", "username", "isActive"],
      include: [
        {
          model: Documents,
        },
        {
          model: employeeModel,
        },
      ],
    });

    if (!getEmployer) {
      return { message: "User not found" };
    }

    // Fetch employees created by this user
    const createdEmployees = await employeeModel.findAll({
      attributes: ["id", "phone_number", "dateOfJoin", "qualification", "position"],
      include: [{
        model: User,
        attributes: ["id", "username", "email"],
      },],
      where: { created_by: id },
    });

    return {
      userData: getEmployer,
      createdEmployees: createdEmployees, // Employees this user created
    };
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return { message: "Internal Server Error", error: error.message };
  }
};