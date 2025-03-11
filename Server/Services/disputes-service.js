const Disputes = require("../Models/disputes");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");
const Employee = require("../Models/EmployeeModel.js");


exports.createDispute = async (data, req) => {
    try {
        const newDispute = await Disputes.create({ created_by: req.userId, ...data });

        const user = await User.findByPk(req.userId);
        if (!user) {
            throw new Error(`User with ID ${req.userId} does not exist.`);
        }

        const employee = await Employee.findByPk(data.employee_id);
        if (!employee) {
            throw new Error(`Employee with ID ${data.employee_id} does not exist.`);
        }

        const employeeUser = await User.findByPk(employee.userId);
        if (!employeeUser) {
            throw new Error(`Employee User with ID ${employee.userId} does not exist.`);
        }

        await logActivity({
            userId: user.id,
            action: `Dispute Created by user ${user.username} to ${employeeUser.username}`,
            details: user.username,
            type: "Dispute",
            entity: "Dispute Management",
            entityId: user.id
        })

        return newDispute;
    } catch (error) {
        throw error;
    }
};

exports.getDisputes = async () => {
    try {
        const disputes = await Disputes.findAll();
        return disputes
    } catch (error) {
        throw error;
    }
};

exports.getDisputeById = async (id) => {
    try {
        const dispute = await Disputes.findByPk(id);
        if(!dispute) {
            throw new Error(`Dispute with ID ${id} does not exist.`);
        }
        return dispute;
    } catch (error) {
        throw error;
    }
};

exports.updateDispute = async (id, data, req) => {
    try {
        const dispute = await Disputes.findByPk(id);
        if (!dispute) {
            throw new Error(`Dispute with ID ${id} does not exist.`);
        }

        await dispute.update(data, { where: { id } });

        const user = await User.findByPk(req.userId);
        if (!user) {
            throw new Error(`User with ID ${req.userId} does not exist.`);
        }

        const employee = await Employee.findByPk(dispute.employee_id);
        if (!employee) {
            throw new Error(`Employee with ID ${dispute.employee_id} does not exist.`);
        }

        const employeeUser = await User.findByPk(employee.userId);
        if (!employeeUser) {
            throw new Error(`Employee User with ID ${employee.userId} does not exist.`);
        }

        await logActivity({
            userId: user.id,
            action: `Dispute Updated by user ${user.username} to ${employeeUser.username}`,
            details: user.username,
            type: "Dispute",
            entity: "Dispute Management",
            entityId: user.id
        })

        return dispute;  // Return updated dispute object

    } catch (error) {
        throw error;
    }
};

exports.deleteDispute = async (id,req) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            throw new Error(`User with ID ${req.userId} does not exist.`);
        }

        const dispute = await Disputes.findByPk(id);
        if (!dispute) {
            throw new Error(`Dispute with ID ${id} does not exist.`);
        }

        const employee = await Employee.findByPk(dispute.employee_id);
        if (!employee) {
            throw new Error(`Employee with ID ${dispute.employee_id} does not exist.`);
        }

        const employeeUser = await User.findByPk(employee.userId);
        if (!employeeUser) {
            throw new Error(`Employee User with ID ${employee.userId} does not exist.`);
        }

        const deleted = await Disputes.destroy({ where: { id } });

        await logActivity({
            userId: user.id,
            action: `Dispute of user: ${employeeUser.username} ID:${dispute.id} is deleted by ${user.username} of ID: ${user.id}`,
            details: user.username,
            type: "Dispute",
            entity: "Dispute Management",
            entityId: user.id
        });

        return deleted;
    } catch (error) {
        throw error;
    }
};