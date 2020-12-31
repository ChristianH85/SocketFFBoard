const path = require("path");
const express = require('express')
const router = require("express").Router();
const userRoutes = require("./user");
const leagueRoutes = require('./league')
// const playerRoutes = require("./player");
// const chatRoutes = require("./chat");

router.use("/user", userRoutes);
router.use("/league", leagueRoutes);
// router.use('/chat', chatRoutes);

// router.use(function(req, res) {
//     res.sendFile(path.join(__dirname, "../s2meclient/public/index.html"));
//   });

  module.exports = router;