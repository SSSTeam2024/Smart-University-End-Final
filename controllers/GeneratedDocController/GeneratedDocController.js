const generatedDocService = require("../../services/GeneratedDocServices/GeneratedDocServices");

const saveGeneratedDoc = async (req, res) => {
  try {
    const {
      personnel,
      etudiant,
      enseignant,
      model,
      body,
      date_generation,
      num_ordre,
      num_qr_code,
    } = req.body;

    const generatedDoc = await generatedDocService.saveGeneratedDoc({
      personnel,
      etudiant,
      enseignant,
      model,
      body,
      date_generation,
      num_ordre,
      num_qr_code,
    });
    res.json(generatedDoc);
  } catch (error) {
    console.error(error);
  }
};

const getGeneratedDocsByModelId = async (req, res) => {
  try {
    let number = {
      value: "",
    };

    const generatedDocs = await generatedDocService.getGeneratedDocsByModelId(
      req.params.id
    );
    if (!generatedDocs) {
      return res
        .status(404)
        .json({
          message: "No generated docs according to the provided model!",
        });
    }

    if (generatedDocs.length === 0) {
      number.value = "01";
    } else {
      number.value = (generatedDocs.length + 1).toString().padStart(2, "0");
    }

    res.status(200).json(number);
  } catch (error) {
    console.error(
      "Error fetching Generated docs by the provided model ID:",
      error
    );
    res.status(500).json({ message: error.message });
  }
};

const getGeneratedDocsByQrCode = async (req, res) => {
  try {
    const generatedDoc = await generatedDocService.getGenerartedDocsByQrCode(req.params.num_qr_code);
    res.status(200).json(generatedDoc);
  } catch (error) {
    console.error("Error fetching Generated docs by QR Code:", error);
    res.status(500).json({ message: error.message });
  }
};

// const getAllAbsencesPersonnels = async (req, res) => {
//   try {
//     const absencePersonnel = await absencePersonnelService.getAllAbsencesPersonnels();
//     res.status(200).json(absencePersonnel);
//   } catch (error) {
//     console.error("Error fetching all absencePersonnel", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateAbsencePersonnelById = async (req, res) => {
//   try {
//     const absencePersonnelId = req.body._id;
//     const {  personnel, jour, seance, status } = req.body;

//     const updatedAbsencePersonnel = await absencePersonnelService.updateAbsencePersonnel(absencePersonnelId, {
//       personnel,
//       jour,
//       seance,
//       status
//     });

//     if (!updatedAbsencePersonnel) {
//       return res.status(404).send("Absence Personnel not found!");
//     }
//     res.json(updatedAbsencePersonnel);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

// const deleteAbsencePersonnel = async (req, res) => {
//   try {
//     const deletedAbsencePersonnel = await absencePersonnelService.deleteAbsencePersonnel(req.body._id);
//     if (!deletedAbsencePersonnel) {
//       return res.status(404).json({ message: 'absence Personnel not found' });
//     }
//     res.status(200).json({ message: 'absence Personnel deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting absence Personnel", error);
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  saveGeneratedDoc,
  getGeneratedDocsByModelId,
  getGeneratedDocsByQrCode
  // getAllAbsencesPersonnels,
  // updateAbsencePersonnelById,
  // deleteAbsencePersonnel
};
