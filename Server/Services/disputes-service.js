// const Disputes = require("../Models/disputes");
// const logActivity = require("../Activity/activityFunction.js");
// const User = require("../Models/user.js");
// const Employee = require("../Models/EmployeeModel.js");

// exports.createDispute = async (data, req) => {
//   try {
//     // LOGGED IN USER DATA
//     const loggedInUser = await User.findByPk(req.userId);
//     if (!loggedInUser) {
//       throw new Error(`User with ID ${req.userId} does not exist.`);
//     }

//     if (
//       loggedInUser.role === "Super Admin" ||
//       loggedInUser.role === "employee"
//     ) {
//       throw new Error(
//         "Not authorized. Only Employer Admin can raise a dispute"
//       );
//     }

//     // EMPLOYEE ADMIN'S COMPANY'S EMPLOYEE LIST
//     const loggedInUsersEmployeeData = await Employee.findOne({
//       where: { userId: req.userId },
//     });

//     // EMPLOYEE DETAILS BEING SENT FROM FRONTEND/POSTMAN
//     const employee = await Employee.findByPk(data.employee_id);
//     if (!employee) {
//       throw new Error(`Employee with ID ${data.employee_id} does not exist.`);
//     }

//     // CHECKING IF WHETHER THE EMPLOYEE ID FROM POSTMAN BELONGS TO THE EMPLOYEE ADMIN COMPANY. IF FALSE ERROR IS THROWN
//     if (loggedInUsersEmployeeData.company_id !== employee.company_id)
//       throw new Error(
//         "Employee doesn't belong to your Organization. Please re-check your employee information."
//       );

//     const employeeUser = await User.findByPk(employee.userId);
//     if (!employeeUser) {
//       throw new Error(
//         `Employee User with ID ${employee.userId} does not exist.`
//       );
//     }

//     const newDispute = await Disputes.create({
//       created_by: req.userId,
//       ...data,
//     });

//     await logActivity({
//       userId: loggedInUser.id,
//       action: `Dispute Created by user ${loggedInUser.username} to ${employeeUser.username}`,
//       details: loggedInUser.username,
//       type: "Dispute",
//       entity: "Dispute Management",
//       entityId: loggedInUser.id,
//     });

//     return newDispute;
//   } catch (error) {
//     throw error;
//   }
// };

// //  GET ALL DISPUTES
// exports.getDisputes = async (id) => {
//   try {
//     // LOGGED IN USER DATA
//     const loggedInUserData = await User.findByPk(id);

//     if (!loggedInUserData) {
//       throw new Error(`Cannot fetch user with ID: ${id}`);
//     }

//     // GETTING LOGGED IN DATA FROM EMPLOYEE TABLE
//     const loggedInEmployeeData = await Employee.findOne({
//       where: { userId: id },
//     });

//     if (!loggedInEmployeeData) {
//       throw new Error(`Cannot fetch Employee data....`);
//     }

//     if (loggedInUserData.role === "Employee")
//       throw new Error(
//         "Invalid privileges! You're not authorized to check the data"
//       );

//     if (loggedInUserData.role === "Super Admin") {
//       return await Disputes.findAll();
//     }

//     if (loggedInUserData.role === "Employee Admin") {
//       const workingCompanyID = loggedInEmployeeData.company_id;
//       const disputes = await Disputes.findAll({
//         include: [
//           {
//             model: Employee,
//             where: { company_id: workingCompanyID },
//           },
//         ],
//       });
//       return disputes;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getDisputeById = async (disputeId, loggedInUserId) => {
//   try {
//     if (!disputeId) {
//       throw new Error("No dispute ID found in your request");
//     }

//     // LOGGED IN USER DATA
//     const loggedInUserData = await User.findByPk(loggedInUserId);

//     if (!loggedInUserData) {
//       throw new Error(`Cannot fetch user with ID: ${loggedInUserId}`);
//     }

//     // GETTING LOGGED IN DATA FROM EMPLOYEE TABLE
//     const loggedInEmployeeData = await Employee.findOne({
//       where: { userId: loggedInUserData.id },
//     });

//     if (!loggedInEmployeeData) {
//       throw new Error(`Cannot fetch Employee data....`);
//     }

