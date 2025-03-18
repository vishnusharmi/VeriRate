const department = require("../Services/department-service");

const GetAlldepartments = async (req, res) => {
    const { page, pageSize, search, sortBy, sortOrder } = req.query;
    try {
        const departments = await department.GettingDepartments(page, pageSize, search, sortBy, sortOrder);
        return res.status(departments.statusCode).json({ message: departments.message, departments })
    }
    catch (error) {
        return res.status(500).json({ message: ' error getting departments', error })
    }
}

const GetSingleDepartment = async (req, res) => {
    try {
        const gettingSingleDepartment = await department.gettingDepartment(req.params.id);
        return res.status(gettingSingleDepartment.statusCode).json({ message: gettingSingleDepartment.message, gettingSingleDepartment })
    }
    catch (error) {
        return res.status(500).json({ message: 'error fetching department' })
    }
}

const UpdatingDepartment = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const updatedDepartment = await department.updatingDepartment(data, id)
        return res.status(updatedDepartment.statusCode).json({ message: updatedDepartment.message, updatedDepartment })
    }
    catch (error) {
        return res.status(500).json({ message: ' error updating department' })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await department.deletingDepartment(id)
        return res.status(deletedDepartment.statusCode).json({ message: deletedDepartment.message, deletedDepartment })
    }
    catch (error) {
        return res.status(500).json({ message: 'error deleting department' })
    }
}




module.exports = { GetAlldepartments, GetSingleDepartment, UpdatingDepartment, deleteDepartment }