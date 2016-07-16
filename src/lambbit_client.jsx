import AWS from 'aws-sdk';
import FileSystem from 'fs';
import Path from 'path';
import UUID from 'node-uuid';
import Commander from 'commander';

Commander.version('0.1.0')
  .option('-b, --bucket <name>', 'bucket name')
  .option('-f, --file <path>', 'bile path to upload to S3')
  .option('-e, --expire <time>', 'expire time (seconds)')
  .option('-t, --to <address>', 'to address')
  .option('-r, --from <address>', 'from address')
  .option('-s, --subject <string>', 'mail subject')
  .option('-o, --body <string>', 'mail body')
  .parse(process.argv);

const s3Bucket = new AWS.S3({ params: { Bucket: Commander.bucket } });
const key = UUID.v4() + Path.extname(Commander.file);
const binary = FileSystem.readFileSync(Commander.file);
const expire = Commander.expire;
const toAddress = Commander.to;
const fromAddress = Commander.from;
const mailSubject = Commander.subject;
const mailBody = Commander.body;

const params = {
  Key: key,
  Body: binary,
  Metadata: {
    to: toAddress,
    from: fromAddress,
    subject: mailSubject,
    body: mailBody,
    expires: expire
  }
};

s3Bucket.putObject(params, function(err, data) {
  if (err) {
    console.log('error: ', err);
  } else {
    console.log('success: ', data);
  }
});
