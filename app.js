const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const { errorController } = require("./controllers/errorController");

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			"img-src": ["'self'", "https: data:"],
		},
	})
);

// Limit request from the same API
// const limiter = rateLimit({
// 	max: 5000,
// 	windowMs: 60 * 60 * 1000,
// 	message: "Too Many Request from this IP, please try again in an hour",
// });
// app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
	express.json({
		limit: "15kb",
	})
);

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use("/api", routes);

//serve react static files
app.use(express.static(path.join("react_build")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/react_build/index.html"));
});

//handle errors
app.use(errorController);

module.exports = app;
