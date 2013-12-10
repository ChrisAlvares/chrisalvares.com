/*
 * A modal for caching data
 * Daemon processes will update the data, and the app will get teh data
 */

var mongoose = require('mongoose');
var Crypto = require('ezcrypto').Crypto;

var Logins = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
        trim:true
    },
    loginData: {
        type: String, 
        default: '', 
        trim:true
    },
    secret: {
        type: String,
        default:''
    },
    connectedAt: {
        type:Date, 
        default: Date.now
    }
});

Logins.statics.getDecryptedData = function(obj) {
    var dataString = Crypto.AES.decrypt(obj.loginData, obj.secret);
    return JSON.parse(dataString);  
}
    
Logins.statics.encryptData = function(loginData) {

    var dataString = JSON.stringify(loginData);
    var secret = Crypto.MD5(dataString, { asString: true });
    
    var crypted = Crypto.AES.encrypt(dataString, secret);
    
    return {
        secret:secret,
        loginData:crypted
    };       
}

Logins.statics.getLoginDataForKey = function(key, callback) {
    var that = this;
    this.findOne({name:key}, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        var data = that.getDecryptedData(result);
        callback(null, data);
    });
    
    
}

module.exports = mongoose.model('Logins', Logins);