// import path from 'path'
// import express from 'express'
// import multer from 'multer'

// const router = express.Router()

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, 'uploads/')
// 	},
// 	filename(req, file, cb) {
// 		cb(
// 			null,
// 			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// 		)
// 	},
// })

// function checkFileType(file, cb) {
// 	const fileTypes = /jpg|jpeg|png|webp/
// 	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
// 	const mimetype = fileTypes.test(file.mimetype)

// 	if (extname && mimetype) {
// 		return cb(null, true)
// 	} else {
// 		cb('Please upload a file of image type')
// 	}
// }

// const upload = multer({
// 	storage,
// 	fileFilter: function (req, file, cb) {
// 		checkFileType(file, cb)
// 	},
// })

// router.post('/', upload.single('profile'), function (req, res) {
// 	res.send(`/${req.file.path}`)
// })

// router.post('/', upload.array('recipe', 6), function (req, res) {
// 	res.send(`/${req.file.path}`)
// })

// export default router

import express from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}${file.originalname}`)
	},
})

const fileFilter = (req, file, cb) => {
	// reject a file
	const fileTypes = /jpg|jpeg|png|webp/
	const mimetype = fileTypes.test(file.mimetype)

	if (mimetype) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
	fileFilter,
})

const router = express.Router()

router.post('/recipe', upload.array('recipeImages', 4), (req, res) => {
	// Construct an arr of filepaths

	const filepaths = []
	req.files.map((file) => filepaths.push(`/${file.path}`))
	res.send(filepaths)
})

router.post('/profile', upload.single('profilePhoto'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
