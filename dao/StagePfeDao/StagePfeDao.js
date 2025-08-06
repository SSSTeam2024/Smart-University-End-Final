const stagePfeSchema = require("../../model/StagePfeModel/StagePfeModel");

function getStagePfeModel(dbConnection) {
  return (
    dbConnection.models.StagePfe ||
    dbConnection.model("StagePfe", stagePfeSchema)
  );
}

const createStagePfe = async (stagePfe, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.create(stagePfe);
};

const getStagesPfe = async (dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.find()
    .populate("etudiant")
    .populate("binome")
    .populate("encadrant_univ1")
    .populate("encadrant_univ2")
    .populate("societe")
    .populate("rapporteur1")
    .populate("rapporteur2")
    .populate("chef_jury")
    .populate("invite1")
    .populate("examinateur1")
    .populate("examinateur2")
    .populate({
      path: "type_stage",
      populate: {
        path: "classes",
        model: "Classe", // Ensure this is the correct model name
      },
    });
};

const updateStagePfe = async (id, updateData, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteStagePfe = async (id, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.findByIdAndDelete(id);
};

const updateJuryAssignment = async (id, updateFields, db) => {
  const StagePfe = getStagePfeModel(db);
  return await StagePfe.findByIdAndUpdate(id, updateFields, { new: true });
};

// const getDisponibiliteStage = async (date, heureDebut, heureFin, avecSoutenance, dbName) => {
//   const StagePfe = await getStagePfeModel(dbName);
//   //TODO: Implement logic to check availability based on date, heureDebut, heureFin, and avecSoutenance
//   // This is a placeholder implementation. You need to replace it with actual logic.

//   const stages = await StagePfe.find();
//   return stages.filter(stage => {
//     const stageDate = new Date(stage.date);
//     const startTime = new Date(stageDate.setHours(heureDebut.split(':')[0], heureDebut.split(':')[1]));
//     const endTime = new Date(stageDate.setHours(heureFin.split(':')[0], heureFin.split(':')[1]));

//     if (avecSoutenance === "Oui") {
//       return stage.heure_debut >= startTime && stage.heure_fin <= endTime;
//     } else {
//       return stage.date >= startTime && stage.date <= endTime;
//     }
//   });
// };

// DAO
const getDisponibiliteStage = async (date, heureDebut, heureFin, avecSoutenance, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);

  // Convert string inputs to Date ranges
  const startTime = new Date(`${date}T${heureDebut}`);
  const endTime = new Date(`${date}T${heureFin}`);

  const filter = {
    ...(avecSoutenance === "Oui" && {
      date_soutenance: date,
      $or: [
        {
          $and: [
            { heure_debut: { $lte: heureDebut } },
            { heure_fin: { $gt: heureDebut } },
          ],
        },
        {
          $and: [
            { heure_debut: { $lt: heureFin } },
            { heure_fin: { $gte: heureFin } },
          ],
        },
        {
          $and: [
            { heure_debut: { $gte: heureDebut } },
            { heure_fin: { $lte: heureFin } },
          ],
        },
      ],
    }),
  };

  return await StagePfe.find(filter).populate([
    "etudiant",
    "binome",
    "salle",
    "rapporteur1",
    "rapporteur2",
    "examinateur1",
    "examinateur2",
    "invite1",
    "invite2",
    "chef_jury",
  ]);
};


module.exports = {
  createStagePfe,
  getStagesPfe,
  updateStagePfe,
  deleteStagePfe,
  updateJuryAssignment,
  getDisponibiliteStage
};
