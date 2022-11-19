const jobs = require("../models/jobs");
//get all jobs
// const getalljobs = async (req, res) => {
//   try {
//     const job = await jobs.find({});
//     res.status(200).json({ job });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const getalljobs = async (req, res) => {
  const { companyname, internship, jobid, domain, jobtitle, sort, fields } =
    req.query;
  const queryObject = {};
  if (companyname) {
    queryObject.companyname = { $regex: companyname, $options: "i" };
  }
  if (jobid) {
    queryObject.jobid = jobid;
  }
  if (internship) {
    queryObject.internship = internship === "true" ? true : false;
  }
  if (domain) {
    queryObject.domain = domain;
  }
  if (jobtitle) {
    queryObject.jobtitle = { $regex: jobtitle, $options: "i" };
  }
  let result = jobs.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("lastupdated");
  }
  const job = await result;

  res.status(200).json({ job });
};
//post a job
const postjob = async (req, res) => {
  try {
    const job = await jobs.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    res.status(200).json({ msg: err });
  }
};
//delete a job
const deletejob = async (req, res, next) => {
  const { id: jobid } = req.params;
  const job = await jobs.findOneAndDelete({ _id: jobid });
  if (!job) {
    return next((`No task with id : ${jobid}`, 404));
  }
  res.status(200).json({ job });
};
//get job by id
const getjob = async (req, res) => {
  try {
    const { id: jobid } = req.params;
    const job = await jobs.findOne({ _id: jobid });

    if (!job) {
      return res.status(404).json({ msg: `no such task: ${jobid}` });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//updtae a job
const updatejob = async (req, res) => {
  const { id: jobid } = req.params;

  const job = await jobs.findOneAndUpdate({ _id: jobid }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return res.status(200).json({ msg: `no such task: ${jobid}` });
  }

  res.status(200).json({ job });
};

module.exports = {
  getalljobs,
  postjob,
  deletejob,
  getjob,
  updatejob,
};
