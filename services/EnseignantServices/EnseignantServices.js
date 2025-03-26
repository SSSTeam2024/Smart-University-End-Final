const enseignantDao = require("../../dao/EnseignantDao/EnseignantDao");
const Enseignant = require("../../model/EnseignantModel/EnseignantModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const registerEnseignantDao = async (userData, documents) => {
//   try {
//     // Save the documents and get their IDs
//     const saveResult = await saveDocumentToServer(documents);
//     const newEnseignant = await enseignantDao.createEnseignant(userData);
//     return newEnseignant;
//   } catch (error) {
//     console.error("Error registering enseignant:", error);
//     throw error;
//   }
// };

const registerEnseignantDao = async (userData, documents = []) => {
  try {
    // Save the documents and collect their paths
    const savedFiles = await saveDocumentToServer(documents);

    // Attach file paths to user data if necessary
    if (savedFiles.length > 0) {
      userData.savedFiles = savedFiles; // Adjust key based on schema requirements
    }

    // Create the enseignant
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newEnseignant = await enseignantDao.createEnseignant({
      ...userData,
      password: hashedPassword,
    });
    return newEnseignant;
  } catch (error) {
    console.error("Error registering enseignant:", error);
    throw new Error("Failed to register enseignant");
  }
};

// Function to save documents
// async function saveDocumentToServer(documents) {
//   let counter = 0;
//   for (const file of documents) {
//     await saveAdministrativeFile(file.base64String, file.name, file.path);
//     counter++;
//     console.log("File number " + counter + " saved");
//   }
//   return counter === documents.length;
// }

async function saveDocumentToServer(documents) {
  const savedPaths = [];
  for (const file of documents) {
    try {
      const savedPath = await saveAdministrativeFile(file);
      savedPaths.push(savedPath); // Collect the saved file path
    } catch (error) {
      console.error(`Failed to save file ${file.name}:`, error);
      // Optionally, continue saving other files instead of stopping
    }
  }
  return savedPaths; // Return the list of successfully saved file paths
}

// async function saveAdministrativeFile(base64String, fileName, filePath) {
//   const binaryData = Buffer.from(base64String, "base64");
//   const fullFilePath = path.join(filePath, fileName);

//   // Ensure the directory exists
//   await fs.promises.mkdir(filePath, { recursive: true });

//   await fs.promises.writeFile(fullFilePath, binaryData, "binary");
//   console.log("File saved successfully at:", fullFilePath);
// }
async function saveAdministrativeFile(file) {
  if (!file || !file.base64String) {
    throw new Error("Invalid document: Missing base64String");
  }

  const { base64String, name, path: filePath } = file;

  // Convert base64 to binary data
  const buffer = Buffer.from(base64String, "base64");

  // Construct the full file path
  const fullFilePath = path.join(filePath, name);

  try {
    // Ensure the directory exists
    await fs.promises.mkdir(filePath, { recursive: true });

    // Write the file
    await fs.promises.writeFile(fullFilePath, buffer);
    console.log("File saved successfully at:", fullFilePath);

    return fullFilePath; // Return the saved file path
  } catch (error) {
    console.error(`Error saving file ${name}:`, error);
    throw error;
  }
}

const getEnseignatsDao = async () => {
  const result = await enseignantDao.getEnseignants();
  return result;
};

const deleteEnseignantDao = async (id) => {
  return await enseignantDao.deleteEnseignant(id);
};
const updateEnseignantDao = async (id, updateData) => {
  return await enseignantDao.updateEnseignant(id, updateData);
};

const getEnseignantDaoById = async (id) => {
  return await enseignantDao.getEnseignantById(id);
};

const assignPapierToTeacher = async (enseignantId, papierIds) => {
  try {
    const enseignant = await Enseignant.findById(enseignantId);
    if (!enseignant) {
      throw new Error("Enseignant not found");
    }
    for (const paperId of papierIds) {
      enseignant.papers.push(paperId);
    }

    await enseignant.save();
    return enseignant;
  } catch (error) {
    console.error("Error in assignPapierToTeacher:", error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

const fetchAllTeachersPeriods = async () => {
  try {
    const teachersPeriods = await enseignantDao.fetchAllTeachersPeriods();

    return teachersPeriods;
  } catch (error) {
    throw new Error("Error processing teachers' periods: " + error.message);
  }
};
const getTeachersGroupedByGrade = async () => {
  const result = await enseignantDao.getTeachersGroupedByGrade();
  return result;
};

const login = async (cin, password) => {
  const teacher = await enseignantDao.getTeacherByCIN(cin);

  if (!teacher) {
    throw new Error("teacher not found");
  }

  if (await bcrypt.compare(password, teacher.password)) {
    const accessToken = jwt.sign({ login: teacher.num_cin }, "yourSecretKey");

    await enseignantDao.updateJwtToken(teacher._id, String(accessToken));

    let updatedTeacher = await enseignantDao.getEnseignantById(teacher._id);

    return updatedTeacher;
  } else {
    throw new Error("Incorrect password");
  }
};
const getEtudiantByCin = async (cin_teacher) => {
  return enseignantDao.getTeacherByCIN(cin_teacher);
};

module.exports = {
  registerEnseignantDao,
  getEnseignatsDao,
  deleteEnseignantDao,
  updateEnseignantDao,
  getEnseignantDaoById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
  login,
  getEtudiantByCin
};
