const PersonnelWorkingDayServices = require("../../services/PersonnelWorkingDayServices/PersonnelWorkingDayServices");

const addPersonnelWorkingDay = async (req, res) => {
  try {
    const { day_start_time, day_end_time, daily_pause_start, daily_pause_end } =
      req.body;

    const personnelWorkingDay =
      await PersonnelWorkingDayServices.createPersonnelWorkingDay({
        day_start_time,
        day_end_time,
        daily_pause_start,
        daily_pause_end,
      });
    res.json(personnelWorkingDay);
  } catch (error) {
    console.error(error);
  }
};

const updatePersonnelWorkingDay = async (req, res) => {
  try {
    const { day_start_time, day_end_time, daily_pause_start, daily_pause_end } =
      req.body;

    const updatedPersonnelWorkingDay =
      await PersonnelWorkingDayServices.updatePersonnelWorkingDay({
        day_start_time,
        day_end_time,
        daily_pause_start,
        daily_pause_end,
      });

    if (!updatedPersonnelWorkingDay) {
      return res.status(404).send("Personnel Working Day not found!");
    }
    res.json(updatedPersonnelWorkingDay);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPersonnelWorkingDay = async (req, res) => {
  try {
    const personnelWorkingDay =
      await PersonnelWorkingDayServices.getPersonnelWorkingDay();
    res.json(personnelWorkingDay);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  addPersonnelWorkingDay,
};
