const templateBodyDao = require("../../dao/TemplateBodyDao/templateBodyDao");
const { getDb } = require("../../config/dbSwitcher");

const createTemplateBody = async (templateBodyData, useNew) => {
  const db = await getDb(useNew);
  return await templateBodyDao.createTemplateBody(templateBodyData, db);
};

const getTemplateBodys = async (useNew) => {
  const db = await getDb(useNew);
  const result = await templateBodyDao.getTemplateBodys(db);
  return result;
};

const getTemplateBodyById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await templateBodyDao.getTemplateBodyById(id, db);
  } catch (error) {
    console.error("Error fetching template body by ID:", error);
    throw error;
  }
};

const deleteTemplateBody = async (id, useNew) => {
  const db = await getDb(useNew);
  const result = await templateBodyDao.deleteTemplateBody(id, db);
  return result;
};

const getTemplateBodyByContext = async (intended_for, useNew) => {
  const db = await getDb(useNew);
  const result = await templateBodyDao.getTemplateBodyByContext(
    intended_for,
    db
  );
  return result;
};

module.exports = {
  createTemplateBody,
  getTemplateBodys,
  getTemplateBodyById,
  deleteTemplateBody,
  getTemplateBodyByContext,
};
