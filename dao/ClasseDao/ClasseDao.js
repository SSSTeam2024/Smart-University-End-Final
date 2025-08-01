const matiereSchema = require("../../model/MatiereModel/MatiereModel");
const classeSchema = require("../../model/ClasseModels/ClasseModels");
const typeStageSchema = require("../../model/TypeStageModel/TypeStageModel");

function getTypeStageModel(dbConnection) {
  return (
    dbConnection.models.TypeStage ||
    dbConnection.model("TypeStage", typeStageSchema)
  );
}
function getMatiereModel(dbConnection) {
  return (
    dbConnection.models.Matiere || dbConnection.model("Matiere", matiereSchema)
  );
}

function getClasseModel(dbConnection) {
  return (
    dbConnection.models.Classe || dbConnection.model("Classe", classeSchema)
  );
}

const createClasse = async (classe, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    return await Classe.create(classe);
  } catch (error) {
    console.error("Error creating classe:", error);
    throw error;
  }
};

const getClasses = async (dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    const classes = await Classe.find()
      .populate({
        path: "niveau_classe",
        populate: [
          {
            path: "sections",
            model: "SectionClasse",
            populate: {
              path: "departements",
              model: "Departement",
              populate: {
                path: "sections",
                model: "SectionClasse",
              },
            },
          },
          {
            path: "cycles",
            model: "Cycle",
          },
        ],
      })
      .populate("departement")
      .populate({
        path: "parcours", // Populating parcours
        populate: {
          path: "modules", // Populating modules inside parcours
          model: "ModuleParcours", // Assuming modules are part of the `ModuleParcours` model
          populate: {
            path: "matiere", // Populating matiere inside ModuleParcours
            model: "Matiere", // Assuming matiere is a reference to the `Matiere` model
          },
        },
      });

    return classes;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

const updateClasse = async (id, updateData, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    return await Classe.findByIdAndUpdate(id, updateData, { new: true })
      .populate("departement")
      .populate("niveau_classe")
      .populate("parcours");
  } catch (error) {
    console.error("Error updating classe:", error);
    throw error;
  }
};

const deleteClasse = async (id, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    return await Classe.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting classe:", error);
    throw error;
  }
};

const getClasseById = async (id, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    return await Classe.findById(id)
      // .populate("departement")
      // .populate("niveau_classe")
      // .populate("matieres");
      .populate({
        path: "niveau_classe",
        populate: [
          {
            path: "sections",
            model: "SectionClasse",
            populate: {
              path: "departements",
              model: "Departement",
              populate: {
                path: "sections",
                model: "SectionClasse",
              },
            },
          },
          {
            path: "cycles",
            model: "Cycle",
          },
        ],
      })
      .populate("departement")
      .populate({
        path: "parcours", // Populating parcours
        populate: {
          path: "modules", // Populating modules inside parcours
          model: "ModuleParcours", // Assuming modules are part of the `ModuleParcours` model
          populate: {
            path: "matiere", // Populating matiere inside ModuleParcours
            model: "Matiere", // Assuming matiere is a reference to the `Matiere` model
          },
        },
      });
  } catch (error) {
    console.error("Error fetching classe by ID:", error);
    throw error;
  }
};

async function assignMatieresToClasse(classeId, matiereIds, dbName) {
  try {
    const Classe = await getClasseModel(dbName);
    const classe = await Classe.findById(classeId);

    if (!classe) {
      throw new Error("Classe not found");
    }

    const existingMatieres = new Set(
      classe.matieres.map((matiere) => matiere.toString())
    );
    const uniqueMatiereIds = matiereIds.filter(
      (id) => !existingMatieres.has(id.toString())
    );

    if (uniqueMatiereIds.length === 0) {
      return classe;
    }

    classe.matieres.push(...uniqueMatiereIds);
    await classe.save();

    const matieres = await MatiereModel.find({
      _id: { $in: uniqueMatiereIds },
    });
    for (let matiere of matieres) {
      if (!matiere.classes.includes(classeId)) {
        matiere.classes.push(classeId);
        await matiere.save();
      }
    }

    return classe;
  } catch (error) {
    throw new Error(`Error assigning matieres to classe: ${error.message}`);
  }
}

const deleteAssignedMatiereFromClasse = async (classeId, matiereId, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);
    const Matiere = await getMatiereModel(dbName);
    const classe = await Classe.findById(classeId);
    if (!classe) {
      throw new Error("Classe not found");
    }

    // Remove matiereId from classe.matieres array ensuring uniqueness
    const updatedMatieres = new Set(classe.matieres.map((m) => m.toString())); // Using a set for uniqueness
    updatedMatieres.delete(matiereId);
    classe.matieres = Array.from(updatedMatieres);

    await classe.save();

    // Update corresponding matiere document
    const matiere = await Matiere.findById(matiereId);
    if (matiere) {
      matiere.classes = matiere.classes.filter(
        (c) => c.toString() !== classeId
      );
      await matiere.save();
    }

    return classe; // Return updated classe object
  } catch (error) {
    throw new Error(
      `Error deleting assigned matiere from classe: ${error.message}`
    );
  }
};

async function getAssignedMatieres(classeId, dbName) {
  try {
    const Classe = await getClasseModel(dbName);
    const classe = await Classe.findById(classeId).populate("matieres");
    if (!classe) {
      throw new Error("Classe not found");
    }
    return classe.matieres;
  } catch (error) {
    throw new Error(`Error fetching assigned matieres: ${error.message}`);
  }
}

const getClasseByValue = async (nom_classe_ar, nom_classe_fr, dbName) => {
  const Classe = await getClasseModel(dbName);
  return await Classe.findOne({ nom_classe_ar, nom_classe_fr });
};

const assignParcoursToClasse = async (
  classeId,
  parcoursId,
  semestres,
  dbName
) => {
  if (!classeId || !parcoursId || !semestres) {
    throw new Error("Classe ID, Parcours ID, and Semestres are required");
  }

  try {
    const Classe = await getClasseModel(dbName);
    const updatedClasse = await Classe.findByIdAndUpdate(
      classeId,
      { parcours: parcoursId, semestres: semestres },
      { new: true }
    ).populate("parcours");
    console.log("updatedClasse", updatedClasse);
    return updatedClasse;
  } catch (error) {
    console.error("Error assigning parcours to classe:", error);
    throw error;
  }
};

const getClassesByNiveauId = async (niveauId, dbName) => {
  try {
    const Classe = await getClasseModel(dbName);

    const classes = await Classe.find({
      niveau_classe: niveauId,
    }).exec();

    return classes;
  } catch (error) {
    console.error("Error while fetching classes by niveau id in dao", error);
  }
};

module.exports = {
  createClasse,
  getClasses,
  updateClasse,
  deleteClasse,
  getClasseById,
  assignMatieresToClasse,
  deleteAssignedMatiereFromClasse,
  getAssignedMatieres,
  getClasseByValue,
  assignParcoursToClasse,
  getClassesByNiveauId,
};
