var mongoose = require('mongoose');
var PolicySchema = mongoose.Schema({
    type: {
        type: String,       //all, 
    },
    name: {
        type: String    //Privacy Policy, Terms and Conditions,Our Services
    },
    content: {
        type: String
    },
    status: {
        type: String,
        default: 'Active'    //Inactive, Deleted
    }
}, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model('PolicyModel', PolicySchema);

