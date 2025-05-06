const templateBodySchema = require("../../model/TemplateBodyModel/templateBodyModel");

function getTemplateBodyModel(dbConnection) {
  return (
    dbConnection.models.TemplateBody ||
    dbConnection.model("TemplateBody", templateBodySchema)
  );
}

const createTemplateBody = async (templateBody, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.create(templateBody);
};

const getTemplateBodys = async (dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.find();
};

const getTemplateBodyById = async (id, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.findById(id);
};
const deleteTemplateBody = async (id, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.findByIdAndDelete(id);
};

const getTemplateBodyByContext = async (intended_for, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  const query = {
    intended_for: intended_for,
  };
  return await TemplateBody.find(query);
};

module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
};
