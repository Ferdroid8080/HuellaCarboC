const express = require('express');
const router  = express.Router();

const travelsRouter = require('./travels');

router.use('/travels', travelsRouter);

router.get('/', (req, res) => {
    res.json({ message: 'carbon-footprint api service' })
})

module.exports = router;

