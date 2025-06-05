const express = require('express');
const extraShortCodeController = require('../../controllers/ShortCodeController/extraShortCodeControllers');

const router = express.Router();

router.post('/create-extra-short-code', extraShortCodeController.addExtraShortCode);
router.get('/get-all-extra-short-codes', extraShortCodeController.getAllShortShortCodes);
module.exports = router;