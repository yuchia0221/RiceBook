const cloudinary = require("cloudinary").v2;
const { config, uploader } = cloudinary;

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
};

module.exports = { cloudinaryConfig, uploader };
