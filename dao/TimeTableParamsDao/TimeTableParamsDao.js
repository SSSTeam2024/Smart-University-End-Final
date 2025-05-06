const timeTableParamsSchema = require("../../model/TimeTableParamsModel/TimeTableParamsModel");

function getTimeTableParamsModel(dbConnection) {
  return (
    dbConnection.models.TimeTableParams ||
    dbConnection.model("TimeTableParams", timeTableParamsSchema)
  );
}

const createTimeTableParams = async (params, dbName) => {
  const timeTableParamsModel = await getTimeTableParamsModel(dbName);
  return await timeTableParamsModel.create(params);
};

const getTimeTableParams = async (dbName) => {
  const timeTableParamsModel = await getTimeTableParamsModel(dbName);
  return await timeTableParamsModel.find();
};

const updateTimeTableParams = async (updateData, dbName) => {
  const timeTableParamsModel = await getTimeTableParamsModel(dbName);
  let params = await timeTableParamsModel.find();
  return await timeTableParamsModel.findByIdAndUpdate(
    params[0]._id,
    updateData,
    { new: true }
  );
};

module.exports = {
  createTimeTableParams,
  getTimeTableParams,
  updateTimeTableParams,
};
