const debug = require('debug')('Vril:MongoDB');
const mongoose = require('mongoose');
const vrilConfig = require('../../config/config');
mongoose.Promise = require('bluebird');

const dbUri = 'mongodb://'
    + vrilConfig().mongo.host 
    + vrilConfig().mongo.port
    + vrilConfig().mongo.db;

// Create the database connection
mongoose.connect(
    dbUri,
    { useNewUrlParser: true },
);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    debug('Mongoose default connection open to ' + dbUri);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    debug('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    debug('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});