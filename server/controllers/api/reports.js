const Report = require('../../models/Report');

module.exports = { all };

async function all(req, res) {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
