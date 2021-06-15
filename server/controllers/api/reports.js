const Report = require("../../models/Report");

module.exports = {
  all,
  deleteReport,
};

async function all(req, res) {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

async function create(req, res) {
  try {
  } catch (e) {}
}

function deleteReport(req, res) {
  console.log("delete button clicked");
  res.send("deleted");
}
