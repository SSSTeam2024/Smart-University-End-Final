const TemplateBody = require("../../model/TemplateBodyModel/templateBodyModel")

const createTemplateBody = async (templateBody) => {
  return await TemplateBody.create(templateBody);
};

const getTemplateBodys = async () => {
  return await TemplateBody.find()
};

const getTemplateBodyById = async (id) => {
  return await TemplateBody.findById(id);
};
const deleteTemplateBody = async (id) => {
  return await TemplateBody.findByIdAndDelete(id)
};

const getTemplateBodyByContext = async (intended_for) => {
  const query = {
    intended_for: intended_for
  };
  return await TemplateBody.find(query)
};

const updateTemplateBody = async (id, updateData) => {
  return await TemplateBody.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
  updateTemplateBody
};