const permissionsDao = require("../../dao/userPermissions/userPermissionsDao");
const { getDb } = require("../../config/dbSwitcher");

const createPermission = async (name, path, section, sub_section, dbName) => {
  const db = await getDb(dbName);
  const permissionData = { name, path, section, sub_section };
  return await permissionsDao.createPermission(permissionData, dbName, db);
};

const createPermissions = async (permissionsData, dbName) => {
  const db = await getDb(dbName);
  console.log("permissionsData serv", permissionsData);
  return await permissionsDao.createPermissions(permissionsData, db);
};

const getAllPermissions = async (dbName) => {
  const db = await getDb(dbName);
  return await permissionsDao.getAllPermissions(db);
};
const updatePermission = async (id, updateData, dbName) => {
  const db = await getDb(dbName);
  return await permissionsDao.updatePermission(id, updateData, db);
};
const getPermissionById = async (id, dbName) => {
  const db = await getDb(dbName);
  return await permissionsDao.getPermissionById(id, db);
};
const deletePermission = async (id, dbName) => {
  const db = await getDb(dbName);
  return await permissionsDao.deletePermission(id, db);
};
const assignPermissionsToUser = async (userId, permissionIds, dbName) => {
  try {
    const db = await getDb(dbName);
    return await permissionsDao.assignPermissionsToUser(
      userId,
      permissionIds,
      db
    );
  } catch (error) {
    throw error;
  }
};

const deletePermissionsFromUser = async (
  userId,
  permissionIdsToDelete,
  dbName
) => {
  try {
    const db = await getDb(dbName);
    return await permissionsDao.deletePermissionsFromUser(
      userId,
      permissionIdsToDelete,
      db
    );
  } catch (error) {
    throw error;
  }
};
const getPermissionsByUserId = async (userId, dbName) => {
  const db = await getDb(dbName);
  return await permissionsDao.getPermissionsByUserId(userId, db);
};

const updatePermissionsForUser = async (userId, permissionIds, dbName) => {
  try {
    const db = await getDb(dbName);
    return await permissionsDao.updatePermissionsForUser(
      userId,
      permissionIds,
      db
    );
  } catch (error) {
    throw error;
  }
};
const updatePermissionsForUserHistory = async (
  userId,
  permissionIds,
  dbName
) => {
  try {
    const db = await getDb(dbName);
    await permissionsDao.updatePermissionsForUserHistory(
      userId,
      permissionIds,
      db
    );
  } catch (error) {
    throw error;
  }
};
const getUserPermissionHistory = async (userId, dbName) => {
  try {
    const db = await getDb(dbName);
    return await permissionsDao.fetchUserPermissionHistory(userId, db);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
  getPermissionById,
  assignPermissionsToUser,
  deletePermissionsFromUser,
  getPermissionsByUserId,
  updatePermissionsForUser,
  updatePermissionsForUserHistory,
  getUserPermissionHistory,
  createPermissions,
};
