const mongoose = require('mongoose');

let vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 100 },
    label: { type: String, required: true },
    emitfactor: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

let vehicleModel = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
    vehicleSchema,
    vehicleModel
};
