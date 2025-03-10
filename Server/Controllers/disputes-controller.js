const disputeService = require("../Services/disputes-service");


const createDispute = async (req, res) => {
    try {
        const dispute = await disputeService.createDispute(req.body,req);
        return res.status(200).json({ message: "Dispute Created Successfully", data: dispute })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const getDisputes = async (req, res) => {
    try {
        const disputes = await disputeService.getDisputes();
        return res.status(200).json({ message: "All Disputes", data: disputes })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const getDisputeById = async (req, res) => {
    try {
        const dispute = await disputeService.getDisputeById(req.params.id);
        return res.status(200).json({ message: "Dispute Retrived Successfully", dispute })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const updateDisputes = async (req, res) => {
    const id = req.params.id;
    try {
        const dispute = await disputeService.updateDispute(id, req.body,req);
        return res.status(200).json({ message: "Dispute Updated Successfully", data: dispute })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const deleteDispute = async (req, res) => {
    try {
        const dispute = await disputeService.deleteDispute(req.params.id,req);
        return res.status(200).json({ message: "Dispute Deleted Successfully", dispute })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { getDisputes, createDispute, getDisputeById, updateDisputes, deleteDispute }