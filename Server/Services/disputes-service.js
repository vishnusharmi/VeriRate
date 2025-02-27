const Disputes = require("../Models/disputes");

exports.createDispute = async (data) => {
    try {
        const newDispute = await Disputes.create(data);
        console.log(newDispute)
        return newDispute;
    } catch (error) {
        console.error("error:",error.message);
    }
};

exports.getDisputes = async () => {
    try {
        const disputes = await Disputes.findAll();
        return disputes
    } catch (error) {
        console.error("error:",error);
    }
};

exports.getDisputeById = async (id) => {
    try {
        const dispute = await Disputes.findByPk(id);
        return dispute;
    } catch (error) {
        console.error("error:",error);
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

        return dispute;  // Return updated dispute object
        
    } catch (error) {
        console.error("error:",error.message);
    }
};  

exports.deleteDispute = async (id) => {
    try {
        const deleteDispute = await Disputes.destroy({ where: { id } });
        return deleteDispute;
    } catch (error) {
        console.error("error:",error);
    }
};