const Report = require("../../models/Report");

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
    console.log(req);
    res.status(201).json({ msg: "Created" });
  } catch (err) {
    console.log(err);
  }
}

function deleteReport(req, res) {
  console.log("delete button clicked");
  res.send("deleted");
}
