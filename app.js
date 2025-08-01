const express = require("express");
const puppeteer = require("puppeteer");
const { createServer } = require("http");
const cors = require("cors");
const AppRouter = require("./routes/appRouter");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

const socketHandler = require("./socket");
const { init } = require("./socket/ioInstance");

const app = express();
const httpServer = createServer(app);

const io = init(httpServer);

socketHandler(io);

dotenv.config();
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json());
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/api", AppRouter);

app.post("/generate-pdf", async (req, res) => {
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).send("HTML content is required");
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=generated-document.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

httpServer.listen(7000, () => {
  console.log("Backend server is running!");
});

module.exports = app;
