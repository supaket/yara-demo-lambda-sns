const aws = require('aws-sdk')
var s3 = new aws.S3()

module.exports.getPage = (event, context, cb) => {
  const html = `
<!DOCTYPE html>
<html>

<body>
    <p id="text">Waiting for changes</p>

    <script lang="javascript">
        setInterval(function () {
            fetch('https://pwdux2lg2e.execute-api.ap-southeast-1.amazonaws.com/dev/getLastKey')
                .then(function (data) {
                    console.log('fetched', data)
                })
        }, 1000)
    </script>
</body>

</html>
  `
  console.log('html', html)
  cb(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html
  })
}

module.exports.getLastKey = (event, context, cb) => {
  console.log(event)
  s3.getObject({
    Bucket: "yara-demo-dev-uploads",
    Key: "updated.txt"
  }, (err, data) => {
    if ( err ) {
      console.log('error:', err)
      cb(err)
    } else {
      console.log('success:', data)
      cb(null, {
        statusCode: 200,
        body: data.Body.toString()
      })
    }
  })
}

module.exports.s3event = (event, context, cb) => {
  console.log('s3event', event)
  const record = event.Records[0];
  const bucket = record.s3.bucket.name
  const originalFilePath = record.s3.object.key
  console.log('detail', record, bucket, originalFilePath)
  s3.putObject({
    Body: `You have just uploaded file key: ${originalFilePath}!`,
    Bucket: bucket,
    Key: "updated.txt"
  }, (err, data) => {
    if (err) {
      console.log('error:', err)
      cb(err)
    } else {
      console.log('success:', data)
      cb(null, {
        statusCode: 200,
        body: data
      })
    }
  })
}
