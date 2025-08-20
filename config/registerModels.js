const userSchema = require("../model/userModel/userModel");
const enseignantSchema = require("../model/EnseignantModel/EnseignantModel");
const personnelSchema = require("../model/PersonnelModel/PersonnelModel");
const permissionSchema = require("../model/permissionsModel/permissionModel");
const VirtualServiceSchema = require("../model/VirtualServiceModel/VirtualServiceModel");
const UserPermission = require("../model/usePermissionModel/usePermissionModel");
const departementSchema = require("../model/departementModel/DepartementModel");

const AbsenceEtudiantSchema = require("../model/AbsenceEtudiantModel/AbsenceEtudiantModel");
const AbsencePersonnelSchema = require("../model/AbsencePersonnelModel/AbsencePersonnelModel");
const ActualiteSchema = require("../model/ActualiteModel/ActualiteModel");
const AvisEnseignantSchema = require("../model/AvisEnseignant/AvisEnseignant");
const AvisEtudiantSchema = require("../model/AvisEtudiant/AvisEtudiantModel");
const AvisPersonnelSchema = require("../model/AvisPersonnel/AvisPersonnel");
const categoriePersonnelSchema = require("../model/CategoriePersonnelModel/CategoriePersonnelModel");

const classeSchema = require("../model/ClasseModels/ClasseModels");
const classEmploiPeriodiqueSchema = require("../model/ClassEmploiPeriodiqueModel/ClassEmploiPeriodiqueModel");
const DemandeCongeSchema = require("../model/CongéModels/demandeConge");
const LeaveBalanceSchema = require("../model/CongéModels/SoldeCongéModel");
const LeaveSubcategorySchema = require("../model/CongéModels/TypeCongéModel");
const courrierEntrantSchema = require("../model/CourrierEntrantModel/CourrierEntrantModel");
const courrierSortantSchema = require("../model/CourrierSortantModel/CourrierSortantModel");
const CoursEnseignantSchema = require("../model/CoursEnseignantModel/CoursEnseignantModel");
const cycleSchema = require("../model/CycleModel/CycleModel");

const DemandeEnseignantSchema = require("../model/DemandeEnseignantModel/DemandeEnseignantModel");
const DemandeEtudiantSchema = require("../model/DemandeEtudiantModel/DemandeEtudiantModel");
const DemandePersonnelSchema = require("../model/DemandePersonnelModel/DemandePersonnelModel");
const DemandeTirageSchema = require("../model/DemandeTirageModel/DemandeTirageModel");
const DeplacementSchema = require("../model/Deplacement/Deplacement");
const DomaineClasseSchema = require("../model/DomaineClasseModel/DomaineClasseModel");
const DossierAdministratifSchema = require("../model/DossierAdministratifModel/DossierAdministratifModel");
const etatCompteEnseignantSchema = require("../model/etatCompteEnseignantModel/etatCompteEnseignantModel");
const etatCompteEtudiantSchema = require("../model/etatCompteEtudiantModel/EtatCompteEtudiantModel");

const etatPersonnelSchema = require("../model/etatPersonnelModel/EtatPersonnel");
const etudiantSchema = require("../model/EtudiantModel/EtudiantModel");
const examenSchema = require("../model/ExamenModel/ExamenModel");
const ficheVoeuxSchema = require("../model/FicheVoeuxModel/FicheVoeuxModel");
const GeneratedDocModelSchema = require("../model/GeneratedDocModel/GeneratedDocModel");
const gradeEnseignantSchema = require("../model/GradeEnseignantModel/GradeEnseignantModel");
const gradePersonnelSchema = require("../model/GradePersonnelModel/GradePersonnelModel");
const intervenantSchema = require("../model/IntervenantBureauOrdre/IntervenantBureauOrdre");

