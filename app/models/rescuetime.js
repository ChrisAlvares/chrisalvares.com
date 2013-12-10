/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var RescueTime = new mongoose.Schema({
    date: {
        type: Date, 
        unique: true,
        default: Date.now, 
        trim:true
    },
    news: {
        type: Number, 
        default: 0
    },
    working: {
        type: Number, 
        default: 0
    },
    email: {
        type: Number, 
        default: 0
    },
    social: {
        type: Number, 
        default: 0
    },
    miscellaneous: {
        type: Number, 
        default: 0
    }
});


module.exports = mongoose.model('RescueTime', RescueTime);