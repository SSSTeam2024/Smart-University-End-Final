const MentionClasseDao = require("../../dao/MentionClasseDao/MentionClasseDao");

const createMentionClasse = async (userData) => {
  try {
    const MentionClasse = await MentionClasseDao.createMentionClasse(userData);

    return MentionClasse;
  } catch (error) {
    console.error("Error in registering Mention classe:", error);
    throw error;
  }
};

const updateMentionClasse = async (id, updateData) => {
  return await MentionClasseDao.updateMentionClasse(id, updateData);
};

const getMentionsClasse = async () => {
  return await MentionClasseDao.getMentionsClasse();
};

const deleteMentionClasse = async (id) => {
  return await MentionClasseDao.deleteMentionClasse(id);
};

const getMentionByValue = async ({ name_mention_ar, name_mention_fr }) => {
  return await MentionClasseDao.getMentionByValue(
    name_mention_ar,
    name_mention_fr
  );
};

module.exports = {
  deleteMentionClasse,
  getMentionsClasse,
  updateMentionClasse,
  createMentionClasse,
  getMentionByValue,
};
