const captainModel = require("../models/captain.model");

module.exports = {
  create: async (captainData) => {
    return await captainModel.create(captainData);
  },

  findOne: async (query) => {
    return await captainModel.findOne(query);
  },

};
