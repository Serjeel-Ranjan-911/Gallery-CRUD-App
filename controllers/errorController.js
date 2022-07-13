exports.errorController = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let data = err.data || {};

    res.status(statusCode).json({
        status: "fail",
        message: message,
        data: data,
    });
}