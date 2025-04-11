const RattrapageModel = require("../../model/RattrapageModel/RattrapageModel");

const createRattrapage = async (data) => {
  try {
    return await RattrapageModel.create(data);
  } catch (error) {
    console.error("Error creating catch-up session:", error);
    throw error;
  }
};

const getRattrapages = async () => {
  const result = await RattrapageModel.find()
    .populate("salle")
    .populate("classe")
    .populate("enseignant")
    .populate("matiere");
  return result;
};

const updateEtatAndStatusRattrapage = async (rattrapageId, etat, status) => {
  try {
    const updatedRattrapage = await RattrapageModel.findByIdAndUpdate(
      rattrapageId,
      { etat, status },
      { new: true }
    );
    if (!updatedRattrapage) {
      throw new Error(`Rattrapage with ID ${rattrapageId} not found.`);
    }
    return updatedRattrapage;
  } catch (error) {
    throw new Error(`Failed to update Rattrapage: ${error.message}`);
  }
};

// const updateTypeSeance = async (id, updateData) => {
//   return await TypeSeanceModel.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteTypeSeance = async (id) => {
//   return await TypeSeanceModel.findByIdAndDelete(id);
// };
const getRattrapagesByClassId = async (classId) => {
  try {
    return await RattrapageModel.find({ classe: classId })
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("classe");
  } catch (error) {
    console.error("Error fetching rattrapages by class ID:", error);
    throw error;
  }
};

const getRattrapagesByTeacherId = async (teacherId) => {
  try {
    return await RattrapageModel.find({ enseignant: teacherId })
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("classe");
  } catch (error) {
    console.error("Error fetching rattrapages by teacher ID:", error);
    throw error;
  }
};
module.exports = {
  createRattrapage,
  getRattrapages,
  updateEtatAndStatusRattrapage,
  getRattrapagesByClassId,
  getRattrapagesByTeacherId
};