const templateBodySchema = require("../../model/TemplateBodyModel/templateBodyModel");
const mongoose = require('mongoose');
function getTemplateBodyModel(dbConnection) {
  return (
    dbConnection.models.TemplateBody ||
    dbConnection.model("TemplateBody", templateBodySchema)
  );
}

function getUser(dbConnection) {
  return (
    dbConnection.models.User ||
    dbConnection.model("User", userSchema)
  );
}

const createTemplateBody = async (templateBody, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.create(templateBody);
};

const getTemplateBodys = async (dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.find().populate('handled_by');
};

const getTemplateBodyById = async (id, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.findById(id).populate('handled_by');
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
  return await TemplateBody.find(query).populate('handled_by');
};

const updateTemplateBody = async (id, updateData, dbName) => {
  const TemplateBody = await getTemplateBodyModel(dbName);
  return await TemplateBody.findByIdAndUpdate(id, updateData, { new: true });
};

const getTemplateBodiesByAdminId = async (adminId, dbName) => {
  try {
    const TemplateBody = await getTemplateBodyModel(dbName);

    const templates = await TemplateBody.find({
      handled_by: adminId
    }).populate('handled_by');

    return templates;
  } catch (error) {
    throw error;
  }
};

const updateAmdinsInCharge = async (adminsList, dbName) => {
  try {
    const TemplateBody = await getTemplateBodyModel(dbName);

    const templates = await TemplateBody.find();

    console.log(templates)

    for (let index = 0; index < templates.length; index++) {
      const updatedTemplate = await TemplateBody.findOneAndUpdate(
        { _id: templates[index]._id, },
        {
          $set: {
            "handled_by": getRandomChunks(adminsList),
          },
        },
        { new: true }
      );
    }

  } catch (error) {
    throw error;
  }
}

function getRandomChunks(array, chunkSize = 5) {
  if (array.length < chunkSize) {
    throw new Error("Array length is smaller than the chunk size");
  }

  const shuffled = [...array]; // clone the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, chunkSize);
}

module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
  updateTemplateBody,
  getTemplateBodiesByAdminId,
  updateAmdinsInCharge
};
