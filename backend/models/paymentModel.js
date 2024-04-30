var mongoose = require('mongoose');
var paymentSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', autopopulate:false,},
    hbBookingId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "houseboatBookingItemModel",
    }],
    skBookingId:{type: mongoose.Schema.Types.ObjectId, ref: "shikaraBookingModel"},
    phoneNumber:{type:String},
    transactionId:{type:String},//PhonePe
    txnid: { type: String  },//OURId
    clientId:{type:String},
    mid:{type:String},
    totalAmount:{type:Number},
    status:{type:String,default:"initiate"},//Success
    paymentType:{type:String,default:"Cash"},
    inProMode:{type:Boolean,default:false},
    email: { type: String  },
    sucessurl: { type: String  },
    failurl: { type: String  },
    unmappedstatus: { type: String  },
    key: { type: String  },
    hashvalidity:{type:Boolean},
    hash:{type:String},
    error_Message:{ type: String  },
    code:{type:String},
    data:{type:String},
    stateOfPayment:{type:String},
    responseCode:{type:String},
    payamentInstrument:{type:String},
    salt_Key:{type:String},
    Salt_Index:{type:String},
    x_Verify:{type:String},
    payLoad:{type:String},
    success_time:{type:Date},
},{ timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });
module.exports = mongoose.model('paymentModel', paymentSchema);