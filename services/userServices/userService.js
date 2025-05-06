const userDao = require("../../dao/userDao/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getDb } = require("../../config/dbSwitcher");

const createUser = async (userData, dbName) => {
  const db = await getDb(dbName);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await userDao.createUser(
    {
      ...userData,
      password: hashedPassword,
    },
    db
  );
};

// login service acccount
const loginUser = async (login, password, dbName) => {
  const db = await getDb(dbName);
  const user = await userDao.findUserByLogin(login, db);

  if (!user) {
    throw new Error("user not found");
  }

  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({ login: user.login }, "yourSecretKey");
    await userDao.updateJwtToken(user._id, String(accessToken), db);
    let updatedUser = await userDao.getUserById(user._id, db);
    return updatedUser;
  } else {
    throw new Error("Incorrect password");
  }
};

//forgot password
const updatePassword = async (id, password, dbName) => {
  const db = await getDb(dbName);
  const hashedPassword = await bcrypt.hash(password.password, 10);
  return await userDao.updatePassword(id, hashedPassword, db);
};

const getUsers = async (dbName) => {
  const db = await getDb(dbName);
  return await userDao.getAllUsers(db);
};

const deleteUser = async (id, dbName) => {
  const db = await getDb(dbName);
  return await userDao.deleteUser(id, db);
};

const getUserByEmail = async (email, dbName) => {
  const db = await getDb(dbName);
  return await userDao.getUserByEmail(email, db);
};

const updateUser = async (id, updateData, dbName) => {
  const db = await getDb(dbName);
  return await userDao.updateUser(id, updateData, db);
};

// get User by token
const getUserByToken = async (token, dbName) => {
  const db = await getDb(dbName);
  return await userDao.findUserByToken(token, db);
};

//logout
const logout = async (id, dbName) => {
  const db = await getDb(dbName);
  return await userDao.logout(id, db);
};

const getUserById = async (_id, dbName) => {
  try {
    const db = await getDb(dbName);
    return await userDao.getUserById(_id, db);
  } catch (err) {
    throw new Error(`Error fetching user by ID: ${err.message}`);
  }
};

const verifyPassword = async (hashedPassword, plainPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  createUser,
  getUserByToken,
  logout,
  getUserByEmail,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  loginUser,
  updatePassword,
  verifyPassword,
};
