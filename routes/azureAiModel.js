const router = require("express").Router();
const axios = require('axios');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with timestamp
  },
});

const upload = multer({ storage });

// API route to forward query to Python LLM service
router.post('/', upload.array("files"), async (req, res) => {
    console.log(req);
    const files = [];

    req.files.forEach((file) => {
      files.push(file.originalname); // Append filenames
    });

    const query = req.body.query;

    if (!files || !query) {
      return res.status(400).send({ error: "File and query are required" });
    }
    const data = {
        file: files,
        query: query
    };
    // const body = JSON.stringify({ query });
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/process', { // Replace with your Python service URL
        data : data
      });
  
      // const data = await response.json();
      console.log(response.data.response);
      res.send(response.data.response);
    } catch (error) {
      console.error('Error fetching from LLM service:', error);
      res.status(500).json({ message: 'Error processing query' });
    }
  
    console.log(query);
    // res.send(req.body);
  });
  
module.exports = router  