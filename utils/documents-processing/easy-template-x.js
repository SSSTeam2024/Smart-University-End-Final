const fs = require("fs");
const { TemplateHandler, MimeType } = require("easy-template-x");

const studentDataProcess = require('./studentDataProcessService')
const teacherDataProcess = require("./teacherDataProcessService")
const personnelDataProcess = require("./personnelDataProcessService")

async function generateDoc(fileName, category, demandId, modelLangage) {
    const templateFile = fs.readFileSync(`files/Modeles/${fileName}.docx`);

    let data;

    switch (category) {
        case 'student':
            if (modelLangage === 'arabic') {
                data = await studentDataProcess.processArabicStudentData(demandId);
            } else {
                data = await studentDataProcess.processFrenshStudentData(demandId);
            }
            break;

        case 'teacher':
            if (modelLangage === 'arabic') {
                data = await teacherDataProcess.processArabicTeacherData(demandId);
            } else {
                data = await teacherDataProcess.processFrenshTeacherData(demandId);
            }

            break;

        case 'employee':
            if (modelLangage === 'arabic') {
                data = await personnelDataProcess.processArabicPersonnelData(demandId);
            } else {
                data = await personnelDataProcess.processFrenshPersonnelData(demandId);
            }

            break;


        default:
            break;
    }


    // const data = {
    //     studentName: "Ali Hassan",
    //     department: "Computer Science",
    //     submissionDate: "2025-04-21",
    //     open_parenthese: ")",
    //     closed_parenthese: "(",
    // qrCode: {
    //     _type: "image",
    //     source: qrImage,
    //     format: MimeType.Png,
    //     width: 100,
    //     height: 100,
    //     altText: "QR Code",
    // },
    // };

    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data.information);
    switch (category) {
        case 'student':
            fs.writeFileSync(`files/generated_docs/docx/student_docx/${demandId}_${fileName}.docx`, doc);
            break;

        case 'teacher':
            fs.writeFileSync(`files/generated_docs/docx/teacher_docx/${demandId}_${fileName}.docx`, doc);
            break;

        case 'employee':
            fs.writeFileSync(`files/generated_docs/docx/employee_docx/${demandId}_${fileName}.docx`, doc);
            break;

        default:
            break;
    }

    console.log("Document generated with easy-template!");

    return data.generatedDocInfo;
}

module.exports = {
    generateDoc,
};