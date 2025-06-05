const extraShortCodeSchema = require("../../model/ShortCodeModel/extraShortCodeModel")

function getExtraShortCodeModel(dbConnection) {
    return (
        dbConnection.models.ExtraShortCode ||
        dbConnection.model("ExtraShortCode", extraShortCodeSchema)
    );
}

const createExtraShortCode = async (extraShortCodes, dbName) => {
    const ExtraShortCode = await getExtraShortCodeModel(dbName);
    return await ExtraShortCode.insertMany(extraShortCodes);
};

const getExtraShortCodes = async (dbName) => {
    const ExtraShortCode = await getExtraShortCodeModel(dbName);
    return await ExtraShortCode.find();
};

module.exports = {
    getExtraShortCodes,
    createExtraShortCode,
};
