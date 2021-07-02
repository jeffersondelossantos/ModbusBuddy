const express = require('express');
const { Configuration } = require('../models/configuration');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('hello world');
    res.render('configuration', { configuration : new Configuration()})
})

router.post('/', (req, res) => {
    console.log(req.body.status)
    res.send(req.body.status)
})

module.exports = router;