/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var FitbitWeight = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, 
        unique: true,
        trim:true
    },
    weight: {
        type: Number, 
        default: 0
    },
    bmi: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('FitbitWeight', FitbitWeight);