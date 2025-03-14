const servicePersonnel = require("../../model/ServicePersonnelModel/ServicePersonnelModel");

const createServicePersonnel = async (service_personnel) => {
  return await servicePersonnel.create(service_personnel);
};

const getServicesPersonnel = async () => {
  return await servicePersonnel.find();
};

const updateServicePersonnel = async (id, updateData) => {
  return await servicePersonnel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteServicePersonnel = async (id) => {
  return await servicePersonnel.findByIdAndDelete(id);
};

const getServicePersonnelById = async (id) => {
  return await servicePersonnel.findById(id);
};

const getServiceByValue = async (service_ar, service_fr) => {
  return await servicePersonnel.findOne({ service_ar, service_fr });
};

module.exports = {
  createServicePersonnel,
  getServicesPersonnel,
  updateServicePersonnel,
  deleteServicePersonnel,
  getServicePersonnelById,
  getServiceByValue,
};
