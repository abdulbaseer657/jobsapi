const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: [true, "company name must be provided"],
  },
  jobtitle: {
    type: String,
    required: [true, "job title must be provided"],
  },
  jobid: {
    type: String,
  },
  lastupdated: {
    type: Date,
    default: Date.now(),
  },
  domain: {
    type: String,
  },
  internship: {
    type: Boolean,
  },
  // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  applylink: {
    type: String,
  },
});

module.exports = mongoose.model("jobs", jobsSchema);
