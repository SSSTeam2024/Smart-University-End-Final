const express = require('express');
const MessagerieController = require ("../../controllers/Messagerie-old/MessagerieControllers");

const router = express.Router();

router.post("/send", MessagerieController.sendMessage);
router.get("/conversation/:userId1/:userType1/:userId2/:userType2", MessagerieController.getConversation);
router.get("/:messageId", MessagerieController.getMessageById);

module.exports = router;
