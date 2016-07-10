import AWS from 'aws-sdk';
import FileSystem from 'fs';
import Path from 'path';
import UUID from 'node-uuid';

const bucketName = process.argv[2];
const filepath = process.argv[3];
const ext = Path.extname(filepath);

const s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });
const body = FileSystem.readFileSync(filepath);

const params = {
  Key: UUID.v4() + ext,
  Body: body
};

s3Bucket.putObject(params, function(err, data) {
  if (err) {
    console.log('error: ', err);
  } else {
    console.log('success: ', data);
  }
});
