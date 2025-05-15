const noteProService = require("../../services/NoteProServices/NoteProService");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createNotePro = async (req, res) => {
  try {
    const { notes } = req.body;

    let NotePro = await noteProService.createNotePro(
      {
        notes,
      },
      useNewDb(req)
    );

    res.status(201).json(NotePro);
  } catch (error) {
    console.error("Error creating NotePro:", error);
    res.status(500).send({ message: error.message });
  }
};

// const getAllNotesPro = async (req, res) => {
//   try {
//     const notesPro = await noteProService.getAllNotesPro();
//     res.status(200).json(notesPro);
//   } catch (error) {
//     console.error("Error fetching all notes Pro:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllNotesPro = async (req, res) => {
  try {
    const notesPro = await noteProService.getAllNotesPro(useNewDb(req));
    res.status(200).json(notesPro);
  } catch (error) {
    console.error("Error fetching all notes Pro:", error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteProById = async (req, res) => {
  try {
    const notePro = await noteProService.getNoteProById(
      req.body._id,
      useNewDb(req)
    );
    if (!notePro) {
      return res.status(404).json({ message: "notePro not found" });
    }
    res.status(200).json(notePro);
  } catch (error) {
    console.error("Error fetching notePro by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getNoteProByYear = async (req, res) => {
  try {
    const { annee } = req.body;
    const notePro = await noteProService.getNoteProByYear(annee, useNewDb(req));
    if (!notePro) {
      return res.status(404).json({ message: "notePro not found" });
    }
    res.status(200).json(notePro);
  } catch (error) {
    console.error("Error fetching notePro by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateNotePro = async (req, res) => {
  try {
    const {
      _id,
      personnel,
      note1,
      note2,
      note3,
      note4,
      note5,
      note_finale,
      annee,
      observation,
    } = req.body;

    const updatedNotePro = await noteProService.updateNotePro(
      _id,
      {
        personnel,
        note1,
        note2,
        note3,
        note4,
        note5,
        note_finale,
        annee,
        observation,
      },
      useNewDb(req)
    );

    if (!updatedNotePro) {
      return res.status(404).json({ message: "notePro not found" });
    }

    res.status(200).json(updatedNotePro);
  } catch (error) {
    console.error("Error updating notePro :", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteManyNote = async (req, res) => {
  try {
    const noteIds = req.body.ids;

    if (!noteIds || noteIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteNoteResult = await noteProService.deleteManyNotePro(
      useNewDb(req),
      noteIds
    );

    if (deleteNoteResult.deletedCount === 0) {
      return res.status(404).send("No Notes found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getNotesProByPersonnelId = async (req, res) => {
  try {
    const noteId = req.params.id;

    const notes = await noteProService.getNotesProByPersonnelId(
      noteId,
      useNewDb(req)
    );

    if (!notes) {
      return res.status(404).send("Aucun Notes pour ce personnel !!");
    }
    res.json(notes);
  } catch (error) {
    console.error(
      "Error while fetching notes by personnel id in controllers",
      error
    );
    res.status(500).send(error.message);
  }
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  deleteManyNote,
  getNoteProByYear,
  getNotesProByPersonnelId,
};