//     if (loggedInUserData.role === "Employee")
//       throw new Error(
//         "Invalid privileges! You're not authorized to check the data"
//       );

//     if (loggedInUserData.role === "Super Admin") {
//       return await Disputes.findByPk(disputeId);
//     }

//     if (loggedInUserData.role === "Employee Admin") {
//       const requiredDispute = await Disputes.findByPk(disputeId);
//       const employeeIDRelatedToDispute = await Employee.findByPk(
//         requiredDispute.employee_id
//       );
//       if (!employeeIDRelatedToDispute)
//         throw new Error(
//           "Couldn't find the Employee details related to this dispute."
//         );

//       if (
//         employeeIDRelatedToDispute.company_id !==
//         loggedInEmployeeData.company_id
//       )
//         throw new Error("Employee doesn't belong your Company!!");

//       return requiredDispute;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// exports.updateDispute = async (disputeId, data, req) => {
//   try {
//     if (!disputeId) {
//       throw new Error("Dispute ID is required.");
//     }
//     if (!data || Object.keys(data).length === 0) {
//       throw new Error("No data provided for update.");
//     }

//     const loggedInUser = await User.findByPk(req.userId);
//     if (!loggedInUser) {
//       throw new Error(`User with ID ${req.userId} does not exist.`);
//     }

//     if (loggedInUser.role !== "Super Admin") {
//       throw new Error("Not authorized. Only Super Admin can update disputes.");
//     }

//     const dispute = await Disputes.findByPk(disputeId);
//     if (!dispute) {
//       throw new Error(`Dispute with ID ${disputeId} does not exist.`);
//     }

//     await dispute.update(data);

//     await logActivity({
//       userId: loggedInUser.id,
//       action: `Dispute Updated by Super Admin ${loggedInUser.username}`,
//       details: loggedInUser.username,
//       type: "Dispute",
//       entity: "Dispute Management",
//       entityId: loggedInUser.id,
//     });

//     return dispute;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.deleteDispute = async (disputeId, req) => {
//   try {
//     if (!disputeId) {
//       throw new Error("Dispute ID is required.");
//     }

//     const loggedInUser = await User.findByPk(req.userId);
//     if (!loggedInUser) {
//       throw new Error(`User with ID ${req.userId} does not exist.`);
//     }

//     if (loggedInUser.role !== "Super Admin") {
//       throw new Error("Not authorized. Only Super Admin can delete disputes.");
//     }

//     const dispute = await Disputes.findByPk(disputeId);
//     if (!dispute) {
//       throw new Error(`Dispute with ID ${disputeId} does not exist.`);
//     }

//     await Disputes.destroy({ where: { id: disputeId } });

//     await logActivity({
//       userId: loggedInUser.id,
//       action: `Dispute with ID ${disputeId} deleted by Super Admin ${loggedInUser.username}`,
//       details: loggedInUser.username,
//       type: "Dispute",
//       entity: "Dispute Management",
//       entityId: loggedInUser.id,
//     });

