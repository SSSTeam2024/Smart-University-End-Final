// const express = require('express');
// const app = express();
// const { createServer } = require("http");
// const cors = require('cors');
// const AppRouter = require('./routes/appRouter');
// const dotenv = require("dotenv");
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const path = require('path');

// const httpServer = createServer(app);

// app.use('/files', express.static(path.join(__dirname, 'files')));
// app.use(express.json({limit: "50mb"}));
// app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// dotenv.config();

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use('/api', AppRouter);

// mongoose.connect(process.env.MONGO_URL, {})
//     .then(() => console.log("MongoDB connected!"))
//     .catch(err => console.log(err));


// httpServer.listen(5000, () => {
//       console.log("Backend server is running!");
//   })


// module.exports = app;
const express = require('express');
const { createServer } = require("http");
const cors = require('cors');
const AppRouter = require('./routes/appRouter');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const httpServer = createServer(app);

// Middleware setup
dotenv.config();
app.use(cors({
    origin: '*', // or specify your frontend origin
    optionsSuccessStatus: 200,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/api', AppRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {})
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

// Start server
httpServer.listen(5000, () => {
    console.log("Backend server is running!");
});

module.exports = app;
