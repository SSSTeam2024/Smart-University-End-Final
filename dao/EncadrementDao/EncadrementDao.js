const encadrementSchema = require("../../model/EncadrementModel/EncadrementModel");
const mongoose = require("mongoose"); 

function getEncadrementModel(dbConnection) {
  return (
    dbConnection.models.Encadrement ||
    dbConnection.model("Encadrement", encadrementSchema)
  );
}

const createEncadrement = async (encadrement, dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.create(encadrement);
};

const getAllEncadrements = async (dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.find()
    .populate("enseignant")
    .populate("etudiant")
    .populate("stage");
};

const getEncadrementById = async (id, dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.findById(id)
    .populate("enseignant")
    .populate("etudiant")
    .populate("stage");
};

const updateEncadrement = async (id, updateData, dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEncadrement = async (id, dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.findByIdAndDelete(id);
};

const deleteManyEncadrements = async (ids, dbConnection) => {
  const Encadrement = getEncadrementModel(dbConnection);
  return await Encadrement.deleteMany({ _id: { $in: ids } });
};


// const getGroupedEncadrementsByEnseignant = async (enseignantId, db) => {
//   const Encadrement = getEncadrementModel(db);

//   return await Encadrement.aggregate([
//     {
//       $match: {
//         enseignant: new mongoose.Types.ObjectId(enseignantId),
//       },
//     },
//     // Join with Etudiant
//     {
//       $lookup: {
//         from: "etudiants",
//         localField: "etudiant",
//         foreignField: "_id",
//         as: "etudiant",
//       },
//     },
//     { $unwind: "$etudiant" },

//     // Optionally populate groupe_classe inside etudiant
//     {
//       $lookup: {
//         from: "groupesclasses", // adapt if your collection is named differently
//         localField: "etudiant.groupe_classe",
//         foreignField: "_id",
//         as: "etudiant.groupe_classe",
//       },
//     },
//     {
//       $unwind: {
//         path: "$etudiant.groupe_classe",
//         preserveNullAndEmptyArrays: true,
//       },
//     },

//     // Group by Etudiant
//     {
//       $group: {
//         _id: "$etudiant._id",
//         etudiant: { $first: "$etudiant" },
//         encadrements: {
//           $push: {
//             _id: "$_id",
//             seance: "$seance",
//             date: "$date",
//             heure_debut: "$heure_debut",
//             heure_fin: "$heure_fin",
//             mode: "$mode",
//             avancement: "$avancement",
//             remarque: "$remarque",
//             createdAt: "$createdAt",
//             updatedAt: "$updatedAt",
//           },
//         },
//       },
//     },

//     {
//       $project: {
//         _id: 0,
//         etudiant: 1,
//         encadrements: 1,
//       },
//     },
//   ]);
// };

// const getGroupedEncadrementsByEnseignant = async (enseignantId, db) => {
//   const Encadrement = getEncadrementModel(db);

//   return await Encadrement.aggregate([
//     {
//       $match: {
//         enseignant: new mongoose.Types.ObjectId(enseignantId),
//       },
//     },

//        // Force casting of stage to ObjectId (if needed)
//     {
//       $addFields: {
//         stage: {
//           $cond: {
//             if: { $eq: [{ $type: "$stage" }, "string"] },
//             then: { $toObjectId: "$stage" },
//             else: "$stage",
//           },
//         },
//       },
//     },
//     // Join with Etudiant
//     {
//       $lookup: {
//         from: "etudiants",
//         localField: "etudiant",
//         foreignField: "_id",
//         as: "etudiant",
//       },
//     },
//     { $unwind: "$etudiant" },

//     // Optionally populate groupe_classe inside etudiant
//     {
//       $lookup: {
//         from: "groupesclasses", // adapt if your collection is named differently
//         localField: "etudiant.groupe_classe",
//         foreignField: "_id",
//         as: "etudiant.groupe_classe",
//       },
//     },
//     {
//       $unwind: {
//         path: "$etudiant.groupe_classe",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//        // ✅ Lookup for Stage
//     {
//       $lookup: {
//         from: "StagePfe", // name of your StagePFE collection
//         localField: "stage",
//         foreignField: "_id",
//         as: "stage",
//       },
//     },
//     {
//       $unwind: {
//         path: "$stage",
//         preserveNullAndEmptyArrays: true,
//       },
//     },

//     // Group by Etudiant
//     {
//       $group: {
//         _id: "$etudiant._id",
//         etudiant: { $first: "$etudiant" },
       
//         encadrements: {
//           $push: {
//             _id: "$_id",
//             seance: "$seance",
//             date: "$date",
//             heure_debut: "$heure_debut",
//             heure_fin: "$heure_fin",
//             mode: "$mode",
//              stage: "$stage", 
//             avancement: "$avancement",
//             remarque: "$remarque",
//             createdAt: "$createdAt",
//             updatedAt: "$updatedAt",
//           },
//         },
//       },
//     },

//     {
//       $project: {
//         _id: 0,
//         etudiant: 1,
//         encadrements: 1,
       
//       },
//     },
//   ]);
// };

// const getGroupedEncadrementsByEnseignant = async (enseignantId, db) => {
//   const Encadrement = getEncadrementModel(db);

//   const encadrements = await Encadrement.find({ enseignant: enseignantId })
//     .populate({
//       path: "etudiant",
//       populate: { path: "groupe_classe" },
//     })
//     .populate("stage")
//     .exec();

//   // Group manually by etudiant._id
//   const grouped = encadrements.reduce((acc, enc) => {
//     const etuId = enc.etudiant._id.toString();
//     if (!acc[etuId]) {
//       acc[etuId] = {
//         etudiant: enc.etudiant,
//         encadrements: [],
//       };
//     }
//     acc[etuId].encadrements.push(enc);
//     return acc;
//   }, {});

//   return Object.values(grouped);
// };

const getGroupedEncadrementsByEnseignant = async (enseignantId, db) => {
  const Encadrement = getEncadrementModel(db);

  const result = await Encadrement.aggregate([
    {
      $match: {
        enseignant: new mongoose.Types.ObjectId(enseignantId),
      },
    },

    {
      $addFields: {
        stage: {
          $cond: {
            if: { $eq: [{ $type: "$stage" }, "string"] },
            then: { $toObjectId: "$stage" },
            else: "$stage",
          },
        },
      },
    },

    // Populate etudiant
    {
      $lookup: {
        from: "etudiants",
        localField: "etudiant",
        foreignField: "_id",
        as: "etudiant",
      },
    },
    { $unwind: "$etudiant" },

    // Populate groupe_classe inside etudiant
    {
      $lookup: {
        from: "groupesclasses",
        localField: "etudiant.groupe_classe",
        foreignField: "_id",
        as: "etudiant.groupe_classe",
      },
    },
    { $unwind: { path: "$etudiant.groupe_classe", preserveNullAndEmptyArrays: true } },

    // Populate stage (IMPORTANT: check exact collection name here!)
    {
      $lookup: {
        from: "stagepves", // <-- Confirm this name
        localField: "stage",
        foreignField: "_id",
        as: "stage",
      },
    },
    { $unwind: { path: "$stage", preserveNullAndEmptyArrays: true } },
    

    // Group by student
    {
      $group: {
        _id: "$etudiant._id",
        etudiant: { $first: "$etudiant" },
        encadrements: {
          $push: {
            _id: "$_id",
            seance: "$seance",
            date: "$date",
            heure_debut: "$heure_debut",
            heure_fin: "$heure_fin",
            mode: "$mode",
            avancement: "$avancement",
            remarque: "$remarque",
            stage: "$stage",  // this is populated stage object
            createdAt: "$createdAt",
            updatedAt: "$updatedAt",
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        etudiant: 1,
        encadrements: 1,
         stage: { $arrayElemAt: ["$encadrements.stage", 0] },  // this is usually unnecessary or problematic

      },
    },
  ]);

  return result;
};



module.exports = {
  createEncadrement,
  getAllEncadrements,
  getEncadrementById,
  updateEncadrement,
  deleteEncadrement,
  deleteManyEncadrements,
  getGroupedEncadrementsByEnseignant
};
