const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const validator = require("../controllers/validator");

router.get("/", controller.getAllImages);
router.get("/show/:id", controller.getImageById);

router.post("/", validator.validateFormBody, controller.createImage);
router.post("/search", controller.searchImage);

router.put("/:id/edit", validator.validateFormBody, controller.updateImage);

router.delete("/delete/:id", controller.deleteImage);

module.exports = router;
