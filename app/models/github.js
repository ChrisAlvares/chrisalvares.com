/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var Github = new mongoose.Schema({
    date: {
        type: Date, 
        unique: true,
        default: Date.now, 
        trim:true
    },
    issues: {
        type: Number, 
        default: 0
    }
});

module.exports = mongoose.model('Github', Github);