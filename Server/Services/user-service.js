// const userModel = require("../Models/user");
// const Documents = require("../Models/documents");
// const employeeModel = require("../Models/EmployeeModel");
// const logActivity = require("../Activity/activityFunction");
// const AdminSettings = require("../Models/adminSettings");

// const bcrypt = require("bcryptjs");

// exports.registerUser = async (adminId, data, files) => {
//   const transaction = await userModel.sequelize.transaction();
//   try {
//     if (!data.email || !data.password || !data.role) {
//       throw new Error("Missing required fields");
//     }

//     // Check if user already exists
//     const existingUser = await userModel.findOne({
//       where: { email: data.email },
//     });

//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     // Create user inside transaction
//     const userData = await userModel.create(
//       {
//         email: data.email,
//         password: hashedPassword,
//         role: data.role,
//         username: !data.username
//           ? `${data.first_name} ${data.last_name} `
//           : data.username,
//       },
//       { transaction }
//     );

//     let additionalData = null;

//     if (data.role === "Employee" || data.role === "Employee Admin") {
//       // Create employee entry inside transaction
//       additionalData = await employeeModel.create(
//         {
//           userId: userData.id,
//           company_id: data.company_id,
//           first_name: data.first_name,
//           last_name: data.last_name,
//           salary: data.salary,
//           dateOfBirth: data.dateOfBirth,
//           dateOfJoin: data.dateOfJoin,
//           phone_number: data.phone_number,
//           qualification: data.qualification,
//           address: data.address,
//           panCard: data.panCard,
//           aadharCard: data.aadharCard,
//           bankAccount: data.bankAccount,
//           bankName: data.bankName,
//           IFSCcode: data.IFSCcode,
//           position: data.position,
//           department: data.department,
//           employment_history: data.employment_history,
//           employee_type: data.employee_type,
//           gender: data.gender,
//           pf_account: data.pf_account,
//           father_or_husband_name: data.father_or_husband_name,
//           permanent_address: data.permanent_address,
//           current_address: data.current_address,
//           UPI_Id: data.UPI_Id,
//           created_by: adminId,
//         },
//         { transaction }
//       );

//       if (data.role === "Employee Admin") {
//         try {
//           const superAdminInfo = await userModel.findByPk(adminId);
//           if (!superAdminInfo) {
//             throw new Error("Super Admin not found");
//           }
//           if (superAdminInfo.role !== "Super Admin") {
//             throw new Error("Only Super Admin can create Employee Admin");
//           }

//           await AdminSettings.create(
//             {
//               adminId: userData.id,
//               superAdminId: adminId,
//               accessControl: false,
//               complianceCheck: true,
//               blacklistControl: false,
//               twoFactorAuth: false,
//               systemMonitoring: true,
//               performanceTracking: true,
//             },
//             { transaction }
//           );
//         } catch (error) {
//           throw error;
//         }
//       }
//     }

//     let documentResponses = [];

//     if (files && Array.isArray(files)) {
//       for (const file of files) {
//         if (file.path) {
//           const document = await Documents.create({
//             empId: userData.id,
//             documentType: file.mimetype,
//             file_path: file.path,
//           });

//           documentResponses.push(document);
//         }
//       }
//     } else if (files && files.path) {
//       const document = await Documents.create({
//         empId: userData.id,
//         documentType: files.mimetype,
//         file_path: files.path,
//       });

//       documentResponses.push(document);
//     }

//     await logActivity({
//       userId: userData.id,
//       action: `New ${data.role || "Employee"} created`,
//       details: userData.username,
//       type: "User",
//       entity: "User Management",
//       entityId: userData.id,
//     });

//     await transaction.commit();

//     return {
//       message: "User created successfully",
//       data: {
//         user: userData,
//         additionalData,
//         document: documentResponses,
//       },
//     };
//   } catch (error) {
//     await transaction.rollback();
//     throw error;
//   }
// };




const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const employeeModel = require("../Models/EmployeeModel");
const logActivity = require("../Activity/activityFunction");
const AdminSettings = require("../Models/adminSettings");

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











exports.getAllusers = async () => {
  try {
    const getUsers = await userModel.findAll({
      include: [Documents, employeeModel],
    });
    return { data: getUsers };
  } catch (error) {
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

exports.updateUserById = async (id, data, documentPath) => {
  try {
    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,
        },
        {
          model: employeeModel,
        },
      ],
    });


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
    }

    if (getuser.Employee) {
      let id = getuser.Employee.id;
      await employeeModel.update(data, { where: { id } });
    }

    const [rowsUpdated] = await userModel.update(data, { where: { id } });

    if (rowsUpdated === 0) {
      throw new Error("User update failed");
    }
    const updatedUser = await userModel.findByPk(id, {
      include: [{ model: Documents }, { model: employeeModel }],
    });

    // log Activity
    await logActivity({
      userId: updatedUser.id,
      action: `New ${updatedUser.role || "User"} Updated`,
      details: updatedUser.username,
      type: "User",
      entity: "User Management",
      entityId: updatedUser.id,
    });

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