const demandeEtudiantService = require("../../services/DemandeEtudiantServices/DemandeEtudiantServices");
const globalFunctions = require("../../utils/globalFunctions")
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
    return res.json(DemandeEtudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const updateDemandeEtudiant = async (req, res) => {
//   try {
//     const updatedDemandeEtudiant =
//       await demandeEtudiantService.updateDemandeEtudiant(
//         req.body._id,
//         req.body,
//         useNewDb(req)
//       );
//     if (!updatedDemandeEtudiant) {
//       return res.status(404).json({ message: "DemandeEtudiant not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateDemandeEtudiant = async (req, res) => {
  const {
    studentId,
    title,
    description,
    piece_demande,
    langue,
    nombre_copie,
    response,
    FileBase64,
    FileExtension,
    status_history,
    current_status,
    generated_doc,
    extra_data,
    added_by
  } = req.body;

  const filePath = "files/demandeEtudiant/";

  let file = globalFunctions.generateUniqueFilename(
    FileExtension,
    "raison_file"
  );

  console.log(file)
  console.log("FileExtension", FileExtension)

  let documents = [];

  if (FileExtension !== '' && FileExtension !== undefined && FileExtension !== null) {
    documents.push({
      base64String: FileBase64,
      extension: FileExtension,
      name: file,
      path: filePath,
    })
  }
  try {
    let updatedDemandeEtudiant;
    if (FileExtension == '' || FileExtension === undefined || FileExtension === null) {
      updatedDemandeEtudiant = await demandeEtudiantService.updateDemandeEtudiant(
        req.body._id,
        {
          studentId,
          title,
          description,
          piece_demande,
          langue,
          nombre_copie,
          response,
          status_history,
          current_status,
          generated_doc,
          extra_data,
          added_by
        }, documents,
        useNewDb(req)
      );
    } else {
      updatedDemandeEtudiant = await demandeEtudiantService.updateDemandeEtudiant(
        req.body._id,
        {
          studentId,
          title,
          description,
          piece_demande,
          langue,
          nombre_copie,
          response,
          file,
          status_history,
          current_status,
          generated_doc,
          extra_data,
          added_by
        }, documents,
        useNewDb(req)
      );
    }

    if (!updatedDemandeEtudiant) {
      return res.status(404).json({ message: "Demand etudiant not found" });
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

const handleDemandeEtudiant = async (req, res) => {
  try {
    const { demandId, modelName, modelLangage, status_history } = req.body;
    const updatedDemandeEtudiant =
      await demandeEtudiantService.handleDemandeEtudiant(
        demandId,
        modelName,
        modelLangage,
        status_history,
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

const getDemandesByAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const demandes = await demandeEtudiantService.getDemandesByAdminId(adminId, useNewDb(req));
    res.status(200).json(demandes);
  } catch (err) {
    console.error("Error fetching demandes by admin:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};



module.exports = {
  createDemandeEtudiant,
  getAllDemandeEtudiants,
  getDemandeEtudiantById,
  updateDemandeEtudiant,
  deleteDemandeEtudiant,
  getDemandesByStudentId,
  handleDemandeEtudiant,
  deleteManyDemandeEtudiant,
  getDemandesByAdmin
};
