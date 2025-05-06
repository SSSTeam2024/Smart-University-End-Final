const demandeEtudiantService = require("../../services/DemandeEtudiantServices/DemandeEtudiantServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDemandeEtudiant = async (req, res) => {
  try {
    const DemandeEtudiant = await demandeEtudiantService.createDemandeEtudiant(
      req.body,
      useNewDb(req)
    );
    res.status(201).json(DemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getAllDemandeEtudiants = async (req, res) => {
//   try {
//     const DemandeEtudiants = await demandeEtudiantService.getAllDemandeEtudiants();
//     res.status(200).json(DemandeEtudiants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllDemandeEtudiants = async (req, res) => {
  try {
    const DemandeEtudiants =
      await demandeEtudiantService.getAllDemandeEtudiants(useNewDb(req));
    res.status(200).json(DemandeEtudiants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeEtudiantById = async (req, res) => {
  try {
    const DemandeEtudiant = await demandeEtudiantService.getDemandeEtudiantById(
      req.params.id,
      useNewDb(req)
    );
    if (!DemandeEtudiant) {
      return res.status(404).json({ message: "DemandeEtudiant not found" });
    }
    res.status(200).json(DemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandeEtudiant = async (req, res) => {
  try {
    const updatedDemandeEtudiant =
      await demandeEtudiantService.updateDemandeEtudiant(
        req.body._id,
        req.body,
        useNewDb(req)
      );
    if (!updatedDemandeEtudiant) {
      return res.status(404).json({ message: "DemandeEtudiant not found" });
    }
    res.status(200).json(updatedDemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandeEtudiant = async (req, res) => {
  try {
    const deletedDemandeEtudiant =
      await demandeEtudiantService.deleteDemandeEtudiant(
        req.params.id,
        useNewDb(req)
      );
    if (!deletedDemandeEtudiant) {
      return res.status(404).json({ message: "DemandeEtudiant not found" });
    }
    res.status(200).json({ message: "DemandeEtudiant deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const demandes = await demandeEtudiantService.getDemandesByStudentId(
      studentId,
      useNewDb(req)
    );
    res.json(demandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching demandes by student ID" });
  }
};

const deleteManyDemandeEtudiant = async (req, res) => {
  try {
    const demandeIds = req.body.ids;

    if (!demandeIds || demandeIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteDemandeResult =
      await demandeEtudiantService.deleteManyDemandesEtudiants(
        useNewDb(req),
        demandeIds
      );

    if (deleteDemandeResult.deletedCount === 0) {
      return res.status(404).send("No Demandes found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  deleteManyDemandeEtudiant,
};
