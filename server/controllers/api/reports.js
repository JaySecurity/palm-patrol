const Report = require('../../models/Report');

module.exports = { all, create };

async function all(req, res) {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    // get files to send to S3
    let files = req.files.files;
    // get report body for database
    let report = JSON.parse(req.body.report);
    // upload files push urls to report create and save report

    res.status(201).json({ msg: 'Created' });
  } catch (err) {
    console.log(err);
  }
}
