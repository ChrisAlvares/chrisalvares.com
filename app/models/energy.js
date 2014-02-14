/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var Energy = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, 
        unique: true,
        trim:true
    },
    endreading: {
        type: Number, 
        default: 0
    },
    startreading: {
        type: Number,
        default: 0,
    },
    wattage: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Energy', Energy);