
const departmentModel = require("../Models/department");
const Company = require("../Models/companies");
const { Op } = require("sequelize");


exports.GettingDepartments = async (page = 1, pageSize = 10, search = "", sortBy = "id", sortOrder = "ASC") => {
    try {
        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;

        const whereClause = search
            ? {
                name: {
                    [Op.like]: `%${search}%`,
                },
            }
            : {};

        const { count, rows } = await departmentModel.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[sortBy, sortOrder.toUpperCase()]],
        });

        if (rows.length === 0) {
            return { statusCode: 404, message: "No departments found" };
        }

        return {
            statusCode: 200,
            message: "Successfully fetched departments",
            data: rows,
            totalRecords: count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
        };
    } catch (error) {
        console.log("Error getting departments", error);
        throw error;
    }
};


exports.gettingDepartment = async (id) => {
    try {
        const singleDepartment = await departmentModel.findByPk(id);
        if (!singleDepartment) {
            return { statusCode: 404, message: " id not found" }
        }
        return { statusCode: 200, message: ' successfully fetched department', singleDepartment };
    }
    catch (error) {
        console.log("Error getting single department", error);

    }
}

exports.updatingDepartment = async (data, id) => {
    try {
        const updateDepartment = await departmentModel.update(data, { where: { id } })
        if (!updateDepartment) {
            return { statusCode: 500, message: "id not found" }
        }
        return { statusCode: 200, message: 'successfullly updated department', updateDepartment };
    }
    catch (error) {
        console.log('Error updating department', error);
        throw error

    }
}


exports.deletingDepartment = async (id) => {
    try {
        const deletedDepartment = await departmentModel.destroy({
            where: { id }
        })
        if (!deletedDepartment) {
            return { statusCode: 404, message: 'id Not found' }
        }
        return { statusCode: 200, message: 'successfully deleted department' }
    }
    catch (error) {
        console.log('Error deleting department');
        throw error;
    }
}

