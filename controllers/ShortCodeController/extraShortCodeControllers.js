const extraShortCodeServices = require("../../services/ShortCodeServices/extraShortCodeServices");

function useNewDb(req) {
    return req.headers["x-use-new-db"] === "true";
}

const addExtraShortCode = async (req, res) => {
    try {
        const extraShortCodeDataArray = req.body; // Expecting an array of objects

        if (!Array.isArray(extraShortCodeDataArray)) {
            return res.status(400).send("Request body must be an array of objects.");
        }

        const extraShortCodes = await extraShortCodeServices.createExtraShortCode(
            extraShortCodeDataArray,
            useNewDb(req)
        );

        res.json(extraShortCodes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllShortShortCodes = async (req, res) => {
    try {
        const extraShortCodes = await extraShortCodeServices.getExtraShortCodes(useNewDb(req));
        res.json(extraShortCodes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllShortShortCodes,
    addExtraShortCode,
};
