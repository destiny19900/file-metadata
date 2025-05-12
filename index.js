var express = require('express');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Ensure uploads directory exists
var uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
var upload = multer({ dest: '/tmp/' }); // Temporary storage for uploaded files

// Define the /api/fileanalyse endpoint
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});