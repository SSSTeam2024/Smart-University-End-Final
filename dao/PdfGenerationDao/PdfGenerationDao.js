const puppeteer = require("puppeteer");
const DemandeEtudiantSchema = require("../../model/DemandeEtudiantModel/DemandeEtudiantModel");

function getDemandeEtudiantModel(dbConnection) {
  return (
    dbConnection.models.DemandeEtudiant ||
    dbConnection.model("DemandeEtudiant", DemandeEtudiantSchema)
  );
}

const createDemandeEtudiant = async (demandeEtudiantData, dbName) => {
  const DemandeEtudiant = await getDemandeEtudiantModel(dbName);
  const demandeEtudiant = new DemandeEtudiant(demandeEtudiantData);
  await demandeEtudiant.save();
  await generatePDF(demandeEtudiant);
  return demandeEtudiant;
};

const generatePDF = async (demandeEtudiant) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
    <h1>Demande Etudiant</h1>
    <p>Titre: ${demandeEtudiant.title}</p>
    <p>Description: ${demandeEtudiant.description}</p>
    <p>Langue: ${demandeEtudiant.langue}</p>
    <p>Nombre de copies: ${demandeEtudiant.nombre_copie}</p>
    <p>Status: ${demandeEtudiant.status}</p>
    <p>Student ID: ${demandeEtudiant.studentId}</p>
  `;

  await page.setContent(htmlContent);
  await page.pdf({
    path: `./pdfs/demande_${demandeEtudiant._id}.pdf`,
    format: "A4",
  });

  await browser.close();
};

module.exports = {
  createDemandeEtudiant,
};
