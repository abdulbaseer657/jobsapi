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
  lastupdated: {
    type: Date,
    default: Date.now(),
  },
  jobtype: {
    type: String,
    enum: {
      values: ["fullTime ", "internship"],
      message: "{VALUE} is not supported",
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  },
  applylink: {
    type: String,
  },
});

module.exports = mongoose.model("jobs", jobsSchema);
