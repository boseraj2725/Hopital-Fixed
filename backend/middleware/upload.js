const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==============================
// Upload Folder
// ==============================
const uploadFolder = path.join(
    __dirname,
    "../uploads/profile"
);

// Create folder automatically
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, {
        recursive: true,
    });
}

// ==============================
// Storage Configuration
// ==============================
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadFolder);

    },

    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        const filename =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            extension;

        cb(null, filename);

    },

});

// ==============================
// Allowed File Types
// ==============================
const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

// ==============================
// File Filter
// ==============================
const fileFilter = (req, file, cb) => {

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            ),
            false
        );

    }

};

// ==============================
// Multer Configuration
// ==============================
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

});

// ==============================
// Export
// ==============================
module.exports = upload;