const SalleDisponibiliteSchema = require("../../model/SalleDisponibilite/SalleDisponibilite");

function getSalleDisponibiliteModel(dbConnection) {
  return (
    dbConnection.models.SalleDisponibilite ||
    dbConnection.model("SalleDisponibilite", SalleDisponibiliteSchema)
  );
}

const createDisponibiliteSalle = async (data, dbName) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  return await disponibiliteSalleModel.create(data);
};

const getAllDisponibiliteSalles = async (dbName) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  return await disponibiliteSalleModel.find().populate("roomId");
};

const updateDisponibiliteSalle = async (
  id,
  availabilityIndex,
  occupationType,
  dbName
) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  return await disponibiliteSalleModel.findByIdAndUpdate(
    id,
    {
      $set: { isAvailable: availabilityIndex, occupationType: occupationType },
    },
    { new: true }
  );
};

const deleteDisponibility = async (salleId, dbName) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  const deletedDisponibility = await disponibiliteSalleModel.deleteMany({
    roomId: salleId,
  });

  return deletedDisponibility;
};

const getDisponibiliteSalleByTimeInterval = async (data, dbName) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  const query = {
    timeSlot: data.timeSlot1 + "-" + data.timeSlot2,
    dayOfWeek: data.jour,
    isAvailable: data.availability,
  };

  const disponibilites = await disponibiliteSalleModel
    .find(query)
    .populate("roomId");
  return disponibilites;
};

const getFullyOrPartialAvailableRoomsByTimeInterval = async (data, dbName) => {
  const disponibiliteSalleModel = await getSalleDisponibiliteModel(dbName);
  const query = {
    timeSlot: data.timeSlot1 + "-" + data.timeSlot2,
    dayOfWeek: data.jour,
    occupationType: {
      $in: ["1/15", "", null],
    },
  };

  const disponibilites = await disponibiliteSalleModel
    .find(query)
    .populate("roomId");
  return disponibilites;
};

module.exports = {
  createDisponibiliteSalle,
  deleteDisponibility,
  getDisponibiliteSalleByTimeInterval,
  getFullyOrPartialAvailableRoomsByTimeInterval,
  getAllDisponibiliteSalles,
  updateDisponibiliteSalle,
};
