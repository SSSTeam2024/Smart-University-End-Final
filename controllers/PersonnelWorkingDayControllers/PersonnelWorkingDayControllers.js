const PersonnelWorkingDayServices = require("../../services/PersonnelWorkingDayServices/PersonnelWorkingDayServices");

const addPersonnelWorkingDay = async (req, res) => {
  try {
    const {
      name,
      day_start_time,
      day_end_time,
      daily_pause_start,
      daily_pause_end,
      period_start,
      period_end,
      part_time,
    } = req.body;

    const personnelWorkingDay =
      await PersonnelWorkingDayServices.createPersonnelWorkingDay({
        name,
        day_start_time,
        day_end_time,
        daily_pause_start,
        daily_pause_end,
        period_start,
        period_end,
        part_time,
      });
    res.json(personnelWorkingDay);
  } catch (error) {
    console.error(error);
  }
};

const updatePersonnelWorkingDay = async (req, res) => {
  try {
    const personnelWorkingDayId = req.params.id;
    const {
      name,
      day_start_time,
      day_end_time,
      daily_pause_start,
      daily_pause_end,
      period_start,
      period_end,
      part_time,
    } = req.body;

    const updatePersonnelWorkingDay =
      await PersonnelWorkingDayServices.updatePersonnelWorkingDay(
        personnelWorkingDayId,
        {
          name,
          day_start_time,
          day_end_time,
          daily_pause_start,
          daily_pause_end,
          period_start,
          period_end,
          part_time,
        }
      );

    if (!updatePersonnelWorkingDay) {
      return res.status(404).send("Personnel Working Day not found!");
    }
    res.json(updatePersonnelWorkingDay);
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

const deletePersonnelWorkingDay = async (req, res) => {
  try {
    const personnelWorkingDayId = req.params.id;

    const deletedPersonnelWorkingDay =
      await PersonnelWorkingDayServices.deletePersonnelWorkingDay(
        personnelWorkingDayId
      );

    if (!deletedPersonnelWorkingDay) {
      return res.status(404).send("Personnel Working Day not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPersonnelWorkingDay,
  updatePersonnelWorkingDay,
  addPersonnelWorkingDay,
  deletePersonnelWorkingDay,
};
