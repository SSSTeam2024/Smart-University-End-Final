const userService = require("../../services/userServices/userService");
const metdataService = require("../../central/metadata");
function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(useNewDb(req));
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      personnelId,
      enseignantId,
      login,
      service,
      password,
      api_token,
      app_name,
      status,
      permissions,
      nom_fr,
      prenom_fr,
      email,
    } = req.body;

    let user = await userService.createUser(
      {
        personnelId,
        enseignantId,
        login,
        service,
        password,
        api_token,
        app_name,
        status,
        permissions,
        nom_fr,
        prenom_fr,
        email,
      },
      useNewDb(req)
    );
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name,
      email,
      login,
      role,
      departement_id,
      password,
      api_token,
      photo,
      app_name,
      status,
    } = req.body;

    let user = await userService.updateUser(
      userId,
      {
        name,
        email,
        login,
        role,
        departement_id,
        password,
        api_token,
        photo,
        app_name,
        status,
      },
      useNewDb(req)
    );
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await userService.loginUser(login, password, useNewDb(req));
    // const newDatabase = metdataService.getNewDbCache();
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
exports.getUserByToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).send("Token missing");
    }
    const user = await userService.getUserByToken(token, useNewDb(req));
    // const newDatabase = metdataService.getNewDbCache();
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error(`Get user by token error controller: ${error.message}`);
    res.status(500).send(error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    let id = req.params.id;

    await userService.logout(id, useNewDb(req));

    res.sendStatus(200);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id, useNewDb(req));
    if (!user) {
      console.log("User not found");

      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user with permissions:", err);
    res.status(500).json({ error: "Failed to get user with permissions" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId, useNewDb(req));
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { hashedPassword, plainPassword } = req.body;

    if (!hashedPassword || !plainPassword) {
      return res.status(400).json({
        message: "Both hashedPassword and plainPassword are required.",
      });
    }

    const isMatch = await userService.verifyPassword(
      hashedPassword,
      plainPassword,
      useNewDb(req)
    );

    res.json({ isMatch });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
