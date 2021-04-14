var express = require('express');
var app = express();
var multer = require('multer');
const fs = require('fs');
var cors = require('cors');

app.use(cors())
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/publicsa'));

const storageDir = './uploads/';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, storageDir);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now());
  }
});

let upload = multer({ storage});

app.post('/upload-new', upload.array('doc'), (req, res) => {
  console.log('entered  new', req.files);
  const allFiles = [];
  fs.readdir(storageDir, (err, files) => {
    console.log(files, typeof files)
    res.send(files);
    // files.forEach(file => {
    //   console.log(file, typeof file)
    //   allFiles.push({
    //     originalname: file
    //   })
    // });
  });

});


app.listen(PORT, function() {

    console.log(`App running on port ${PORT}`);

});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   }
// })

// // var upload = multer({storage:storage});

// // app.post('/upload', upload.array('uploadedImages', 10), function(req, res) {
// //   var file = req.files;
// //   console.log(file);
// //   res.end();
// // });

// var upload = multer({ storage: storage }).array('file')

// app.post('/upload',function(req, res) {
     
//     upload(req, res, function (err) {
//            if (err instanceof multer.MulterError) {
//                return res.status(500).json(err)
//            } else if (err) {
//                return res.status(500).json(err)
//            }
//       return res.status(200).send(req.file)

//     })

// });

// app.post('/upload', (req, res) => {
//   console.log('entered', req.body);
//   let upload = multer({ storage}).single('file');

//   upload(req, res, function(err) {
//     console.log('entered', req.file);

//       if (req.fileValidationError) {
//           return res.send(req.fileValidationError);
//       }
//       else if (!req.file) {
//           return res.send('Please select a file to upload');
//       }
//       else if (err instanceof multer.MulterError) {
//           return res.send(err);
//       }
//       else if (err) {
//           return res.send("hi"+err);
//       }

//       // Display uploaded image for user validation
//       res.send("File uploaded");
//   });
// });