//     return { message: "Dispute deleted successfully." };
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getEmployeesForDisputes = async (loggedInUser) => {
//   try {
//     if (!loggedInUser) {
//       throw new Error("No Logged In user ID found.");
//     }

//     const loggedInUserData = await User.findByPk(loggedInUser);

//     if (!loggedInUserData) throw new Error("No user found!!");

//     if (loggedInUserData.role !== "Employee Admin") {
//       throw new Error("No employees found. You can't access any employee data");
//     }

//     const employeesData = await Employee.findAll({
//       where: { created_by: loggedInUser },
//     });

//     return employeesData;
//   } catch (error) {
//     throw error;
//   }
// };






const Disputes = require("../Models/disputes");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");
const Employee = require("../Models/EmployeeModel.js");

exports.createDispute = async (data, req) => {
  try {
    // LOGGED IN USER DATA
    const loggedInUser = await User.findByPk(req.userId);
    if (!loggedInUser) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }

    if (
      loggedInUser.role === "Super Admin" ||
      loggedInUser.role === "employee"
    ) {
      throw new Error(
        "Not authorized. Only Employer Admin can raise a dispute"
      );
    }

    // EMPLOYEE ADMIN'S COMPANY'S EMPLOYEE LIST
    const loggedInUsersEmployeeData = await Employee.findOne({
      where: { userId: req.userId },
    });

    console.log(loggedInUsersEmployeeData);

    // EMPLOYEE DETAILS BEING SENT FROM FRONTEND/POSTMAN
    const employee = await Employee.findByPk(data.employee_id);
    if (!employee) {
      throw new Error(`Employee with ID ${data.employee_id} does not exist.`);
    }

    // CHECKING IF WHETHER THE EMPLOYEE ID FROM POSTMAN BELONGS TO THE EMPLOYEE ADMIN COMPANY. IF FALSE ERROR IS THROWN
    if (loggedInUsersEmployeeData.company_id !== employee.company_id)
      throw new Error(
        "Employee doesn't belong to your Organization. Please re-check your employee information."
      );

    const employeeUser = await User.findByPk(employee.userId);
    if (!employeeUser) {
      throw new Error(
        `Employee User with ID ${employee.userId} does not exist.`
      );
    }

    const newDispute = await Disputes.create({
      created_by: req.userId,
      ...data,
    });

    await logActivity({
      userId: loggedInUser.id,
      action: `Dispute Created by user ${loggedInUser.username} to ${employeeUser.username}`,
      details: loggedInUser.username,
      type: "Dispute",
      entity: "Dispute Management",
      entityId: loggedInUser.id,
    });

    return newDispute;
  } catch (error) {
    throw error;
  }
};

//  GET ALL DISPUTES
exports.getDisputes = async (id, page = 1, pageSize = 5) => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  try {
    // LOGGED IN USER DATA
    const loggedInUserData = await User.findByPk(id);

    // if (!loggedInUserData) {
    //   throw new Error(`Cannot fetch user with ID: ${id}`);
    // }

    // // GETTING LOGGED IN DATA FROM EMPLOYEE TABLE
    // const loggedInEmployeeData = await Employee.findOne({
    //   where: { userId: id },
    // });

    // if (!loggedInEmployeeData) {
    //   throw new Error(`Cannot fetch Employee data.`);
    // }

    // if (loggedInUserData.role === "Employee") {
    //   throw new Error(
    //     "Invalid privileges! You're not authorized to check the data."
    //   );
    // }

    let rows, count;
    if (loggedInUserData.role === "Employee Admin") {
      const pageData = await Disputes.findAndCountAll({
        include: [
          {
            model: Employee,
            attributes: ["id", "first_name", "last_name"], // Select only id and name
          },
        ],
        where: { created_by: id },
        limit,
        offset,
      });
      rows = pageData.rows;
      count = pageData.count;
    }

    if (loggedInUserData.role === "Super Admin") {
      const pageData = await Disputes.findAndCountAll({
        include: [
          {
            model: Employee,
            attributes: ["id", "first_name", "last_name"], // Select only id and name
          },
        ],
        limit,
        offset,
      });
      console.log(pageData.rows+"rows")
      rows = pageData.rows;
      count = pageData.count;
    }

    // Fetch disputes with pagination

    console.log(rows + "rows");

    const pendingCount = await Disputes.count({ where: { status: "pending" } });
    const approvedCount = await Disputes.count({
      where: { status: "approved" },
    });
    const infoRequestedCount = await Disputes.count({
      where: { status: "info_requested" },
    });
    const rejectedCount = await Disputes.count({
      where: { status: "rejected" },
    });
    
    return {
      data: rows.map((dispute) => ({
        id: dispute.id,
        dispute_type: dispute.dispute_type,
        reason: dispute.reason,
        status: dispute.status,
        resolution_notes: dispute.resolution_notes,
        createdAt: dispute.createdAt,
        employeeId: dispute.Employee.id,
        fullName: dispute.Employee.first_name + dispute.Employee.last_name,
        // employee_id:
      })),
      pagination: {
        totalRecords: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        pageSize: pageSize,
        pendingCount,
        approvedCount,
        infoRequestedCount,
        rejectedCount,
      },
    };
  } catch (error) {
    console.error(error.message);
    throw new Error("Something went wrong while fetching disputes.");
  }
};

