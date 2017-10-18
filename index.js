var express = require('express');
//import axios from 'axios';
var multer = require('multer')
var cors = require('cors');

var app = express();
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
  
var upload = multer({ storage: storage }).single('file');

// express route where we receive files from the client
// passing multer middleware
app.post('/files', function (req, res) {
    upload(req, res, function (err) {
        if(err) {
            res.status(400).json({message: err.message})
        } else {
            let path = `/uploads/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});