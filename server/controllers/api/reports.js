const Report = require('../../models/Report');
const { uploadToS3, deleteS3File } = require('../../utils/awsUtils');

async function allOnMap(req, res) {
  const { minLat, maxLat, minLong, maxLong } = req.query;
  try {
    const reports = await Report.find({})
      .where('location.lat')
      .gt(minLat)
      .lt(maxLat)
      .where('location.long')
      .gt(minLong)
      .lt(maxLong)
      .sort('-createdAt')
      .populate('user')
      .exec();

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
    const report = await Report.findById(req.params.id)
      .populate('comments.user')
      .populate('user')
      .exec();
    if (!report) {
      return res.status(404).json({ msg: 'Report Not Found' });
    }
    res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Something Went Wrong!', error: err });
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

    res.status(200).json({ msg: 'Report Deleted' });
  } catch (err) {
    console.log(err);
  }
}

async function addComment(req, res) {
  try {
    let report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'report not found' });
    }
    await report.comments.push(req.body);
    await report.save();
    report = await Report.findById(report._id)
      .populate('comments.user')
      .populate('user')
      .exec();
    res.status(201).json(report);
  } catch (err) {
    console.log(err);
  }
}
async function allForUser(req, res) {
  try {
    const reports = await Report.find({ user: req.params.id })
      .populate('user')
      .exec();
    res.status(200).json(reports);
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(report);
  } catch (err) {
    console.log(err);
  }
}

async function deletePhoto(req, res) {
  try {
    const report = await Report.findOne({})
      .where('photos._id')
      .eq(req.params.id)
      .exec();
    if (!report) return res.sendStatus(404);
    const photo = report.photos.filter(
      (photo) => photo._id == req.params.id
    )[0];
    await deleteS3File(photo.key);
    report.photos = report.photos.filter((photo) => photo._id != req.params.id);
    report.save();
    res.status(200).json(report.photos);
  } catch (err) {
    console.log(err);
  }
}

async function addPhoto(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ msg: 'Report Not Found' });
    if (req.files) {
      let imgData = await uploadToS3(req.files.file);
      await report.photos.push({
        key: imgData.Key,
        url: imgData.Location,
      });
      await report.save();
      res.status(201).json(report.photos);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  allOnMap,
  create,
  getOne,
  deleteOne,
  addComment,
  allForUser,
  update,
  deletePhoto,
  addPhoto,
};
