const express = require('express');
const router  = express.Router();

const validationHandler = require('../middleware/validationHandler');

const { createTravelSchema } = require('../utils/schemas/travels');

const travelModel = require('../models/travels');
const { vehicleModel } = require('../models/vehicles');


router.get('/', async (req, res) => {
    const travels = await travelModel.find();

    res.status(200).json({
        error: travels.length > 0 ? false : true,
        rows: travels.length,
        results: travels
    });
})

router.post('/create', 
    validationHandler(createTravelSchema), 
    async (req, res, next) => {
        const {
            startPoint, finalPoint,
            vehicleId, kilometers,
            workers, roundTrip
        } = req.body
        try {
            if (workers.length <= 0) {
                return res.status(406).json({
                    error: true,
                    message: 'Need to specify a list of workers'
                })
            }

            const createdTravel = await travelModel.create({
                startPoint,
                finalPoint,
                vehicle: await vehicleModel.findById(vehicleId),
                kilometers,
                workers,
                roundTrip
            })
            res.status(201).json({
                error: false,
                message: 'New travel registered',
                data: createdTravel
            })
        } catch (err) {
            next(err)
        }
});


module.exports = router;

