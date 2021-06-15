const Report = require('../../models/Report');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const AWSCredentials = {
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'palmpatrol',
};
const s3 = new aws.S3({
  accessKeyId: AWSCredentials.accessKey,
  secretAccessKey: AWSCredentials.secret,
});
const uploadToS3 = (file) => {
  // Read extension from the file
  let ext = file.name.split('.')[1];

  // Setting up S3 upload parameters
  const params = {
    Bucket: AWSCredentials.bucketName,
    Key: `${uuidv4()}.${ext}`,
    Body: file.data,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) reject(err);
      if (data) resolve(data);
    });
  });
};
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
    let files;
    // get report body for database
    let report = JSON.parse(req.body.report);
    // upload files push urls to report create and save report
    if (req.files) {
      files = req.files.files;
      if (files.length > 1) {
        console.log(files);
        await Promise.all(
          files.map(async (file) => {
            let imgData = await uploadToS3(file);
            await report.photos.push({
              key: imgData.key,
              url: imgData.Location,
            });
          })
        );
      } else {
        let imgData = await uploadToS3(files);
        await report.photos.push({ key: imgData.key, url: imgData.Location });
      }
    }
    let newReport = await Report.create(report);
    console.log(newReport);
    res.status(201).json({ report: newReport });
  } catch (err) {
    console.log(err);
  }
}
