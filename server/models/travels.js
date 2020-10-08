const mongoose = require('mongoose');

const { vehicleSchema } = require('./vehicles');
const { workerSchema } = require('./workers');

let travelSchema = new mongoose.Schema({
    startPoint: { type: String, required: true },
    finalPoint: { type: String, required: true },
    vehicle: vehicleSchema,
    kilometers: { type: Number, required: true },
    workers: [workerSchema],
    roundTrip: { type: Boolean, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

let travelModel = mongoose.model('Travel', travelSchema);

module.exports = travelModel;
