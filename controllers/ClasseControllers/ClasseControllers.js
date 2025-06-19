const classeService = require("../../services/ClasseServices/ClasseServices");
const classeDao = require("../../dao/ClasseDao/ClasseDao");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addClasse = async (req, res) => {
  try {
    const {
      niveau_classe,
      departement,
      nom_classe_ar,
      nom_classe_fr,
      groupe_number,
    } = req.body;

    const classeJson = await classeService.createClasse(
      {
        niveau_classe,
        departement,
        nom_classe_ar,
        nom_classe_fr,
        groupe_number,
      },
      useNewDb(req)
    );
    res.json(classeJson);
  } catch (error) {
    console.error(error);
  }
};

const updateClasseById = async (req, res) => {
  try {
    const {
      _id,
      niveau_classe,
      departement,
      nom_classe_ar,
      nom_classe_fr,
      groupe_number,
      parcours,
      semestres,
      matieres,
    } = req.body;

    const updatedClasse = await classeService.updateClasse(
      _id,
      {
        niveau_classe,
        departement,
        nom_classe_ar,
        nom_classe_fr,
        groupe_number,
        parcours,
        semestres,
        matieres,
      },
      useNewDb(req)
    );

    if (!updatedClasse) {
      return res.status(404).send("Classe not found!");
    }
    res.json(updatedClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getClasseById = async (req, res) => {
  try {
    const classeId = req.params.id;

    const getClasse = await classeService.getClasseById(
      classeId,
      useNewDb(req)
    );

    if (!getClasse) {
      return res.status(404).send("Classe not found");
    }
    res.json(getClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classeService.getClasses(useNewDb(req));
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteClasseById = async (req, res) => {
  try {
    const classeId = req.params.id;
    console.log(`Received request to delete classe with ID: ${classeId}`);

    const deletedClasse = await classeService.deleteClasseById(
      classeId,
      useNewDb(req)
    );

    if (!deletedClasse) {
      return res.status(404).send("Classe not found");
    }

    res
      .status(200)
      .json({ message: "Classe deleted successfully", data: deletedClasse });
  } catch (error) {
    console.error("Error in deleteClasseById controller:", error);
    res.status(500).send(error.message);
  }
};

async function assignMatieresToClasseController(req, res, next) {
  const classeId = req.params.classeId;
  const matiereIds = req.body.matiereIds;

  try {
    const updatedClasse = await classeService.assignMatieresToClasse(
      classeId,
      matiereIds,
      useNewDb(req)
    );
    res.status(200).json(updatedClasse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteAssignedMatiereFromClasse = async (req, res) => {
  const { classeId, matiereId } = req.params;

  try {
    const updatedClasse = await classeDao.deleteAssignedMatiereFromClasse(
      classeId,
      matiereId,
      useNewDb(req)
    );
    res.json(updatedClasse);
  } catch (error) {
    console.error("Error deleting assigned matiere from classe:", error);
    res.status(500).json({ error: "Server error" });
  }
};

async function getAssignedMatieres(req, res) {
  const { classeId } = req.params;

  try {
    const matieres = await classeService.getAssignedMatieres(
      classeId,
      useNewDb(req)
    );
    res.json(matieres);
  } catch (error) {
    console.error("Error fetching assigned matieres:", error);
    res.status(500).json({ error: "Server error" });
  }
}

const getAllClassesByTeacher = async (req, res) => {
  try {
    const { teacherId, semestre } = req.body;
    const classes = await classeService.getClassesByTeacherId(
      teacherId,
      semestre,
      useNewDb(req)
    );
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getClasseByValue = async (req, res) => {
  try {
    const { nom_classe_ar, nom_classe_fr } = req.body;

    if (!nom_classe_ar || !nom_classe_fr) {
      return res
        .status(400)
        .json({ message: "nom_classe_ar and nom_classe_fr are required" });
    }

    const classeValue = await classeService.getClasseByValue(
      {
        nom_classe_ar,
        nom_classe_fr,
      },
      useNewDb(req)
    );

    if (!classeValue) {
      return res.json(null);
    }

    res.json({
      id: classeValue._id,
      nom_classe_ar: classeValue.nom_classe_ar,
      nom_classe_fr: classeValue.nom_classe_fr,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// const assignParcoursToClasse = async (req, res) => {
//   try {
//     const { classeId, parcoursId } = req.params;
//     const updatedClasse = await classeService.assignParcoursToClasse(
//       classeId,
//       parcoursId
//     );

//     if (!updatedClasse) {
//       return res.status(404).json({ message: "Classe not found" });
//     }

//     res.status(200).json({
//       message: "Parcours assigned successfully",
//       classe: updatedClasse,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const assignParcoursToClasse = async (req, res) => {
  try {
    const { classeId, parcoursId } = req.params;
    const { semestres } = req.body; // ✅ Extract semestres from request body

    const updatedClasse = await classeService.assignParcoursToClasse(
      classeId,
      parcoursId,
      semestres, // ✅ Pass semestres to service
      useNewDb(req)
    );

    if (!updatedClasse) {
      return res.status(404).json({ message: "Classe not found" });
    }

    res.status(200).json({
      message: "Parcours assigned successfully",
      classe: updatedClasse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllClassesByNiveauId = async (req, res) => {
  try {
    const { niveauId } = req.body;
    const classes = await classeService.getClassesByNiveauId(
      niveauId,
      useNewDb(req)
    );
    res.json(classes);
  } catch (error) {
    console.error(
      "Error getting classes by niveau id in controllers : ",
      error
    );
    res.status(500).send(error.message);
  }
};

module.exports = {
  addClasse,
  updateClasseById,
  getClasseById,
  getAllClasses,
  deleteClasseById,
  assignMatieresToClasseController,
  deleteAssignedMatiereFromClasse,
  getAssignedMatieres,
  getAllClassesByTeacher,
  getClasseByValue,
  assignParcoursToClasse,
  getAllClassesByNiveauId,
};
