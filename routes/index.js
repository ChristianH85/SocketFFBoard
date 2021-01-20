const path = require("path");
// const express = require('express')
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);


router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../s2meclient/public/index.html"));
  });

  module.exports = router;