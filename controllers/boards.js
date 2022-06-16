///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const projects = require("./projects.json");

const router = express.Router();



/////////////ROUTES/////////////

// INDEX

router.get('/', (req, res) => {
    res.send('hello world')
})


router.get("/projects", (req, res) => {
    // send projects via JSON
    res.json(projects);
});



module.exports = router;