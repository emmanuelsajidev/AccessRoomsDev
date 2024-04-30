var mongoose = require('mongoose');
var PaymentResponceSchema = mongoose.Schema({
    responce:{type:String},
    status: {
        type: String,
        default: 'Active'    //Inactive, Deleted
    }
}, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model('paymentResponceModel', PaymentResponceSchema);

