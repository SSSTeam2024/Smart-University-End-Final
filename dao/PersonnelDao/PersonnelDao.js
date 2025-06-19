const personnelSchema = require("../../model/PersonnelModel/PersonnelModel");

function getPersonnelModel(dbConnection) {
  return (
    dbConnection.models.Personnel ||
    dbConnection.model("Personnel", personnelSchema)
  );
}

const createPersonnel = async (personnel, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.create(personnel);
};

const getPersonnels = async (dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel
    .find()
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service")
     .populate({
      path: "historique_positions.poste",
      model: "PostePersonnel",
    })
    .populate({
      path: "historique_positions.grade",
      model: "GradePersonnel",
    })
    .populate({
      path: "historique_positions.categorie",
      model: "CategoriePersonnel",
    }) 
    .populate({
      path: "historique_services.service",
      model: "ServicePersonnel",
    });
};

const updatePersonnel = async (id, updateData, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnel = async (id, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findByIdAndDelete(id);
};

const getPersonnelById = async (id, dbName) => {
  const personnelModel = getPersonnelModel(dbName);

  return await personnelModel
    .findById(id)
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service")
      .populate({
      path: "historique_positions.poste",
      model: "PostePersonnel",
    })
    .populate({
      path: "historique_positions.grade",
      model: "GradePersonnel",
    })
    .populate({
      path: "historique_positions.categorie",
      model: "CategoriePersonnel",
    }) 
    .populate({
      path: "historique_services.service",
      model: "ServicePersonnel",
    });
};

const assignPapierToPersonnel = async (personnelId, papierIds, dbName) => {
  try {
    const personnelModel = getPersonnelModel(dbName);
    const personnel = await personnelModel.findById(personnelId);
    if (!personnel) {
      throw new Error("Personnel not found");
    }
    for (const paperId of papierIds) {
      personnel.papers.push(paperId);
    }

    await personnel.save();
    return personnel;
  } catch (error) {
    console.error("Error in assignPapierToPersonnel:", error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

//! Login api
const findPersonnelByToken = async (token, dbName) => {
  let api_token = token;
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findOne({ api_token });
};

const updateJwtToken = async (id, token, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

const logoutPersonnel = async (personnelId, dbName) => {
  try {
    const personnelModel = getPersonnelModel(dbName);
    return await personnelModel.findByIdAndUpdate(
      personnelId,
      { api_token: null },
      { new: true }
    );
  } catch (error) {
    console.error("Error logging out student:", error);
    throw error;
  }
};

const getPersonnelByCIN = async (cin_personnel, dbName) => {
  try {
    const personnelModel = getPersonnelModel(dbName);
    const personnel = await personnelModel.findOne({
      num_cin: cin_personnel,
    });
    return personnel;
  } catch (error) {
    console.error("Error while getting personnel by cin");
    throw error;
  }
};

module.exports = {
  createPersonnel,
  getPersonnels,
  updatePersonnel,
  getPersonnelById,
  deletePersonnel,
  assignPapierToPersonnel,
  findPersonnelByToken,
  updateJwtToken,
  logoutPersonnel,
  getPersonnelByCIN,
};
