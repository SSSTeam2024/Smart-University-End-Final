const demandeEnseignantService = require("../../services/demandeEnseignantServices/demandeEnseignantServices");
const globalFunctions = require("../../utils/globalFunctions")
function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDemandeEnseignant = async (req, res) => {
  try {
    const DemandeEnseignant =
      await demandeEnseignantService.createDemandeEnseignant(
        req.body,
        useNewDb(req)
      );
    res.status(201).json(DemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getAllDemandeEnseignants = async (req, res) => {
//   try {
//     const DemandeEnseignants = await demandeEnseignantService.getAllDemandeEnseignants();
//     res.status(200).json(DemandeEnseignants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllDemandeEnseignants = async (req, res) => {
  try {
    const DemandeEnseignants =
      await demandeEnseignantService.getAllDemandeEnseignants(useNewDb(req));
    res.status(200).json(DemandeEnseignants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeEnseignantById = async (req, res) => {
  try {
    const DemandeEnseignant =
      await demandeEnseignantService.getDemandeEnseignantById(
        req.params.id,
        useNewDb(req)
      );
    if (!DemandeEnseignant) {
      return res.status(404).json({ message: "DemandeEnseignant not found" });
    }
    res.status(200).json(DemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemandeEnseignant = async (req, res) => {
  const {
    enseignantId,
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

  const filePath = "files/demandeEnseignant/";

  let file = globalFunctions.generateUniqueFilename(
    FileExtension,
    "raison_file"
  );

  console.log(file)

  let documents = [];

  if (FileExtension !== '') {
    documents.push({
      base64String: FileBase64,
      extension: FileExtension,
      name: file,
      path: filePath,
    })
  }
  try {
    let updatedDemandeEnseignant;
    if (FileExtension == '') {
      updatedDemandeEnseignant = await demandeEnseignantService.updateDemandeEnseignant(
        req.body._id,
        {
          enseignantId,
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
      updatedDemandeEnseignant = await demandeEnseignantService.updateDemandeEnseignant(
        req.body._id,
        {
          enseignantId,
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

    if (!updatedDemandeEnseignant) {
      return res.status(404).json({ message: "DemandeEnseignant not found" });
    }
    res.status(200).json(updatedDemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDemandeEnseignant = async (req, res) => {
  try {
    const deletedDemandeEnseignant =
      await demandeEnseignantService.deleteDemandeEnseignant(
        req.params.id,
        useNewDb(req)
      );
    if (!deletedDemandeEnseignant) {
      return res.status(404).json({ message: "DemandeEnseignant not found" });
    }
    res.status(200).json({ message: "DemandeEnseignant deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandesByTeacherId = async (req, res) => {
  try {
    const { enseignantId } = req.params;
    const demandes = await demandeEnseignantService.getDemandesByTeacherId(
      enseignantId,
      useNewDb(req)
    );
    res.json(demandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching demandes by teacher ID" });
  }
};
const handleDemandeEnseignant = async (req, res) => {
  try {
    const { demandId, modelName, modelLangage, status_history } = req.body;

    const updatedDemandeEnseignant =
      await demandeEnseignantService.handleDemandeEnseignant(
        demandId,
        modelName,
        modelLangage,
        status_history,
        useNewDb(req)
      );

    if (!updatedDemandeEnseignant) {
      return res.status(404).json({ message: "Demande Enseignant not found" });
    }
    res.status(200).json(updatedDemandeEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteManyDemandeEnseignant = async (req, res) => {
  try {
    const demandesEnseignantIds = req.body.ids;

    if (!demandesEnseignantIds || demandesEnseignantIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteDemandesEnseignantResult =
      await demandeEnseignantService.deleteManyDemandeEnseignant(
        useNewDb(req),
        demandesEnseignantIds
      );

    if (deleteDemandesEnseignantResult.deletedCount === 0) {
      return res
        .status(404)
        .send("No Demandes Enseignant found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId,
  deleteManyDemandeEnseignant,
  handleDemandeEnseignant,
};