const matiereSchema = require("../model/MatiereModel/MatiereModel");
const mentionClasseSchema = require("../model/MentionClasseModel/MentionClasseModel");
const messageSchema = require("../model/MessagerieModel/MessagerieModel");
const missionSchema = require("../model/MissionModel/Mission");
const moduleParcoursSchema = require("../model/ModulesParcoursModel/ModulesParcoursModel");
const niveauClasseSchema = require("../model/NiveauClasseModel/NiveauClasseModel");
const noteExamenSchema = require("../model/NoteExamenModel/noteExamenModel");
const noteProSchema = require("../model/NoteProModel/NotePro");
const papierAdministratifSchema = require("../model/PapierAdministratif/PapierAdministratifModel");
const parcoursSchema = require("../model/ParcoursModel/ParcoursModel");
const personnelWorkingDaySchema = require("../model/PersonnelWorkingDayModel/PersonnelWorkingDayModel");
const pointageEnseignantSchema = require("../model/PointageEnseignantModel/PointageEnseignantModel");
const posteEnseignantSchema = require("../model/PosteEnseignantModel/PosteEnseignantModel");
const postePersonnelSchema = require("../model/PostePersonnelModel/PostePersonnelModel");
const rattrapageSchema = require("../model/RattrapageModel/RattrapageModel");
const reclamationEnseignantSchema = require("../model/ReclamationEnseignantModel/ReclamationEnseignantModel");
const reclamationSchema = require("../model/ReclamationEtudiantModel/ReclamationEtudiantModel");
const reclamationPersonnelSchema = require("../model/ReclamationPersonnelModel/ReclamationPersonnelModel");
const salleDisponibiliteSchema = require("../model/SalleDisponibilite/SalleDisponibilite");
const salleSchema = require("../model/SallesModel/SallesModel");
const seanceSchema = require("../model/SeancesModel/SeanceModel");
const sectionClasseSchema = require("../model/SectionClasseModel/SectionClasseModel");
const servicePersonnelSchema = require("../model/ServicePersonnelModel/ServicePersonnelModel");
const shortCodeSchema = require("../model/ShortCodeModel/shortCodeModel");
const specialiteEnseignantSchema = require("../model/SpecialiteEnseignantModel/SpecialiteEnseignantModel");
const teacherPeriodSchema = require("../model/TeacherPeriodModel/TeacherPeriodModel");
const templateBodySchema = require("../model/TemplateBodyModel/templateBodyModel");
const templateSchema = require("../model/TemplateModel/templateModel");
const timeTableParamsSchema = require("../model/TimeTableParamsModel/TimeTableParamsModel");
const typeInscriptionEtudiantSchema = require("../model/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");
const typeParcoursSchema = require("../model/TypeParcoursModel/TypeParcoursModel");
const typeSeanceSchema = require("../model/TypeSeanceModel/TypeSeanceModel");
const variableGlobaleSchema = require("../model/VariableGlobaleModel/variableGlobaleModel");
const voieEnvoiSchema = require("../model/VoieEnvoiModel/VoieEnvoiModel");

const societeSchema = require("../model/SocieteModel/SocieteModel");
const stagePfeSchema = require("../model/StagePfeModel/StagePfeModel");
const extraShortCodeSchema = require("../model/ShortCodeModel/extraShortCodeModel")
//const diversDocExtraSchema = require("../model/DiversDocExtraModel/DiversDocExtraModel")
const studentsMessageSchema = require("../model/StudentsMessageModel/StudentsMessageModel")
const studentsRoomSchema = require("../model/StudentsRoomModel/StudentsRoomModel")
//const extraShortCodeSchema = require("../model/ShortCodeModel/extraShortCodeModel");
const diversDocExtraSchema = require("../model/DiversDocExtraModel/DiversDocExtraModel");
const commissionSchema = require("../model/CommissionModel/CommissionModel");
const typeStageSchema = require("../model/TypeStageModel/TypeStageModel");
const avisCommissionSchema = require("../model/AvisCommission/AvisCommission");
const generatedPvSchema = require("../model/GeneratedPvModel/GeneratedPvModel");
const encadrementSchema = require("../model/EncadrementModel/EncadrementModel");
const teachersMessageSchema = require("../model/TeachersMessageModel/TeachersMessageModel");
const teachersRoomSchema = require("../model/TeachersRoomModel/TeachersRoomModel");

