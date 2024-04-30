var mongoose = require('mongoose');
var locationSchema = mongoose.Schema({
    name: { type: String },
    description:{type:String},
    photo:{type:String},
    addedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    status: {
        type: String,
        default: 'Active'    //Inactive, Deleted
    }
}, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model('locationModel', locationSchema);

