const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});
const uploadDirectory = path.join(__dirname, '.', 'uploads'); 
const upload = multer({ storage });

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
router.post('/', upload.array('pic_url', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No images provided.' });
  }
  const imageUrls = req.files.map(file => ({
    url: `${req.protocol}://${req.get('host')}/upload/${file.filename}`,
    originalname: file.originalname,
    filen:file.filename,
  }));
  res.json({ imageUrls });
});

router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDirectory, filename);
  res.sendFile(filePath);
});



router.delete('/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(uploadDirectory, fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'File deleted successfully.' });
  } else {
    res.status(404).json({ success: false, message: 'File not found.' });
  }
});
module.exports = router;
