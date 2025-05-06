const userPermissionSchema = require("../../model/permissionsModel/permissionModel");
const userSchema = require("../../model/userModel/userModel");
const userPermissionHistorySchema = require("../../model/userPermissionHistoryModel/userPermissionHistoryModel");

function getUserModel(dbConnection) {
  return dbConnection.models.User || dbConnection.model("User", userSchema);
}

function getUserPermissionHistoryModel(dbConnection) {
  return (
    dbConnection.models.UserPermissionHistory ||
    dbConnection.model("UserPermissionHistory", userPermissionHistorySchema)
  );
}

function getUserPermissionModel(dbConnection) {
  return (
    dbConnection.models.Permission ||
    dbConnection.model("Permission", userPermissionSchema)
  );
}

const createPermission = async (permissionData, dbName) => {
  if (
    typeof permissionData !== "object" ||
    !permissionData.name ||
    !permissionData.path ||
    !permissionData.section ||
    !permissionData.sub_section
  ) {
    throw new Error("Invalid permission data");
  }
  const Permission = getUserPermissionModel(dbName);
  return await Permission.create(permissionData);
};

const createPermissions = async (permissionsData, dbName) => {
  if (!Array.isArray(permissionsData) || permissionsData.length === 0) {
    throw new Error("Invalid permissions data. Must be a non-empty array.");
  }

  // Validate each permission object
  const invalidPermissions = permissionsData.filter(
    (permission) =>
      typeof permission !== "object" ||
      !permission.name ||
      !permission.path ||
      !permission.section ||
      !permission.sub_section
  );

  if (invalidPermissions.length > 0) {
    throw new Error("Some permissions data are invalid.");
  }
  console.log("permissionsData dao", permissionsData);
  // Insert all permissions in one query
  const Permission = getUserPermissionModel(dbName);
  return await Permission.insertMany(permissionsData);
};

const getAllPermissions = async (dbName) => {
  const Permission = getUserPermissionModel(dbName);
  return await Permission.find({});
};
const deletePermission = async (id, dbName) => {
  const Permission = getUserPermissionModel(dbName);
  return await Permission.findByIdAndDelete(id);
};
const getPermissionById = async (id, dbName) => {
  const Permission = getUserPermissionModel(dbName);
  return await Permission.findById(id);
};
const updatePermission = async (id, updateData, dbName) => {
  const Permission = getUserPermissionModel(dbName);
  return await Permission.findByIdAndUpdate(id, updateData, { new: true });
};

const assignPermissionsToUser = async (userId, permissionIds, dbName) => {
  try {
    const User = getUserModel(dbName);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const Permission = getUserPermissionModel(dbName);
    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new Error("One or more permissions not found");
    }

    // Filter out duplicate permission IDs
    const newPermissions = permissionIds.filter(
      (permissionId) => !user.permissions.includes(permissionId)
    );
    user.permissions = [...user.permissions, ...newPermissions];

    await user.save();
    return user;
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
    const User = getUserModel(dbName);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Remove permissions from user
    user.permissions = user.permissions.filter(
      (permission) => !permissionIdsToDelete.includes(permission.toString())
    );

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const getPermissionsByUserId = async (userId, dbName) => {
  const User = getUserModel(dbName);
  return await User.findById(userId).populate("permissions").exec();
};

const updatePermissionsForUser = async (userId, permissionIds, dbName) => {
  try {
    const User = getUserModel(dbName);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const Permission = getUserPermissionModel(dbName);
    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new Error("One or more permissions not found");
    }

    // Update user's permissions with the new set
    user.permissions = permissionIds;

    await user.save();
    return user;
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
    // Find the current user and their permissions
    const User = getUserModel(dbName);
    const user = await User.findById(userId).select("permissions updated_at");
    const currentPermissionIds = user.permissions.map((p) => p.toString());

    const now = new Date();

    const UserPermissionHistory = getUserPermissionHistoryModel(dbName);

    if (currentPermissionIds.length > 0) {
      await UserPermissionHistory.create({
        user_id: userId,
        permissions: currentPermissionIds,
        assigned_at: user.updated_at || now,
        removed_at: now,
      });
    }

    user.permissions = permissionIds;
    user.updated_at = now;
    await user.save();

    await UserPermissionHistory.create({
      user_id: userId,
      permissions: permissionIds,
      assigned_at: now,
    });
  } catch (error) {
    throw error;
  }
};

const fetchUserPermissionHistory = async (userId, dbName) => {
  try {
    const UserPermissionHistory = getUserPermissionHistoryModel(dbName);
    return await UserPermissionHistory.find({ user_id: userId })
      .populate("permissions")
      .sort({ assigned_at: -1 });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  deletePermission,
  getPermissionById,
  updatePermission,
  assignPermissionsToUser,
  getPermissionsByUserId,
  deletePermissionsFromUser,
  updatePermissionsForUser,
  updatePermissionsForUserHistory,
  fetchUserPermissionHistory,
  createPermissions,
};
