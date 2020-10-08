const mongoose = require('mongoose');

const {
    DB_HOST, 
    DB_PORT, 
    DB_NAME
} = process.env

mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error, 'connection error')
})

db.once('open', () => {
    console.log('database synced!')
})

module.exports = db;
