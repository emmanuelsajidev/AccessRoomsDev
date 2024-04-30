var mongoose = require('mongoose');
var otpSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', autopopulate:false,
    },
    otp: {
        type: String,
        required: true
    },
    phoneNumber:{
      type:String
    },
    create_date: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});
module.exports = mongoose.model('otpModel', otpSchema);