const joi = require('@hapi/joi');

const vehicleIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const vehicleNameSchema = joi.string().max(100);
const vehicleEmitFactorSchema = joi.string();

const createVehicleSchema = {
    name: vehicleNameSchema.required(),
    emitfactor: vehicleEmitFactorSchema.required()
}

module.exports = {
    vehicleIdSchema,
    createVehicleSchema
}
