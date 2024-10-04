const enseignantModel = require("../../model/EnseignantModel/EnseignantModel")

const createEnseignant = async (enseignant) => {
  return await enseignantModel.create(enseignant);
};

const getEnseignants = async () => {
  return await enseignantModel.find()
    .populate('etat_compte')
    .populate('specilaite').
    populate("grade")
    .populate('poste')
    .populate("departements");
};


const updateEnseignant = async (id, updateData) => {
  return await enseignantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEnseignant = async (id) => {
  return await enseignantModel.findByIdAndDelete(id);
};

const getEnseignantById = async (id) => {
  try
  {
    const enseignant = await enseignantModel.findById(id)
    .populate('specilaite').
    populate("grade")
    .populate('poste')
    .populate("departements").populate("etat_compte");
    return enseignant
  }

catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};
const assignPapierToTeacher = async (paperData, teacherId) => {
  try {
    if (!teacherId || !Array.isArray(paperData) || paperData.length === 0) {
      throw new Error("Invalid input: Teacher ID or paper data");
    }

    const paperIds = paperData.map(paper => {
      if (!paper.papier_administratif) {
        throw new Error("Invalid papier_administratif ID");
      }
      return mongoose.Types.ObjectId(paper.papier_administratif);
    });

    const papiers = await PapierAdministratif.find({
      '_id': { $in: paperIds }
    });

    if (papiers.length === 0) {
      throw new Error("No Papier Administratif documents found for the provided IDs");
    }

    const updatedTeacher = await enseignantModel.findByIdAndUpdate(
      teacherId,
      { $addToSet: { papers: { $each: paperData } } },
      { new: true }
    ).populate("papers.files_papier_administratif");

    return updatedTeacher;
  } catch (error) {
    throw new Error(`DAO Error: ${error.message}`);
  }
};


module.exports = {
 
    createEnseignant,
    getEnseignants,
    updateEnseignant,
    deleteEnseignant,
    getEnseignantById,
    assignPapierToTeacher
};