const express = require('express');
const router  = express.Router();

const travelsRouter = require('./travels');
const vehiclesRouter = require('./vehicles');

router.use('/travels', travelsRouter);
router.use('/vehicles', vehiclesRouter);

router.get('/', (req, res) => {
    res.json({ message: 'carbon-footprint api service' })
})

module.exports = router;

