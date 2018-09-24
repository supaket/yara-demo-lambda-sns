const aws = require('aws-sdk')
var s3 = new aws.S3()

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.s3event = (event, context, cb) => {
  console.log('s3event', event)
  const record = event.Records[0];
  const bucket = record.s3.bucket.name
  const originalFilePath = record.s3.object.key
  console.log('detail', record, bucket, originalFilePath)
  s3.putObject({
    Body: originalFilePath,
    Bucket: bucket,
    Key: "updated.txt"
  }, (err, data) => {
    console.log('put', err, data)
    cb(err, {
      statusCode: 200,
      body: JSON.stringify({
        message: 's3event response',
        input: event,
      })
    })
  })
}
