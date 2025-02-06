const personnelDao = require("../../dao/PersonnelDao/PersonnelDao");
const fs = require("fs");
const path = require("path");

// const registerPersonnelDao = async (userData, documents) => {
//   try {
//     const saveResult = await saveDocumentToServer(documents);
//     if (saveResult) {
//       const newPersonnel = await personnelDao.createPersonnel(userData);
//       return newPersonnel;
//     } else {
//       throw new Error('Failed to save documents.');
//     }
//   } catch (error) {
//     console.error('Error registering personnel:', error);
//     throw error;
//   }
// };
// // Function to save documents
// async function saveDocumentToServer(documents) {
//   let counter = 0;
//   for (const file of documents) {
//     await saveAdministrativeFile(file.base64String, file.name, file.path);
//     counter++;
//     console.log('File number ' + counter + ' saved');
//   }
//   return counter === documents.length;
// }

// async function saveAdministrativeFile(base64String, fileName, filePath) {
//   const binaryData = Buffer.from(base64String, 'base64');
//   const fullFilePath = path.join(filePath, fileName);

//   // Ensure the directory exists
//   await fs.promises.mkdir(filePath, { recursive: true });

//   await fs.promises.writeFile(fullFilePath, binaryData, 'binary');
//   console.log('File saved successfully at:', fullFilePath);
// }

const registerPersonnelDao = async (userData, documents = []) => {
  try {
    // Save the documents and collect their paths
    const savedFiles = await saveDocumentToServer(documents);

    // Attach file paths to user data if necessary
    if (savedFiles.length > 0) {
      userData.savedFiles = savedFiles; // Adjust key based on schema requirements
    }

    // Create the personnel
    const newPersonnel = await personnelDao.createPersonnel(userData);
    return newPersonnel;
  } catch (error) {
    console.error("Error registering personnel:", error);
    throw new Error("Failed to register personnel");
  }
};

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

const getPersonnelsDao = async () => {
  const result = await personnelDao.getPersonnels();
  return result;
};

const deletePersonnelDao = async (id) => {
  return await personnelDao.deletePersonnel(id);
};
const updatePersonnelDao = async (id, updateData) => {
  return await personnelDao.updatePersonnel(id, updateData);
};

const getPersonnelDaoById = async (id) => {
  return await personnelDao.getPersonnelById(id);
};
module.exports = {
  registerPersonnelDao,
  getPersonnelsDao,
  deletePersonnelDao,
  updatePersonnelDao,
  getPersonnelDaoById,
};
