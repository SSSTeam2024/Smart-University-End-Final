const demandePersonnelService = require("../../services/demandePersonnelServices/demandePersonnelServices");
const globalFunctions = require("../../utils/globalFunctions")
function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createDemandePersonnel = async (req, res) => {
  try {
    const DemandePersonnel =
      await demandePersonnelService.createDemandePersonnel(
        req.body,
        useNewDb(req)
      );
    res.status(201).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandesByPersonnelId = async (req, res) => {
  try {
    const personnelId = req.params.id;

    const demandes = await demandePersonnelService.getDemandesByPersonnelId(
      personnelId,
      useNewDb(req)
    );

    if (!demandes) {
      return res.status(404).send("Aucun Demande pour ce personnel !!");
    }
    res.json(demandes);
  } catch (error) {
    console.error(
      "Error while fetching demandes by personnel id in controllers",
      error
    );
    res.status(500).send(error.message);
  }
};

const getAllDemandePersonnels = async (req, res) => {
  try {
    const DemandePersonnels =
      await demandePersonnelService.getAllDemandePersonnels(useNewDb(req));
    res.status(200).json(DemandePersonnels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandePersonnelById = async (req, res) => {
  try {
    const DemandePersonnel =
      await demandePersonnelService.getDemandePersonnelById(
        req.params.id,
        useNewDb(req)
      );
    if (!DemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json(DemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const updateDemandePersonnel = async (req, res) => {
//   try {
//     const updatedDemandePersonnel =
//       await demandePersonnelService.updateDemandePersonnel(
//         req.body._id,
//         req.body,
//         useNewDb(req)
//       );
//     if (!updatedDemandePersonnel) {
//       return res.status(404).json({ message: "DemandePersonnel not found" });
//     }
//     res.status(200).json(updatedDemandePersonnel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const updateDemandePersonnel = async (req, res) => {
  const {
    personnelId,
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

  const filePath = "files/demandePersonnel/";

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
    let updatedDemandePersonnel;
    if (FileExtension == '') {
      updatedDemandePersonnel = await demandePersonnelService.updateDemandePersonnel(
        req.body._id,
        {
          personnelId,
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
      updatedDemandePersonnel = await demandePersonnelService.updateDemandePersonnel(
        req.body._id,
        {
          personnelId,
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

    if (!updatedDemandePersonnel) {
      return res.status(404).json({ message: "Demande personnel not found" });
    }
    res.status(200).json(updatedDemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteDemandePersonnel = async (req, res) => {
  try {
    const deletedDemandePersonnel =
      await demandePersonnelService.deleteDemandePersonnel(
        req.params.id,
        useNewDb(req)
      );
    if (!deletedDemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json({ message: "DemandePersonnel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleDemandePersonnel = async (req, res) => {
  try {
    const { demandId, modelName, modelLangage, status_history } = req.body;
    const updatedDemandePersonnel =
      await demandePersonnelService.handleDemandePersonnel(
        demandId,
        modelName,
        modelLangage,
        status_history,
        useNewDb(req)
      );

    if (!updatedDemandePersonnel) {
      return res.status(404).json({ message: "DemandePersonnel not found" });
    }
    res.status(200).json(updatedDemandePersonnel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteManyDemandePersonnel = async (req, res) => {
  try {
    const demandeIds = req.body.ids;

    if (!demandeIds || demandeIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteDemandeResult =
      await demandePersonnelService.deleteManyDemandePersonnel(
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
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
  handleDemandePersonnel,
  getDemandesByPersonnelId,
};
