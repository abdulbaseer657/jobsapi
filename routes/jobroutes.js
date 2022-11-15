const express = require("express");
const router = express.Router();

const {
  getalljobs,
  postjob,
  deletejob,
  getjob,
  updatejob,
} = require("../controllers/curd");

router.route("/").get(getalljobs).post(postjob);
router.route("/:id").delete(deletejob).get(getjob).patch(updatejob);

module.exports = router;
