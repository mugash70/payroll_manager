const express = require('express');
const multer = require('multer');
const path = require('path');
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
const uploadDirectory = path.join(__dirname, '..', 'uploads'); 
const upload = multer({ storage });
router.post('/upload', upload.single('pic_url'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided.' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});
module.exports = router;
