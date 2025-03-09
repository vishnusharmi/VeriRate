const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const employeeModel = require("../Models/EmployeeModel");
const AdminSettings = require("../Models/AdminSettings");

const bcrypt = require("bcryptjs");
const { accessSync } = require("fs");
const { log, error } = require("console");

exports.registerUser = async (data, files) => {
  const transaction = await userModel.sequelize.transaction(); // Start transaction
  // console.log("employment_history", data.employment_history);
  // console.log(`*************************************${files}`)
  try {
    // Validate required fields
    if (!data.email || !data.password || !data.role) {
      // return { statusCode: 404, message: "Missing required fields" };
      throw new Error("Missing required fields")
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      // return { statusCode: 400, message: "User already exists" };
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
        username: !(data.username)
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
          created_By:data.created_By
        },
        { transaction }
      );

      // if (data.role === "Employee Admin") {
      //   await AdminSettings.create({
      //     superAdminId:additionalData.created_By,
      //     adminId: userData.id, 
      //     accessControl: false,
      //     complianceCheck: true,
      //     blacklistControl: false,
      //     twoFactorAuth: false,
      //     systemMonitoring: true,
      //     performanceTracking: true,
      //   });
      // }

    }


    // let documentResponse = null;

    // if (files && files.path) {
    //   documentResponse = await Documents.create(
    //     {
    //       empId: userData.id,
    //       documentType: files.mimetype,
    //       file_path: files.path,
    //     },
    //     { transaction }
    //   );
    // }





    let documentResponses = [];

    if (files && Array.isArray(files)) {
      for (const file of files) {

        if (file.path) {
          const document = await Documents.create({
            empId: userData.id,
            documentType: file.mimetype,
            file_path: file.path,
          }, { transaction });

          documentResponses.push(document);
        }

      }
    } else if (files && files.path) {

      // console.log(`***************************************${files} *******************${files.path} ****************`);
      const document = await Documents.create({
        empId: userData.id,
        documentType: files.mimetype,
        file_path: files.path,
      }, { transaction });

      documentResponses.push(document);
    }



    // If everything succeeds, commit the transaction
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
    // Rollback transaction if any error occurs
    await transaction.rollback();
    // console.error("Error in registerUser:", error);
    throw error;
  }


};

// exports.getAllusers = async () => {
//   try {
//     const getUsers = await userModel.findAll({
//       include: [
//         {
//           model: Documents,
//         },
//       ],
//     });
//     return getUsers;
//   } catch (error) {
//     console.log(error);
//   }
// };


exports.getAllusers = async () => {
  try {
    const getUsers = await userModel.findAll({
      include: [Documents, employeeModel],
    });
    return { data: getUsers };
  } catch (error) {
    console.error(error);
    return { message: "Internal Server Error", error: error.message };
  }
};



//get user by id

// exports.getUserbyid = async (id) => {
//   try {
//     const getuser = await userModel.findByPk(id, {
//       include: [
//         {
//           model: Documents,
//         },
//       ],
//     });
//     return getuser;
//   } catch (error) {
//     console.error("Error fetching user by id:", error);
//     throw error;
//   }
// };



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
    console.error('Error fetching user by id:', error);
    return { message: "Internal Server Error", error: error.message };
  }
};


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

    console.log(getuser.Employee.id,'get users');
    

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

    if(getuser.Employee){
      let id = getuser.Employee.id
      console.log(id,'idddddddddd');
      await employeeModel.update(data,{where:{id}})
      
    }

   

    const [rowsUpdated] = await userModel.update(data, { where: { id } });

    if (rowsUpdated === 0) {
      throw new Error("User update failed");
    }
    const updatedUser = await userModel.findByPk(id, {
      include: [{ model: Documents} ,  { model: employeeModel }],
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};




exports.deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.destroy({ where: { id } });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
