const Report = require("../../models/Report");
const { uploadToS3, deleteS3File } = require("../../utils/awsUtils");

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
    let files;
    // get report body for database
    let report = JSON.parse(req.body.report);
    // upload files push urls to report create and save report
    if (req.files) {
      files = req.files.files;
      if (files.length > 1) {
        await Promise.all(
          files.map(async (file) => {
            let imgData = await uploadToS3(file);
            await report.photos.push({
              key: imgData.Key,
              url: imgData.Location,
            });
          })
        );
      } else {
        let imgData = await uploadToS3(files);
        await report.photos.push({ key: imgData.Key, url: imgData.Location });
      }
    }
    let newReport = await Report.create(report);
    res.status(201).json({ report: newReport });
  } catch (err) {
    console.log(err);
  }
}

async function getOne(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: "Report Not Found" });
    }
    res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something Went Wrong!", error: err });
  }
}

async function deleteOne(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    await Promise.all(
      report.photos.map(async (file) => {
        let data = await deleteS3File(file.key);
      })
    );
    await report.delete();

    res.status(200).json({ msg: "Report Deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function addComment(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: "report not found" });
    }
    report.comments.push(req.body);
    report.save();
    console.log(report);
    res.status(201).json(report);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { all, create, getOne, deleteOne, addComment };
