const VirtualServiceSchema = require("../../model/VirtualServiceModel/VirtualServiceModel");

function getActualiteModel(dbConnection) {
  return (
    dbConnection.models.VirtualService ||
    dbConnection.model("VirtualService", VirtualServiceSchema)
  );
}

const createVirtualService = async (VirtualServiceData, dbName) => {
  const VirtualService = getActualiteModel(dbName);
  const virtualService = new VirtualService(VirtualServiceData);
  return virtualService.save();
};

const getAllVirtualServices = async (dbName) => {
  const VirtualService = getActualiteModel(dbName);
  return VirtualService.find();
};

const getVirtualServiceById = async (id, dbName) => {
  const VirtualService = getActualiteModel(dbName);
  return VirtualService.findById(id);
};

const updateVirtualService = async (id, updateData, dbName) => {
  const VirtualService = getActualiteModel(dbName);
  return VirtualService.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteVirtualService = async (id, dbName) => {
  const VirtualService = getActualiteModel(dbName);
  return VirtualService.findByIdAndDelete(id);
};

module.exports = {
  createVirtualService,
  getAllVirtualServices,
  getVirtualServiceById,
  updateVirtualService,
  deleteVirtualService,
};
