const joi = require('@hapi/joi');

const travelSchemaId = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const travelStartPointSchema = joi.string();
const travelFinalPointSchema = joi.string();
const travelVehicleSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const travelKilometerSchema = joi.number();
const travelWorkerSchema = joi.array();
const travelRoundTripSchema = joi.boolean();

const createTravelSchema = {
    startPoint: travelStartPointSchema.required(),
    finalPoint: travelFinalPointSchema.required(),
    vehicleId: travelVehicleSchema.required(),
    kilometers: travelKilometerSchema.required(),
    workers: travelWorkerSchema.required(),
    roundTrip: travelRoundTripSchema.required()
}

module.exports = {
    travelSchemaId,
    createTravelSchema
}
