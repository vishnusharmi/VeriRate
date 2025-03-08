const department = require("../Services/department-service");

const GetAlldepartments = async (req, res) => {
    const { page, pageSize, search, sortBy, sortOrder } = req.query;
    try {
        const departments = await department.GettingDepartments(page, pageSize, search, sortBy, sortOrder);
        res.status(departments.statusCode).json({ message: departments.message, departments })
    }
    catch (error) {
        res.status(500).json({ message: ' error getting departments', error })
    }
}

const GetSingleDepartment = async (req, res) => {
    try {
        const gettingSingleDepartment = await department.gettingDepartment(req.params.id);
        res.status(gettingSingleDepartment.statusCode).json({ message: gettingSingleDepartment.message, gettingSingleDepartment })
    }
    catch (error) {
        res.status(500).json({ message: 'error fetching department' })
    }
}

const UpdatingDepartment = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const updatedDepartment = await department.updatingDepartment(data, id)
        res.status(updatedDepartment.statusCode).json({ message: updatedDepartment.message, updatedDepartment })
    }
    catch (error) {
        res.status(500).json({ message: ' error updating department' })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await department.deletingDepartment(id)
        res.status(deletedDepartment.statusCode).json({ message: deletedDepartment.message, deletedDepartment })
    }
    catch (error) {
        res.status(500).json({ message: 'error deleting department' })
    }
}




module.exports = { GetAlldepartments, GetSingleDepartment, UpdatingDepartment, deleteDepartment }