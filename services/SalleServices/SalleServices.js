const salleDao = require("../../dao/SalleDao/SalleDao");
const DepartementModel = require("../../model/DepartementModel/DepartementModel");

const createSalle = async (userData) => {
  try {
    const salle = await salleDao.createSalle(userData);
    await DepartementModel.findByIdAndUpdate(
      userData.departement,
      { $push: { salles: salle._id } }
    );
    return await salle.populate('departement')
  } catch (error) {
    console.error("Error in salle service:", error);
    throw error;
  }
};

const updateSalle = async (id, updateData) => {
  return await salleDao.updateSalle(id, updateData);
};

const getSalleById = async (id) => {
  return await salleDao.getSalleById(id)
};

const getSalles= async () => {
  const result = await salleDao.getSalles();
  return result;
};

const deleteSalleById = async (id) => {
  return await salleDao.deleteSalle(id);
};



module.exports = {
    deleteSalleById,
    getSalles,
    getSalleById,
    updateSalle,
    createSalle,

};