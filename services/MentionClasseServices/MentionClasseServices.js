const MentionClasseDao = require("../../dao/MentionClasseDao/MentionClasseDao");
const { getDb } = require("../../config/dbSwitcher");

const createMentionClasse = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const MentionClasse = await MentionClasseDao.createMentionClasse(
      userData,
      db
    );

    return MentionClasse;
  } catch (error) {
    console.error("Error in registering Mention classe:", error);
    throw error;
  }
};

const updateMentionClasse = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await MentionClasseDao.updateMentionClasse(id, updateData, db);
};

const getMentionsClasse = async (useNew) => {
  const db = await getDb(useNew);
  return await MentionClasseDao.getMentionsClasse(db);
};

const deleteMentionClasse = async (id, useNew) => {
  const db = await getDb(useNew);
  return await MentionClasseDao.deleteMentionClasse(id, db);
};

const getMentionByValue = async (
  { name_mention_ar, name_mention_fr },
  useNew
) => {
  const db = await getDb(useNew);
  return await MentionClasseDao.getMentionByValue(
    name_mention_ar,
    name_mention_fr,
    db
  );
};

module.exports = {
  deleteMentionClasse,
  getMentionsClasse,
  updateMentionClasse,
  createMentionClasse,
  getMentionByValue,
};
