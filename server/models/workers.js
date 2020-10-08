const mongoose = require('mongoose');

let workerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

let workerModel = mongoose.model('Worker', workerSchema);

module.exports = {
    workerSchema,
    workerModel
}
