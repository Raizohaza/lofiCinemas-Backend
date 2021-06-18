const multer = require('multer');

const storage = path =>
  multer.diskStorage({
    destination: './uploads/' + path,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

//   //update
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'public/');
//   },
//   // By default, multer removes file extensions so let's add them back
//   filename: function(req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      
//   }
// });

const upload = path =>
  multer({
    storage: storage(path),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });

module.exports = upload;