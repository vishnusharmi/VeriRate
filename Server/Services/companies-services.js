const Company = require("../Models/companies");
const departmentModel = require("../Models/department");
const sequelize = require("../Config/DBconnection");
const Department = require("../Models/department");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");

exports.createCompany = async (company, created_by) => {
  const t = await sequelize.transaction();
  try {
    // checking if company email already exists or not
    const companyExists = await Company.findOne({
      where: { email: company.email },
    });
    if (companyExists) {
      throw new Error(`Company ${company.email} already exists`);
    }

    const { departments, ...companyData } = company;
    const companyCreated = await Company.create(
      { ...companyData, created_by },
      { transaction: t }
    );
    if (!companyCreated) {
      throw new Error(`Company with email: ${company.email} not created`);
    }

    const finalDepartments = departments.map((department) => {
      return {
        ...department,
        companyId: companyCreated.id,
      };
    });

    const departmentResponse = await departmentModel.bulkCreate(
      finalDepartments,
      { transaction: t }
    );

    try {
      const user = await User.findOne({ where: { id: created_by } });
      if (!user) {
        throw new Error(`User with ID ${created_by} not found`);
      }
      await logActivity({
        type: "Company",
        action: `New company profile created by ${user.username} with name ${company.companyName}`,
        userId: created_by,
        entity: "Company Management",
        details: `${company.companyName}`,
      });
    } catch (error) {
      throw new Error(error.message);
    }

    await t.commit(); // Commit transaction if everything is successful
    return { companyCreated, departmentResponse };
  } catch (error) {
    await t.rollback(); // Rollback transaction if any error occurs
    throw error;
  }
};

// const finalDepartments = departments.map((department) => {
//   return {
//     ...department,
//     companyId: companyCreated.id,
//   };
// });
// const departmentResponse = await departmentModel.bulkCreate(
//   finalDepartments
// );

// try {
//   await logActivity({
//     type: "Company",
//     action: "New company profile created",
//     userId: adminId,
//     entity: "Company Management",
//     details: `${company.companyName}`,
//   });
//   // console.log("After logging activity...");
// } catch (error) {
//   console.error("Log Activity Error:", error);
//   throw error;
// }

//get all compamies
exports.getCompanies = async (limit, offset, page) => {
  try {
    const result = await Company.findAndCountAll({
      limit: parseInt(limit), // Number of records per page
      offset: parseInt(offset), // Skip records for pagination
      include: [
        {
          model: Department,
        },
      ],
      distinct: true, // Fixes incorrect count issue
      order: [["createdAt", "DESC"]], // Sorting by latest created
    });
    return {
      totalRecords: result.count, // Total records count
      page: parseInt(page),
      totalPages: Math.ceil(result.count / limit),
      companies: result.rows, // Fetched company records with departments
    };
  } catch (error) {
    throw error;
  }
};

//get single comapny
// get single company
exports.getcompanyById = async (id) => {
  try {
    const company = await Company.findByPk(id, {
      include: [
        {
          model: Department,
        },
      ],
    });
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    return company;
  } catch (error) {
    throw error;
  }
};

//updating company
exports.updateCompany = async (id, company) => {
  // check weather company with that id exists or not
  const exists = await Company.findByPk(id);
  if (!exists) {
    throw new Error(`Company with ID ${id} not found`);
  }
  const t = await sequelize.transaction();
  const {
    companyName,
    email,
    phonenumber,
    address,
    industry,
    country,
    state,
    registerNum,
    founderYear,
    companyWebsite,
    departments,
    created_by,
  } = company;

  try {
    // **Update company table**
    const companyUpdatedData = await Company.update(
      {
        companyName,
        email,
        phonenumber,
        address,
        industry,
        country,
        state,
        registerNum,
        founderYear,
        companyWebsite,
      },
      { where: { id }, transaction: t }
    );

    if (companyUpdatedData && departments) {
      // here after updating companies updating departments
      for (const dept of departments) {
        const deptData = await Department.upsert(
          {
            id: dept.id, // If ID exists, it updates; otherwise, inserts
            name: dept.name,
            departmentCode: dept.departmentCode,
            companyId: id,
          },
          { transaction: t }
        );
      }
    }

    try {
      const user = await User.findOne({ where: { id: created_by } });
      if (!user) {
        throw new Error(`User with ID ${created_by} not found`);
      }
      await logActivity({
        type: "Company",
        action: `Company  ${company.companyName} updated by ${user.username}`,
        userId: id,
        entity: "Company Management",
        details: `${company.companyName}`,
      });
    } catch (error) {
      throw new Error(error.message);
    }
    await t.commit(); // Commit transaction
    return { message: "Company and departments updated successfully" };
  } catch (error) {
    await t.rollback(); // Rollback transaction if error occurs
    throw error;
  }
};

//deleting Company
exports.deleteCompany = async (id, adminId) => {
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    const deleteCompany = await Company.destroy({ where: { id } });
    try {
      const user = await User.findByPk(adminId);
      if (!user) {
        throw new Error(`User with ID ${adminId} not found`);
      }
      await logActivity({
        type: "Company",
        action: `Company ${company.companyName} deleted by ${user.username}`,
        userId: id,
        entity: "Company Management",
        details: `${company.companyName}`,
      });
    } catch (error) {
      throw new Error(error.message);
    }
    return deleteCompany;
  } catch (error) {
    throw error;
  }
  // const deleteCompany = await Company.destroy({ where: { id } });
  // await logActivity(
  //   company.id,
  //   "company profile deleted",
  //   ` ${company.companyName}`,
  //   "Company",
  //   "Company Management"
  // );
  // return deleteCompany;
  // } catch (error) {
  //   console.error("error:", error);
  // }
};
