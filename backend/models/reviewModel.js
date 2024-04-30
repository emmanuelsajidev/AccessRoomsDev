var  mongoose = require('mongoose');

const schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var reviewSchema = schema({
    houseBoatId: {type:schema.Types.ObjectId,ref:'houseBoatModel'},
    shikaraId: {type:schema.Types.ObjectId,ref:'shikaraModel'},
    rating : { type: Number },//1-5
    comment : { type: String },
    type:{type:String,default:"Customer"},//Agent
    user : {type:schema.Types.ObjectId,ref:'userModel'},
    status:{type:String,default: "Active"},//Pending,Active,Deleted
    approved : { type:Boolean,default:true },//auto approve at present, can give approve aption to admin lateron
    hasbought : { type:Boolean } //has the user bought this product at or before the time of review
},
{ timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });
module.exports = mongoose.model("reviewModel", reviewSchema);