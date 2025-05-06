const servicePersonnelService = require("../../services/ServicePersonnelServices/ServicePersonnelServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const addServicePersonnel = async (req, res) => {
  try {
    const { service_fr, service_ar } = req.body;

    const servicePersonnel =
      await servicePersonnelService.registerServicePersonnel(
        {
          service_fr,
          service_ar,
        },
        useNewDb(req)
      );
    res.json(servicePersonnel);
  } catch (error) {
    console.error(error);
  }
};

const updateServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;
    const { service_fr, service_ar } = req.body;

    const updatedServicePersonnel =
      await servicePersonnelService.updateServicePersonnelDao(
        servicePersonnelId,
        {
          service_fr,
          service_ar,
        },
        useNewDb(req)
      );

    if (!updatedServicePersonnel) {
      return res.status(404).send("Service Personnel not found!");
    }
    res.json(updatedServicePersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;

    const getEtatPersonnel =
      await servicePersonnelService.getServicePersonnelDaoById(
        servicePersonnelId,
        useNewDb(req)
      );

    if (!getEtatPersonnel) {
      return res.status(404).send("Service Personnel not found");
    }
    res.json(getEtatPersonnel);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllServicePersonnel = async (req, res) => {
  try {
    const servicePersonnels =
      await servicePersonnelService.getServicesPersonnelDao(useNewDb(req));
    res.json(servicePersonnels);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteServicePersonnelById = async (req, res) => {
  try {
    const servicePersonnelId = req.params.id;

    const deletedServicePersonnel =
      await servicePersonnelService.deleteServicePersonnelDao(
        servicePersonnelId,
        useNewDb(req)
      );

    if (!deletedServicePersonnel) {
      return res.status(404).send("Service Personnel not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getServiceByValue = async (req, res) => {
  try {
    const { service_fr, service_ar } = req.body;

    if (!service_fr || !service_ar) {
      return res
        .status(400)
        .json({ message: "service_ar and service_fr are required" });
    }

    const serviceValue = await servicePersonnelService.getServiceByValue(
      {
        service_fr,
        service_ar,
      },
      useNewDb(req)
    );

    if (!serviceValue) {
      return res.json(null);
    }

    res.json({
      id: serviceValue._id,
      service_fr: serviceValue.service_fr,
      service_ar: serviceValue.service_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteServicePersonnelById,
  getAllServicePersonnel,
  getServicePersonnelById,
  updateServicePersonnelById,
  addServicePersonnel,
  getServiceByValue,
};
