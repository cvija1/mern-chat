import multer from "multer";

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname}-${Date.now()}.${file.mimetype.split("/")[1]}`
    );
  },
});
export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
