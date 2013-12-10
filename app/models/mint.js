/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');

var Mint = new mongoose.Schema({
    date: {
        type: Date, 
        default: Date.now, 
        unique: true,
        trim:true
    },
    netIncome: {
        type: Number, 
        default: 0
    },
    debt: {
        type: Number, 
        default: 0
    },
    cash: {
        type: Number, 
        default: 0
    }
});

Mint.methods = {

}

module.exports = mongoose.model('Mint', Mint);