const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Task Wars', message: 'Hello User! Let\'s play the game.'});
});

module.exports = router;