const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '3afa13294f2b4869888e5a0924f4d61c'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)	
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('Unable to work with api'))
}



const handleImage = (db) => (req, res) => {
	const { id } = req.body
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
	handleImage: handleImage
}