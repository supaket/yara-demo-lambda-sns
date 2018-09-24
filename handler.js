const AWS = require('aws-sdk')
var s3 = new AWS.S3()

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
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 's3event response',
      input: event,
    }),
  }
}
