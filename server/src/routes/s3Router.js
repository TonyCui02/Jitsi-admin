import express from "express";
import aws from "aws-sdk";

const s3Router = express.Router();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

s3Router.route("/upload").post((req, res) => {
  console.log(req.body);
  const { filename, filetype } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
  };

  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "failed" });
    } else {
      res.status(200).json({ data: data });
    }
  });
});

export default s3Router;