exports.getDisputeById = async (disputeId, loggedInUserId) => {
  try {
    if (!disputeId) {
      throw new Error("No dispute ID found in your request");
    }

    // LOGGED IN USER DATA
    const loggedInUserData = await User.findByPk(loggedInUserId);

    if (!loggedInUserData) {
      throw new Error(`Cannot fetch user with ID: ${loggedInUserId}`);
    }

    // GETTING LOGGED IN DATA FROM EMPLOYEE TABLE
    const loggedInEmployeeData = await Employee.findOne({
      where: { userId: loggedInUserData.id },
    });

    if (!loggedInEmployeeData) {
      throw new Error(`Cannot fetch Employee data....`);
    }

    if (loggedInUserData.role === "Employee")
      throw new Error(
        "Invalid privileges! You're not authorized to check the data"
      );

    if (loggedInUserData.role === "Super Admin") {
      return await Disputes.findByPk(disputeId);
    }

    if (loggedInUserData.role === "Employee Admin") {
      const requiredDispute = await Disputes.findByPk(disputeId);
      const employeeIDRelatedToDispute = await Employee.findByPk(
        requiredDispute.employee_id
      );
      if (!employeeIDRelatedToDispute)
        throw new Error(
          "Couldn't find the Employee details related to this dispute."
        );

      if (
        employeeIDRelatedToDispute.company_id !==
        loggedInEmployeeData.company_id
      )
        throw new Error("Employee doesn't belong your Company!!");

      return requiredDispute;
    }
  } catch (error) {
    throw error;
  }
};

exports.updateDispute = async (disputeId, data, req) => {
  try {
    if (!disputeId) {
      throw new Error("Dispute ID is required.");
    }
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data provided for update.");
    }

    const loggedInUser = await User.findByPk(req.userId);
    if (!loggedInUser) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }

    // if (loggedInUser.role !== "Super Admin") {
    //   throw new Error("Not authorized. Only Super Admin can update disputes.");
    // }

    const dispute = await Disputes.findByPk(disputeId);
    if (!dispute) {
      throw new Error(`Dispute with ID ${disputeId} does not exist.`);
    }

    await dispute.update(data);

    await logActivity({
      userId: loggedInUser.id,
      action: `Dispute Updated by Super Admin ${loggedInUser.username}`,
      details: loggedInUser.username,
      type: "Dispute",
      entity: "Dispute Management",
      entityId: loggedInUser.id,
    });

    return dispute;
  } catch (error) {
    throw error;
  }
};

exports.deleteDispute = async (disputeId, req) => {
  try {
    if (!disputeId) {
      throw new Error("Dispute ID is required.");
    }

    const loggedInUser = await User.findByPk(req.userId);
    if (!loggedInUser) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }

    if (loggedInUser.role !== "Super Admin") {
      throw new Error("Not authorized. Only Super Admin can delete disputes.");
    }

    const dispute = await Disputes.findByPk(disputeId);
    if (!dispute) {
      throw new Error(`Dispute with ID ${disputeId} does not exist.`);
    }

    await Disputes.destroy({ where: { id: disputeId } });

    await logActivity({
      userId: loggedInUser.id,
      action: `Dispute with ID ${disputeId} deleted by Super Admin ${loggedInUser.username}`,
      details: loggedInUser.username,
      type: "Dispute",
      entity: "Dispute Management",
      entityId: loggedInUser.id,
    });

    return { message: "Dispute deleted successfully." };
  } catch (error) {
    throw error;
  }
};

exports.getEmployeesForDisputes = async (loggedInUser) => {
  console.log(loggedInUser);
  try {
    if (!loggedInUser) {
      throw new Error("No Logged In user ID found.");
    }

    const loggedInUserData = await User.findByPk(loggedInUser);

    if (!loggedInUserData) throw new Error("No user found!!");

    // if (loggedInUserData.role !== "Employee Admin") {
    //   throw new Error("No employees found. You can't access any employee data");
    // }

    const employeesData = await Employee.findAll({
      where: { created_by: loggedInUser },
    });

    return employeesData;
  } catch (error) {
    throw error;
  }
};

