/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var FitbitActivity = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, 
        unique: true,
        trim:true
    },
    veryActiveMinutes: {
        type: Number, 
        default: 0
    },
    fairlyActiveMinutes: {
        type: Number,
        default: 0,
    },
    steps: {
        type: Number,
        default: 0
    },
    activityCalories: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number, 
        default: 0
    },
    bmi: {
        type: Number,
        default: 0
    },
    rawActivityOutput: {
        type: String,
        default: ''
    },
    rawWeightOutput: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('FitbitActivity', FitbitActivity);