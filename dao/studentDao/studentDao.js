const etudiantSchema = require("../../model/EtudiantModel/EtudiantModel");

function getEtudiantModel(dbConnection) {
  return (
    dbConnection.models.Etudiant ||
    dbConnection.model("Etudiant", etudiantSchema)
  );
}

const createEudiant = async (etudiant, dbName) => {
  const etudiantModel = await getEtudiantModel(dbName);
  return await etudiantModel.create(etudiant);
};

const getEtudiantById = async (id, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const etudiant = await etudiantModel
      .findById(id)
      .populate("etat_compte")
      .populate("type_inscription")
      .populate({
        path: "groupe_classe",
        populate: [
          {
            path: "niveau_classe",
            populate: {
              path: "sections",
              populate: {
                path: "departements",
                populate: {
                  path: "sections",
                },
              },
            },
          },
          {
            path: "departement",
          },
          {
            path: "matieres",
          },
        ],
      });

    return etudiant;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

const getEtudiants = async (dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const etudiants = await etudiantModel
      .find()
      .populate("etat_compte")
      .populate("type_inscription")
      .populate({
        path: "groupe_classe",
        populate: [
          {
            path: "niveau_classe",
            populate: {
              path: "sections",
              populate: {
                path: "departements",
                populate: {
                  path: "sections",
                },
              },
            },
          },
          {
            path: "departement",
          },
          {
            path: "matieres",
          },
        ],
      });

    return etudiants;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

const deleteEtudiant = async (id, dbName) => {
  const etudiantModel = await getEtudiantModel(dbName);
  return await etudiantModel.findByIdAndDelete(id);
};

const updateEtudiant = async (id, updateData, dbName) => {
  const etudiantModel = await getEtudiantModel(dbName);
  return await etudiantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const updateGroupeClasse = async (studentIds, groupeClasseId, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const result = await etudiantModel.updateMany(
      { _id: { $in: studentIds } },
      { $set: { groupe_classe: groupeClasseId } }
    );
    return result;
  } catch (error) {
    console.error("Error updating groupe_classe:", error);
    throw error;
  }
};

const getEtudiantsByIdClasse = async (classeId, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const etudiants = await etudiantModel.find({
      groupe_classe: classeId,
    });
    return etudiants;
  } catch (error) {
    console.error("Error while getting students for this classe id");
    throw error;
  }
};

const getEtudiantByCIN = async (cin_etudiant, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const etudiant = await etudiantModel.findOne({
      num_CIN: cin_etudiant,
    });
    return etudiant;
  } catch (error) {
    console.error("Error while getting student by cin");
    throw error;
  }
};

const getEtudiantByCinAndCode = async (cin_etudiant, codesecret, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    const etudiant = await etudiantModel.findOne({
      num_CIN: cin_etudiant,
      code_acces: codesecret,
    });
    if (etudiant) {
      etudiant.verified = "yes";
      await etudiant.save();
      return etudiant;
    } else {
      console.log("No Student found with these Cin and Code");
      return null;
    }
  } catch (error) {
    console.error("Error while getting student by cin and code");
  }
};

const findEtudiantByToken = async (token, dbName) => {
  let api_token = token;
  const etudiantModel = await getEtudiantModel(dbName);
  return await etudiantModel.findOne({ api_token });
};

const updateJwtToken = async (id, token, dbName) => {
  const etudiantModel = await getEtudiantModel(dbName);
  return await etudiantModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

const logoutEtudiant = async (studentId, dbName) => {
  try {
    const etudiantModel = await getEtudiantModel(dbName);
    return await etudiantModel.findByIdAndUpdate(
      studentId,
      { api_token: null },
      { new: true }
    );
  } catch (error) {
    console.error("Error logging out student:", error);
    throw error;
  }
};

module.exports = {
  createEudiant,
  getEtudiantById,
  getEtudiants,
  deleteEtudiant,
  updateEtudiant,
  updateGroupeClasse,
  getEtudiantsByIdClasse,
  getEtudiantByCIN,
  getEtudiantByCinAndCode,
  findEtudiantByToken,
  updateJwtToken,
  logoutEtudiant,
};
