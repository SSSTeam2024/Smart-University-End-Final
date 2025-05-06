const missionService = require("../../services/MissionServices/MissionServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createMission = async (req, res) => {
  try {
    const {
      motif,
      enseignant,
      personnel,
      date_affectation,
      date_fin,
      objectif,
      etat,
    } = req.body;

    if (personnel === "") {
      mission = await missionService.createMission(
        {
          motif,
          enseignant,
          date_affectation,
          date_fin,
          objectif,
          etat,
        },
        useNewDb(req)
      );
    } else {
      mission = await missionService.createMission(
        {
          motif,
          personnel,
          date_affectation,
          date_fin,
          objectif,
          etat,
        },
        useNewDb(req)
      );
    }

    res.status(201).json(mission);
  } catch (error) {
    console.error("Error creating mission:", error);
    res.status(500).send({ message: error.message });
  }
};

// const getAllMissions = async (req, res) => {
//   try {
//     const missions = await missionService.getAllMissions();
//     res.status(200).json(missions);
//   } catch (error) {
//     console.error("Error fetching all missions:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllMissions = async (req, res) => {
  try {
    const missions = await missionService.getAllMissions(useNewDb(req));
    res.status(200).json(missions);
  } catch (error) {
    console.error("Error fetching all missions:", error);
    res.status(500).json({ message: error.message });
  }
};

const getMissionById = async (req, res) => {
  try {
    const mission = await missionService.getMissionById(
      req.body._id,
      useNewDb(req)
    );
    if (!mission) {
      return res.status(404).json({ message: "mission not found" });
    }
    res.status(200).json(mission);
  } catch (error) {
    console.error("Error fetching mission by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteMission = async (req, res) => {
  try {
    const deletedMission = await missionService.deleteMission(
      req.body._id,
      useNewDb(req)
    );
    if (!deletedMission) {
      return res.status(404).json({ message: "mission not found" });
    }
    res.status(200).json({ message: "mission deleted successfully" });
  } catch (error) {
    console.error("Error deleting mission", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteManyMissions = async (req, res) => {
  try {
    const missionsIds = req.body.ids;

    if (!missionsIds || missionsIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    const deleteMissionsResult = await missionService.deleteManyMissions(
      useNewDb(req),
      missionsIds
    );

    if (deleteMissionsResult.deletedCount === 0) {
      return res.status(404).send("No Missions found with provided IDs");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  deleteMission,
  deleteManyMissions,
};
