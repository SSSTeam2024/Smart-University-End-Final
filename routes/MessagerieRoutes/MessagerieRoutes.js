const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/MessagerieController/MessagerieController");

router.post("/send", messageController.sendMessage);
router.get("/inbox/:userId/:userType", messageController.getInbox);
router.get("/archived-inbox/:userId/:userType", messageController.getArchivedInbox);
router.get("/sent/:userId/:userType", messageController.getSentMessages);
router.get("/archived-sent/:userId/:userType", messageController.getArchivedSentMessages);
router.put("/read/:messageId", messageController.markMessageAsRead);
router.put("/unread/:messageId", messageController.markMessageAsUnread);
router.post("/archive/:messageId", messageController.archiveMessage);
router.post("/restore/:messageId", messageController.restoreMessage);
router.post("/delete-message/:messageId", messageController.deleteMessage);
router.get("/replies/:messageId", messageController.fetchReplies);
router.put("/delete/:id", messageController.deleteMessageForUser);
router.post("/deleted", messageController.getDeletedMessagesForUser);
router.post("/transfer/:messageId", messageController.transferMessage);
// router.get("/deleted-sent/:userId/:userType", messageController.getDeletedSentMessages);
// router.get("/deleted-inbox/:userId/:userType", messageController.getDeletedInboxMessages);


module.exports = router;