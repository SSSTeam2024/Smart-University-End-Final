const templateSchema = require("../../model/TemplateModel/templateModel");

function getTemplateModel(dbConnection) {
  return (
    dbConnection.models.Template ||
    dbConnection.model("Template", templateSchema)
  );
}

const createTemplate = async (templateBody, dbName) => {
  const Template = await getTemplateModel(dbName);
  return await Template.create(templateBody);
};

const getTemplates = async (dbName) => {
  const Template = await getTemplateModel(dbName);
  return await Template.find();
};

module.exports = {
  createTemplate,
  getTemplates,
};
