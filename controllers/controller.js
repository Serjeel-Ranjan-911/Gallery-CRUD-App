const dbClient = require("../db");
const mongo = require("mongodb");

exports.getAllImages = async (req, res, next) => {
	try {
		const pageNumber = parseInt(req.query.pageNumber || 1);
		const pageSize = parseInt(req.query.pageSize || 1);

		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db
			.collection(process.env.COL_NAME)
			.find({})
			.skip(pageSize * (pageNumber - 1))
			.limit(pageSize)
			.toArray();

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};

exports.getImageById = async (req, res, next) => {
	try {
		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db.collection(process.env.COL_NAME).findOne({
			_id: new mongo.ObjectId(req.params.id),
		});

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};

exports.createImage = async (req, res, next) => {
	try {
		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db.collection(process.env.COL_NAME).insertOne(req.body);

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateImage = async (req, res, next) => {
	try {
		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db
			.collection(process.env.COL_NAME)
			.updateOne(
				{ _id: new mongo.ObjectId(req.params.id) },
				{ $set: req.body }
			);

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteImage = async (req, res, next) => {
	try {
		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db.collection(process.env.COL_NAME).deleteOne({
			_id: new mongo.ObjectId(req.params.id),
		});

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};

exports.searchImage = async (req, res, next) => {
	try {
		const pageNumber = parseInt(req.query.pageNumber || 1);
		const pageSize = parseInt(req.query.pageSize || 1);

		let db = await dbClient.db(process.env.DB_NAME);
		let data = await db
			.collection(process.env.COL_NAME)
			.find({
				ImgName: { $regex: req.body.ImgName, $options: "i" },
			})
			.skip(pageSize * (pageNumber - 1))
			.limit(pageSize)
			.toArray();

		res.status(200).json({
			status: "success",
			data: data,
		});
	} catch (err) {
		next(err);
	}
};
