const mongoose = require('mongoose');

const rescheduleModelSchema = mongoose.Schema({
    houseBoatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "houseBoatModel"
    },
    shikaraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shikaraModel"
    },
    bookingId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "houseboatBookingItemModel"
    },
    mainBookId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "houseboatBookingModel"
    },
    shikbookId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "shikaraBookingModel"
    },
    startDate: { type: Date },
    endDate: { type: Date },
    rescheduleDates: [{ type: Date }],
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "houseboatBookingItemModel" },
    rescheduleDate: {type:Date},
    paidAmount: { type: Number, default: 0 },
    newTotalAmount:{type:Number,default:0},
    newBalanceAmount:{type:Number,default:0},
    rescheduleStatus: { type: String, default: "Reserved" },//Cancelled
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    isAdminEdit:{type:Boolean,default:false},
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel"
    },
    status: { type: String, default: "Active" },
    //in shikara
    startTime:{type:Date},
    endTime:{type:Date},

},
{ timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });
module.exports = mongoose.model("rescheduleModel", rescheduleModelSchema);