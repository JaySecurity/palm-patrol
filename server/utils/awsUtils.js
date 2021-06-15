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

module.exports = { uploadToS3 };
