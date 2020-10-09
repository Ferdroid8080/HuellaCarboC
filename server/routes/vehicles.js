const express = require('express');
const router  = express.Router();
const slugify = require('slugify');

const validationHandler = require('../middleware/validationHandler');
const { createVehicleSchema } = require('../utils/schemas/vehicles');

const { vehicleModel } = require('../models/vehicles');

router.get('/', async (req, res) => {
    const vehicles = await vehicleModel.find();

    res.status(200).json({
        error: vehicles.length > 0 ? false : true,
        rows: vehicles.length,
        results: vehicles
    });
})

router.post('/create', 
    validationHandler(createVehicleSchema), 
    async (req, res, next) => {
        const { name, emitfactor } = req.body
        const label = slugify(name, { lower: true, strict: true })
        try {
            const vehicle = await vehicleModel.findOne({ label });
            if (!vehicle) {
                const createVehicle = await vehicleModel.create({
                    name,
                    emitfactor,
                    label
                })
                res.status(201).json({
                    error: false,
                    message: 'New Vehicled added',
                    data: createVehicle
                })
            } else {
                res.status(409).json({
                    error: true,
                    message: 'Vehicle already exists'
                })
            }
        } catch(err) {
            next(err)
        }
})

module.exports = router;
