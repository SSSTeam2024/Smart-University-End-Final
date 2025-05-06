const GradePersonnelService = require("../../services/GradePersonnelServices/GradePersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addGradePersonnel = async (req, res) => {
  try {
    const { grade_ar, grade_fr } = req.body;

    const gradePersonnel = await GradePersonnelService.registerGradePersonnel(
      {
        grade_ar,
        grade_fr,
      },
      useNewDb(req)
    );
    res.json(gradePersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updateGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;
    const { grade_ar, grade_fr } = req.body;

    const updatedGradePersonnel =
      await GradePersonnelService.updateGradePersonnelDao(
        GradePersonnelId,
        {
          grade_ar,
          grade_fr,
        },
        useNewDb(req)
      );

    if (!updatedGradePersonnel) {
      return res.status(404).send("Grade Personnel not found!");
    }
    res.json(updatedGradePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;

    const getGradePersonnel =
      await GradePersonnelService.getGradePersonnelDaoById(
        GradePersonnelId,
        useNewDb(req)
      );

    if (!getGradePersonnel) {
      return res.status(404).send("Grade Personnel not found");
    }
    res.json(getGradePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllGradePersonnel = async (req, res) => {
  try {
    const GradePersonnels = await GradePersonnelService.getGradesPersonnelDao(
      useNewDb(req)
    );
    res.json(GradePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteGradePersonnelById = async (req, res) => {
  try {
    const GradePersonnelId = req.params.id;

    const deletedGradePersonnel =
      await GradePersonnelService.deleteGradePersonnelDao(
        GradePersonnelId,
        useNewDb(req)
      );

    if (!deletedGradePersonnel) {
      return res.status(404).send("Grade Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getGradeByValue = async (req, res) => {
  try {
    const { grade_fr, grade_ar } = req.body;

    if (!grade_fr || !grade_ar) {
      return res
        .status(400)
        .json({ message: "grade_fr and grade_ar are required" });
    }

    const gradeValue = await GradePersonnelService.getGradeByValue(
      {
        grade_fr,
        grade_ar,
      },
      useNewDb(req)
    );

    if (!gradeValue) {
      return res.json(null);
    }

    res.json({
      id: gradeValue._id,
      grade_fr: gradeValue.grade_fr,
      grade_ar: gradeValue.grade_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteGradePersonnelById,
  getAllGradePersonnel,
  getGradePersonnelById,
  updateGradePersonnelById,
  addGradePersonnel,
  getGradeByValue,
};
