const DemandeCongeDao = require('../../dao/CongeDao/DemandeCongeDao');
const LeaveBalanceDao = require('../../dao/CongeDao/LeaveBalanceDao');
const fs = require("fs").promises;
const mongoose = require('mongoose');

async function saveDocumentsToServer(documents) {
  console.log("docs", documents)
  let counter = 0;
  for (const file of documents) {
    await saveFile(file.base64String, file.name, file.path);
    counter++;
    console.log("File number " + counter + " saved");
  }
  if (counter == documents.length) return true;
}

async function saveFile(base64String, fileName, file_path) {
 
    const binaryData = Buffer.from(base64String, "base64");
    const filePath = file_path + fileName;
    
    fs.writeFile(filePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log("File saved successfully!");
      }
    });

}
const createDemandeConge = async (demandeCongeData, documents) => {
  try {
    console.log("demandeCongeData", demandeCongeData)
    const saveResult = await saveDocumentsToServer(documents);
    
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    return await DemandeCongeDao.createDemandeConge(demandeCongeData);
  } catch (error) {
    console.error("Error creating demande Conge:", error);
    throw error;
  }
};

const getAllDemandeConges = async () => {
  try {
    const demandes = await DemandeCongeDao.getAllDemandeConges();

    const demandesWithSubcategoryDetails = demandes.map(demande => {
      const { subcategory, leaveType } = demande;

      if (leaveType && leaveType.subcategories && subcategory && subcategory.name) {
        const matchingSubcategory = leaveType.subcategories.find(
          sub => sub.name === subcategory.name
        );

        if (matchingSubcategory) {
          demande.subcategory = matchingSubcategory;
        }
      }

      return demande;
    });

    return demandesWithSubcategoryDetails;
  } catch (error) {
    console.error("Error fetching demandes with subcategory details:", error);
    throw error;
  }
};


const getDemandeCongeById = async (id) => {
  return DemandeCongeDao.getDemandeCongeById(id);
};





// const updateDemandeConge = async (id, updateData, documents) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     // Save the new media files to the server
//     if (documents && documents.length > 0) {
//       const saveResult = await saveDocumentsToServer(documents);
//       if (!saveResult) {
//         throw new Error("Not all files were saved successfully.");
//       }
//     }

    
//     return await DemandeCongeDao.updateDemandeConge(id, updateData);
//   } catch (error) {
//     console.error("Error updating DemandeConge:", error);
//     throw error;
//   }
// };


const updateDemandeConge = async (id, updateData, documents) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Save files if any
    if (documents && documents.length > 0) {
      const saveResult = await saveDocumentsToServer(documents);
      if (!saveResult) {
        throw new Error("Not all files were saved successfully.");
      }
      updateData.file = documents.find(doc => doc.path.includes('demandeCongeFiles'))?.name;
      updateData.fileInterruption = documents.find(doc => doc.path.includes('demandeCongeInterruptionFiles'))?.name;
      updateData.fileReponse = documents.find(doc => doc.path.includes('demandeCongeReponseFiles'))?.name;
    }

  //   const demande = await DemandeCongeDao.updateDemandeConge(id, updateData, { session });
  // if (!demande) {
  //   throw new Error('Demande Conge not found');
  // }
  console.log("updateData:", updateData);
  // Update leave balance if the status is 'acceptée'
  if (updateData.status === 'acceptée') {
    let remainingRequestedDays = demande.requestedDays;
  
    const leaveBalances = await LeaveBalanceDao.findLeaveBalances(
      updateData.personnelId._id,
      updateData.leaveType._id,
      updateData.subcategory._id
    );
  
    console.log("Leave Balances Across Years:", leaveBalances);
  
    if (!leaveBalances || leaveBalances.length === 0) {
      throw new Error('Insufficient leave balance across years.');
    }
  
    for (const currentLeaveBalance of leaveBalances) {
      if (remainingRequestedDays <= 0) break;
  
      if (currentLeaveBalance.remainingDays >= remainingRequestedDays) {
        currentLeaveBalance.remainingDays -= remainingRequestedDays;
        currentLeaveBalance.daysUsed += remainingRequestedDays;
        remainingRequestedDays = 0;
      } else {
        remainingRequestedDays -= currentLeaveBalance.remainingDays;
        currentLeaveBalance.daysUsed += currentLeaveBalance.remainingDays;
        currentLeaveBalance.remainingDays = 0;
      }
  
      await LeaveBalanceDao.findByIdAndUpdate(
        currentLeaveBalance._id,
        currentLeaveBalance,
        { new: true }
      );
    }
  
    if (remainingRequestedDays > 0) {
      throw new Error('Insufficient leave balance across years.');
    }
  }

    await session.commitTransaction();
    session.endSession();

    return demande;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error updating DemandeConge:', error);
    throw error;
  }
};


const deleteDemandeConge = async (id) => {
  return DemandeCongeDao.deleteDemandeConge(id);
};

module.exports = {
    createDemandeConge,
    getAllDemandeConges,
    getDemandeCongeById,
    updateDemandeConge,
    deleteDemandeConge
};