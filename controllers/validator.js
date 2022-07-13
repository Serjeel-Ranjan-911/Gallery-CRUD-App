const validUrl = require('valid-url');

exports.validateFormBody = (req, res, next) => {
	if (!req.body.ImgName || !req.body.ImgURL || !req.body.ImgDetails) {
		let err = new Error("Invalid form data");
		err.statusCode = 400;
		throw err;
	}

	if (typeof req.body.ImgName !== "string" || req.body.ImgName.length > 25) {
		let err = new Error("Invalid Image Name");
		err.statusCode = 400;
		throw err;
	}

	if (!validUrl.isUri(req.body.ImgURL)) {
		let err = new Error("Invalid Image URL");
		err.statusCode = 400;
		throw err;
	}

	if (
		typeof req.body.ImgDetails !== "string" ||
		req.body.ImgDetails.length > 200
	) {
		let err = new Error("Invalid Image Details");
		err.statusCode = 400;
		throw err;
	}

	next();
};
