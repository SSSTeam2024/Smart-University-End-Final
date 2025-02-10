const MentionClasse = require("../../model/MentionClasseModel/MentionClasseModel");

const createMentionClasse = async (mention) => {
  try {
    return await MentionClasse.create(mention);
  } catch (error) {
    throw error;
  }
};

const getMentionsClasse = async () => {
  try {
    return await MentionClasse.find().populate("domaine");
  } catch (error) {
    console.error("Error fetching Mention classe:", error);
    throw error;
  }
};
const updateMentionClasse = async (id, updateData) => {
  try {
    return await MentionClasse.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating Mention classe:", error);
    throw error;
  }
};

const deleteMentionClasse = async (id) => {
  return await MentionClasse.findByIdAndDelete(id);
};

const getMentionByValue = async (name_mention_ar, name_mention_fr) => {
  return await MentionClasse.findOne({ name_mention_ar, name_mention_fr });
};

module.exports = {
  createMentionClasse,
  getMentionsClasse,
  updateMentionClasse,
  deleteMentionClasse,
  getMentionByValue,
};
