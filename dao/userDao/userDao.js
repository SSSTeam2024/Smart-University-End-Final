const userSchema = require("../../model/userModel/userModel");

function getUserModel(dbConnection) {
  return dbConnection.models.User || dbConnection.model("User", userSchema);
}

const createUser = async (userData, dbName) => {
  try {
    const User = getUserModel(dbName);
    return await User.create(userData);
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

const findUserByLogin = async (login, dbName) => {
  const User = getUserModel(dbName);
  return await User.findOne({ login });
};

// find User by token
const findUserByToken = async (token, dbName) => {
  let api_token = token;
  const User = getUserModel(dbName);
  return await User.findOne({ api_token })
    .populate("permissions")
    .populate("personnelId")
    .populate("enseignantId");
};
// get all Users
const getAllUsers = async (dbName) => {
  const User = getUserModel(dbName);
  return await User.find({})
    .populate("enseignantId")
    .populate("personnelId")
    .populate("service")
    .populate("permissions");
};
const updateJwtToken = async (id, token, dbName) => {
  const User = getUserModel(dbName);
  return await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

const updateUser = async (id, updateData, dbName) => {
  const User = getUserModel(dbName);
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id, dbName) => {
  const User = getUserModel(dbName);
  return await User.findByIdAndDelete(id);
};

const getUserById = async (_id, dbName) => {
  const User = getUserModel(dbName);
  return await User.findById(_id)
    .populate("permissions")
    .populate("enseignantId")
    .populate("personnelId")
    .exec();
};

const getUserByEmail = async (email, dbName) => {
  const User = getUserModel(dbName);
  return await User.findOne({ email });
};
const updatePassword = async (id, password, dbName) => {
  const User = getUserModel(dbName);
  return await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        password: password,
      },
    }
  );
};

// logout
const logout = async (id, dbName) => {
  const User = getUserModel(dbName);
  return await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: "",
      },
    }
  );
};

module.exports = {
  createUser,
  findUserByToken,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  findUserByLogin,
  updatePassword,
  updateJwtToken,
  logout,
};
