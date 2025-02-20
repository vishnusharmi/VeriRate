const Rating = require("../Models/ratingsModel");

exports.createRating = async(data) => {
    try {
        return await Rating.create(data);
    }catch(err) {
        throw new Error(err.message);
    }
};

exports.getAllRatings = async() => {
    try {
        return await Rating.findAll();
    }catch(err) {
        throw new Error(err.message);
    }
};

exports.getRatingById = async(id) => {
    try{
        return await Rating.findByPk(id);
    }catch(err) {
        throw new Error(err.message);
    }
};


exports.updateRating = async (id, data) => {
    try {
        const rating = await Rating.findByPk(id);
        const updated = await rating.update(data);
        return updated;
    } catch (err) {
        throw new Error(err.message); 
    }
};


exports.deleteRating = async (id) => {
    try {
      const rating = await Rating.findByPk(id);
      const deleted = await rating.destroy();
      return deleted;
    } catch (error) {
      throw new Error(error.message);
    }
};

