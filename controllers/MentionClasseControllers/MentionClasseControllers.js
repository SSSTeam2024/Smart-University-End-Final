const MentionService = require("../../services/MentionClasseServices/MentionClasseServices");

const createMentionClasse = async (req, res) => {
  try {
    const { name_mention_ar, name_mention_fr, abreviation, domaine } = req.body;

    const MentionClasse = await MentionService.createMentionClasse({
      name_mention_ar,
      name_mention_fr,
      abreviation,
      domaine,
    });
    res.json(MentionClasse);
  } catch (error) {
    console.error(error);
  }
};

const updateMentionClasseById = async (req, res) => {
  try {
    const MentionClasseId = req.params.id;
    const { name_mention_ar, name_mention_fr, abreviation, domaine } = req.body;

    const updatedMentionClasse = await MentionService.updateMentionClasse(
      MentionClasseId,
      {
        name_mention_ar,
        name_mention_fr,
        abreviation,
        domaine,
      }
    );

    if (!updatedMentionClasse) {
      return res.status(404).send("Mention Classe not found!");
    }
    res.json(updatedMentionClasse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllMentionClasse = async (req, res) => {
  try {
    const MentionClasses = await MentionService.getMentionsClasse();
    res.json(MentionClasses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteMentionClasseById = async (req, res) => {
  try {
    const doamineClasseId = req.params.id;

    const deletedDoamineClasseId = await MentionService.deleteMentionClasse(
      doamineClasseId
    );

    if (!deletedDoamineClasseId) {
      return res.status(404).send("Mention Classe not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getMentionByValue = async (req, res) => {
  try {
    const { name_mention_fr, name_mention_ar } = req.body;
    console.log(req.body);
    if (!name_mention_fr || !name_mention_ar) {
      return res
        .status(400)
        .json({ message: "name_mention_fr and name_mention_ar are required" });
    }

    const mentionValue = await MentionService.getMentionByValue({
      name_mention_fr,
      name_mention_ar,
    });

    if (!mentionValue) {
      return res.json(null);
    }

    res.json({
      id: mentionValue._id,
      name_mention_fr: mentionValue.name_mention_fr,
      name_mention_ar: mentionValue.name_mention_ar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMentionClasse,
  updateMentionClasseById,
  getAllMentionClasse,
  deleteMentionClasseById,
  getMentionByValue,
};
