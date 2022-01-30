const express = require('express');
const router  = express.Router();
const multer = require('multer');
const upload = multer();
const controller = require('../controllers/log.controller');

//Route endpoints for signing in and too register
router.get("/signin/:username/:password/:email", upload.none(), controller.getOneTest);
router.post("/register/:username/:password/:email/:technical/:updates", upload.none(),controller.newTest);

module.exports = router;