const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const employeeModel = require("../Models/EmployeeModel");

const bcrypt = require("bcryptjs");
const { accessSync } = require("fs");

exports.registerUser = async (data, files) => {
  const transaction = await userModel.sequelize.transaction(); // Start transaction
  console.log("employment_history", data.employment_history);
  try {
    // Validate required fields
    if (!data.email || !data.password || !data.role) {
      return { statusCode: 404, message: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      return { statusCode: 400, message: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user inside transaction
    const userData = await userModel.create(
      {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        username:
          data.role === "employee"
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
          email: data.email,
          password: data.password,
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
          role: data.role,
          department: data.department,
          employment_history: data.employment_history,
          employee_type: data.employee_type,
          gender: data.gender,
          pf_account: data.pf_account,
          father_or_husband_name: data.father_or_husband_name,
          permanent_address: data.permanent_address,
          current_address: data.current_address,
          UPI_Id: data.UPI_Id,
        },
        { transaction }
      );
    }


    let documentResponse = null;

    if (files && files.path) {
      documentResponse = await Documents.create(
        {
          empId: userData.id,
          documentType: files.mimetype,
          file_path: files.path,
        },
        { transaction }
      );
    }

    // If everything succeeds, commit the transaction
    await transaction.commit();

    return {
      statusCode: 201,
      message: "User created successfully",
      data: {
        user: userData,
        additionalData,
        document: documentResponse,
      },
    };
  } catch (error) {
    // Rollback transaction if any error occurs
    await transaction.rollback();
    console.error("Error in registerUser:", error);
    return { statusCode: 500, message: error.message, error: error.message };
  }


};

exports.getAllusers = async () => {
  try {
    const getUsers = await userModel.findAll({
      include: [
        {
          model: Documents,
        },
      ],
    });
    return getUsers;
  } catch (error) {
    console.log(error);
  }
};

//get user by id

exports.getUserbyid = async (id) => {
  try {
    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,
        },
      ],
    });
    return getuser;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

//update user by id

exports.updateUserById = async (id, data, documentPath) => {
  try {
    const getuser = await userModel.findByPk(id, {
      include: [
        {
          model: Documents,
        },
      ],
    });

    console.log(getuser.Document.id, "docicici");

    let file_url = getuser.Document.id;

    const result = await cloudinaryUpload.uploader.upload(documentPath, {
      resource_type: "auto",
      folder: "user_uploads",
    });

    console.log(result, "resultttt");

    const updatedUser = await userModel.update(data, { where: { id } });

    if (!updatedUser) {
      throw new error(" user not found");
    }

    const docResponse = await Documents.update(
      { file_path: result.url },
      { where: { id: file_url } }
    );

    console.log(docResponse, "responss");

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

//delete user

exports.deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.destroy({ where: { id } });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
