const express = require('express');
const dossierAdministratifController = require('../../controllers/DossierAdministratifControllers/DossierAdministratifControllers');

const router = express.Router();

router.post('/create-dossier-administratif', dossierAdministratifController.addDossierAdministratif);
router.get('/get-all-dossiers', dossierAdministratifController.getAllDossierAdmnistratifs);
router.delete('/dossier/:dossierId/papier/:papierId/entity/:entityId/type/:entityType', dossierAdministratifController.removePaperFromDossier);
router.put('/update-dossier', dossierAdministratifController.updateDossierAdministratif);
module.exports = router;