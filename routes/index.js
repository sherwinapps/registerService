
const express = require('express');
const router = express.Router();

// Main Page
router.get('/', (req, res) => {
	res.send('Hello World');
});

module.exports = router;