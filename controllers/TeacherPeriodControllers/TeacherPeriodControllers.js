const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}
const createTeacherPeriod = async (req, res) => {
  try {
    const { nbr_heure, semestre, id_classe_period, id_teacher } = req.body;

    const TeacherPeriod = await teacherPeriodService.createTeacherPeriod(
      {
        nbr_heure,
        semestre,
        id_classe_period,
        id_teacher,
      },
      useNewDb(req)
    );
    res.json(TeacherPeriod);
  } catch (error) {
    console.error(error);
  }
};

const updateTeacherPeriod = async (req, res) => {
  try {
    const { id, nbr_heure } = req.body;

    const updatedTeacherPeriod = await teacherPeriodService.updateTeacherPeriod(
      id,
      nbr_heure,
      useNewDb(req)
    );

    if (!updatedTeacherPeriod) {
      return res.status(404).send("Teacher Period not found!");
    }
    res.json(updatedTeacherPeriod);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTeacherPeriod = async (req, res) => {
  try {
    const { ids_array, semestre } = req.body;
    const periods = await teacherPeriodService.getTeacherPeriod(
      ids_array,
      semestre,
      useNewDb(req)
    );
    res.json(periods);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllTeacherPeriod = async (req, res) => {
  try {
    const periods = await teacherPeriodService.getAllTeacherPeriod(
      useNewDb(req)
    );
    res.json(periods);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTeacherPeriodsByTeacherId = async (req, res) => {
  try {
    const { id, semestre } = req.body;
    const periods = await teacherPeriodService.getTeacherPeriodsByTeacherId(
      id,
      semestre,
      useNewDb(req)
    );
    res.json(periods);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const fetchPeriodsBySemesterAndTeacherId = async (req, res) => {
  const { semester, teacherId } = req.body;

  try {
    const periods = await teacherPeriodService.getPeriodsBySemesterAndTeacher(
      semester,
      teacherId,
      useNewDb(req)
    );
    res.status(200).json(periods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching periods: " + error.message });
  }
};

const deleteManyPeriods = async (req, res) => {
  try {
    const periodsIds = req.body.ids;

    if (!periodsIds || periodsIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deletePeriodsResult = await teacherPeriodService.deleteManyPeriods(
      useNewDb(req),
      periodsIds
    );

    if (deletePeriodsResult.deletedCount === 0) {
      return res.status(404).send("No Periods found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriod,
  getTeacherPeriodsByTeacherId,
  fetchPeriodsBySemesterAndTeacherId,
  getAllTeacherPeriod,
  deleteManyPeriods,
};
