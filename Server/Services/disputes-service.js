const Disputes = require("../Models/disputes");
const logActivity = require("../Activity/activityFunction.js");


exports.createDispute = async (data) => {
    try {
        const newDispute = await Disputes.create(data);
        // console.log(newDispute)

        await logActivity(
            newDispute.id,
            "New dispute created",
            ` ${newDispute.dispute_type}`,
            "Dispute",
            "Dispute Management"
        );

        return newDispute;
    } catch (error) {
        console.error("error:", error.message);
        throw error;
    }
};

exports.getDisputes = async () => {
    try {
        const disputes = await Disputes.findAll();
        return disputes
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};

exports.getDisputeById = async (id) => {
    try {
        const dispute = await Disputes.findByPk(id);
        return dispute;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};

exports.updateDispute = async (id, data) => {
    try {
        const dispute = await Disputes.findByPk(id);
        // console.log(dispute)

        // if (!dispute) {
        //     throw new Error("Dispute not found.");
        // }
        await dispute.update(data);

        await logActivity(
            dispute.id,
            "New dispute Updated",
            ` ${dispute.dispute_type}`,
            "Dispute",
            "Dispute Management"
        );

        return dispute;  // Return updated dispute object

    } catch (error) {
        console.error("error:", error.message);
        throw error;
    }
};

exports.deleteDispute = async (id) => {
    try {
        const dispute = await Disputes.findByPk(id);
        const deleteDispute = await Disputes.destroy({ where: { id } });
        await logActivity(
            dispute.id,
            "Dispute Deleted",
            ` ${dispute.dispute_type}`,
            "Dispute",
            "Dispute Management"
        );
        return deleteDispute;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};