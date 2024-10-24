// app.js
const express = require('express')
const app = express();
const usersRouter = require('./routes/usersRouter');

const usersStorage = require("./storages/usersStorage");


app.set("view engine", "ejs");
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath, { extended: true }));

app.use("/", usersRouter);

    // Generates some fake users
usersStorage.getMockUsers();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

const { body, validationResult } = require('express-validator');
