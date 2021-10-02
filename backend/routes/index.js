const express = require("express");
const router = express.Router();

/**
 * landing page for api.eyaldelarea.dev
 * serves as the backend server for the app
 * this should redirect to eyaldelarea.dev 
 * for now in order to show the endpoint, it reposneds with hello world
 */

router.get("/", (req, res) => {
  res.send("Backend Server says hello");
});

module.exports = router;
