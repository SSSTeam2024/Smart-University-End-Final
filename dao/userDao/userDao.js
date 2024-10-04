const User = require('../../model/userModel/userModel');


const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserByLogin = async (login) => {
    return await User.findOne({ login });
};

// find User by token
const findUserByToken = async (token) => {
    let api_token = token;
    // console.log("Token DAO", api_token)
    return await User.findOne({ api_token }).populate("permissions");
  };
// get all Users
const getAllUsers = async () => {
    return await User.find({});
  };
  const updateJwtToken = async (id, token) => {
    return await User.findByIdAndUpdate({ _id:id }, {
      $set: {
        api_token: token
      }
    });
  }

const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

const getUserById = async (_id) => {
  return await User.findById(_id).populate('permissions').exec();
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}
const updatePassword = async (id, password) => {
    // console.log('Hashed pwd: '+password);
    return await User.findByIdAndUpdate({ _id:id }, {
      $set: {
        password: password
      }
    });
  }
  
    // logout
    const logout = async (id) => {
        return await User.findByIdAndUpdate({ _id:id }, {
          $set: {
            api_token: ""
          }
        });
      }
  


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
    logout

};