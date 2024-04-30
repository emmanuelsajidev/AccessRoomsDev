var mongoose = require('mongoose');
var subLocationModelSchema = mongoose.Schema({
    locationId:{
        type:mongoose.Schema.Types.ObjectId,ref:'locationModel'
    },
    name:{
        type:String
    },
    status:{
        type:String,
        default:"Active"
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
}, {
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model("subLocationModel", subLocationModelSchema);