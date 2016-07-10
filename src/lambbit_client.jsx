import AWS from 'aws-sdk';
import FileSystem from 'fs';
import Path from 'path';
import UUID from 'node-uuid';
import Commander from 'commander';

Commander.version('0.1.0')
  .option('-b, --bucket [name]', 'Bucket name')
  .option('-f, --file [path]', 'File path to upload to S3')
  .option('-e, --expire [time]', 'Expire time (seconds)')
  .option('-m, --mail [address]', 'Mail address that you want to send')
  .parse(process.argv);

const s3Bucket = new AWS.S3({ params: { Bucket: Commander.bucket } });
const key = UUID.v4() + Path.extname(Commander.file);
const body = FileSystem.readFileSync(Commander.file);

const params = {
  Key: key,
  Body: body,
  Metadata: {
    email: Commander.mail,
    expires: Commander.expire
  }
};

s3Bucket.putObject(params, function(err, data) {
  if (err) {
    console.log('error: ', err);
  } else {
    console.log('success: ', data);
  }
});
