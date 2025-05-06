const MentionClasseSchema = require("../../model/MentionClasseModel/MentionClasseModel");

function getMentionClasseModel(dbConnection) {
  return (
    dbConnection.models.MentionClasse ||
    dbConnection.model("MentionClasse", MentionClasseSchema)
  );
}

const createMentionClasse = async (mention, dbName) => {
  try {
    const MentionClasse = await getMentionClasseModel(dbName);
    return await MentionClasse.create(mention);
  } catch (error) {
    throw error;
  }
};

const getMentionsClasse = async (dbName) => {
  try {
    const MentionClasse = await getMentionClasseModel(dbName);
    return await MentionClasse.find().populate("domaine");
  } catch (error) {
    console.error("Error fetching Mention classe:", error);
    throw error;
  }
};
const updateMentionClasse = async (id, updateData, dbName) => {
  try {
    const MentionClasse = await getMentionClasseModel(dbName);
    return await MentionClasse.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating Mention classe:", error);
    throw error;
  }
};

const deleteMentionClasse = async (id, dbName) => {
  const MentionClasse = await getMentionClasseModel(dbName);
  return await MentionClasse.findByIdAndDelete(id);
};

const getMentionByValue = async (name_mention_ar, name_mention_fr, dbName) => {
  const MentionClasse = await getMentionClasseModel(dbName);
  return await MentionClasse.findOne({ name_mention_ar, name_mention_fr });
};

module.exports = {
  createMentionClasse,
  getMentionsClasse,
  updateMentionClasse,
  deleteMentionClasse,
  getMentionByValue,
};