function registerModels(conn) {

  conn.model("TeachersRoom", teachersRoomSchema);
  conn.model("TeachersMessage", teachersMessageSchema);
  //message and room massenger for students
  conn.model("StudentsRoom", studentsRoomSchema);
  conn.model("StudentsMessage", studentsMessageSchema);


  conn.model("User", userSchema);
  conn.model("Enseignant", enseignantSchema);
  conn.model("Personnel", personnelSchema);
  conn.model("Permission", permissionSchema);
  conn.model("VirtualService", VirtualServiceSchema);
  conn.model("UserPermission", UserPermission);

  conn.model("Departement", departementSchema);
  conn.model("AbsenceEtudiant", AbsenceEtudiantSchema);
  conn.model("AbsencePersonnel", AbsencePersonnelSchema);
  conn.model("Actualite", ActualiteSchema);
  conn.model("AvisEnseignant", AvisEnseignantSchema);

  conn.model("AvisEtudiant", AvisEtudiantSchema);
  conn.model("AvisPersonnel", AvisPersonnelSchema);
  conn.model("CategoriePersonnel", categoriePersonnelSchema);
  conn.model("Classe", classeSchema);
  conn.model("ClassEmploiPeriodique", classEmploiPeriodiqueSchema);

  conn.model("DemandeConge", DemandeCongeSchema);
  conn.model("LeaveBalance", LeaveBalanceSchema);
  conn.model("LeaveType", LeaveSubcategorySchema);
  conn.model("CourrierEntrant", courrierEntrantSchema);
  conn.model("CourrierSortant", courrierSortantSchema);

  conn.model("PermiCoursEnseignantssion", CoursEnseignantSchema);
  conn.model("Cycle", cycleSchema);
  conn.model("DemandeEnseignant", DemandeEnseignantSchema);
  conn.model("DemandeEtudiant", DemandeEtudiantSchema);
  conn.model("DemandePersonnel", DemandePersonnelSchema);

  conn.model("DemandeTirage", DemandeTirageSchema);
  conn.model("Deplacement", DeplacementSchema);
  conn.model("DomaineClasse", DomaineClasseSchema);
  conn.model("DossierAdministratif", DossierAdministratifSchema);
  conn.model("EtatCompteEnseignant", etatCompteEnseignantSchema);

  conn.model("EtatCompteEtudiant", etatCompteEtudiantSchema);
  conn.model("EtatPersonnel", etatPersonnelSchema);
  conn.model("Etudiant", etudiantSchema);
  conn.model("Examen", examenSchema);
  conn.model("ficheVoeux", ficheVoeuxSchema);

  conn.model("GeneratedDocModel", GeneratedDocModelSchema);
  conn.model("GradeEnseignant", gradeEnseignantSchema);
  conn.model("GradePersonnel", gradePersonnelSchema);
  conn.model("Intervenant", intervenantSchema);

  conn.model("Matiere", matiereSchema);
  conn.model("MentionClasse", mentionClasseSchema);
  conn.model("Message", messageSchema);
  conn.model("MissionSchema", missionSchema);
  conn.model("ModuleParcours", moduleParcoursSchema);
  conn.model("NiveauClasse", niveauClasseSchema);
  conn.model("NoteExamen", noteExamenSchema);
  conn.model("NotePro", noteProSchema);
  conn.model("PapierAdministratif", papierAdministratifSchema);
  conn.model("Parcours", parcoursSchema);
  conn.model("PersonnelWorkingDay", personnelWorkingDaySchema);
  conn.model("PointageEnseignant", pointageEnseignantSchema);
  conn.model("PosteEnseignant", posteEnseignantSchema);
  conn.model("PostePersonnel", postePersonnelSchema);
  conn.model("Rattrapage", rattrapageSchema);
  conn.model("ReclamationEnseignant", reclamationEnseignantSchema);
  conn.model("Reclamation", reclamationSchema);
  conn.model("ReclamationPersonnel", reclamationPersonnelSchema);
  conn.model("SalleDisponibilite", salleDisponibiliteSchema);
  conn.model("Salle", salleSchema);
  conn.model("Seance", seanceSchema);
  conn.model("SectionClasse", sectionClasseSchema);
  conn.model("ServicePersonnel", servicePersonnelSchema);
  conn.model("ShortCode", shortCodeSchema);
  conn.model("SpecialiteEnseignant", specialiteEnseignantSchema);
  conn.model("TeacherPeriod", teacherPeriodSchema);
  conn.model("TemplateBody", templateBodySchema);
  conn.model("Template", templateSchema);
  conn.model("TimeTableParams", timeTableParamsSchema);
  conn.model("TypeInscriptionEtudiant", typeInscriptionEtudiantSchema);
  conn.model("TypeParcours", typeParcoursSchema);
  conn.model("TypeSeance", typeSeanceSchema);
  conn.model("VariableGlobale", variableGlobaleSchema);
  conn.model("VoieEnvoi", voieEnvoiSchema);

  conn.model("Societe", societeSchema);
  conn.model("StagePfe", stagePfeSchema);
  conn.model("ExtraShortCode", extraShortCodeSchema);
  conn.model("DiversDocExtra", diversDocExtraSchema);
  conn.model("Commission", commissionSchema);
  conn.model("TypeStage", typeStageSchema);
  conn.model("AvisCommission", avisCommissionSchema);
  conn.model("GeneratedPv", generatedPvSchema);
  conn.model("Encadrement", encadrementSchema)
}
module.exports = { registerModels };
