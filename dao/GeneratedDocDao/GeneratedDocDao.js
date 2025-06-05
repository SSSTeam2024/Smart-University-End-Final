const GeneratedDocModelSchema = require("../../model/GeneratedDocModel/GeneratedDocModel");

function getGeneratedDocModelModel(dbConnection) {
  return (
    dbConnection.models.GeneratedDocModel ||
    dbConnection.model("GeneratedDocModel", GeneratedDocModelSchema)
  );
}

const saveGenerated = async (generatedDocData, dbName) => {
  const GeneratedDocModel = await getGeneratedDocModelModel(dbName);
  const generatedDoc = new GeneratedDocModel(generatedDocData);
  return generatedDoc.save();
};

const getGenerartedDocsByModelId = async (model_id, dbName) => {
  const query = {
    model: model_id,
  };
  const GeneratedDocModel = await getGeneratedDocModelModel(dbName);
  return await GeneratedDocModel.find(query)
    .populate("model")
    .populate("enseignant")
    .populate("etudiant")
    .populate("personnel");
};

const getGenerartedDocsByQrCode = async (num_qr_code, dbName) => {
  const query = {
    num_qr_code: num_qr_code,
  };
  const GeneratedDocModel = await getGeneratedDocModelModel(dbName);
  return await GeneratedDocModel.find(query)
    .populate("model")
    .populate("enseignant")
    .populate("etudiant")
    .populate("personnel");
};

const deleteGeneratedDocByDocName = async (docName, dbName) => {

  const GeneratedDocModel = await getGeneratedDocModelModel(dbName);
  return await GeneratedDocModel.deleteOne({ doc: docName });
}

module.exports = {
  saveGenerated,
  getGenerartedDocsByModelId,
  getGenerartedDocsByQrCode,
  deleteGeneratedDocByDocName
};
