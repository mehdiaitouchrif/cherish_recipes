import express from 'express'
const router = express.Router({ mergeParams: true })
import aws from 'aws-sdk'

// GET SIGNED S3 URL
const SignS3 = (req, res) => {
	const s3 = new aws.S3()
	const fileName = req.query['file-name']
	const fileType = req.query['file-type']
	const s3Params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read',
	}

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err)
			return res.end()
		}
		const returnData = {
			signedRequest: data,
			url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
		}

		res.json(returnData)
	})
}

router.get('/sign-s3', SignS3)
export default router
