const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const generatedDocDao = require("../dao/GeneratedDocDao/GeneratedDocDao");

async function transform(fileName, category, demandId, generatedDocInfo, db) {
  const ext = ".pdf";
  let inputPath;
  let outputPath;

  switch (category) {
    case "student":
      inputPath = path.join(
        __dirname,
        `generated_docs/docx/student_docx/${demandId}_${fileName}.docx`
      );
      outputPath = path.join(
        __dirname,
        `generated_docs/pdf/student_pdf/${demandId}_${fileName}.pdf`
      );
      break;

    case "teacher":
      inputPath = path.join(
        __dirname,
        `generated_docs/docx/teacher_docx/${demandId}_${fileName}.docx`
      );
      outputPath = path.join(
        __dirname,
        `generated_docs/pdf/teacher_pdf/${demandId}_${fileName}.pdf`
      );
      break;

    case "employee":
      inputPath = path.join(
        __dirname,
        `generated_docs/docx/employee_docx/${demandId}_${fileName}.docx`
      );
      outputPath = path.join(
        __dirname,
        `generated_docs/pdf/employee_pdf/${demandId}_${fileName}.pdf`
      );
      break;

    default:
      break;
  }

  const docxBuf = await fs.readFile(inputPath);

  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  await fs.writeFile(outputPath, pdfBuf);

  let info = generatedDocInfo;
  info.doc = `${demandId}_${fileName}.pdf`;
  await generatedDocDao.saveGenerated(info, db);

  console.log("Pdf generated with libreoffice!");
}

module.exports = {
  transform,
};
