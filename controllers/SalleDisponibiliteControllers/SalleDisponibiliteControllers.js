const salleDisponibiliteService = require("../../services/SalleDisponibiliteServices/SalleDisponibiliteServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const getFullyOrPartialAvailableRoomsByTimeInterval = async (req, res) => {
  try {
    const { heure_debut, heure_fin, jour, searchedAvailability, sessionType } =
      req.body;

    let disponibilites;
    if (sessionType === "1") {
      disponibilites =
        await salleDisponibiliteService.getDisponibiliteSallesByTimeInterval(
          { heure_debut, heure_fin, jour, searchedAvailability },
          useNewDb(req)
        );
    } else {
      disponibilites =
        await salleDisponibiliteService.getFullyOrPartialAvailableRoomsByTimeInterval(
          { heure_debut, heure_fin, jour },
          useNewDb(req)
        );
    }

    if (!disponibilites) {
      return res.status(404).send("Disponibilite Salle not found");
    }
    res.json(disponibilites);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllDisponibiliteSalles = async (req, res) => {
  try {
    const disponibiliteSalles =
      await salleDisponibiliteService.getAllDisponibiliteSalles(useNewDb(req));
    res.json(disponibiliteSalles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getFullyOrPartialAvailableRoomsByTimeInterval,
  getAllDisponibiliteSalles,
};
