const mongoose = require('mongoose');

const reservationModelSchema = mongoose.Schema({
    houseBoatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "houseBoatModel"
    },
    shikaraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shikaraModel"
    },
    selectedDate: [{ type: Date }],//in case hb multiple dates are choose
    totalGuests: { type: Number ,default:0}, 
    //shikara
    startTime:{type:Date},//shikara
    endTime:{type:Date},//shikara
    shikaraName:{type:String},
    startTimeCopy:{type:String},
    endTimeCopy:{type:String},
    reservedDates:{type:[Date]},
    
    //houseboat
    houseboatName:{type:String},
    checkInDate:{type:Date},//in case shikara only one dates are  choose
    checkOutDate:{type:Date},
    checkInDateCopy:{type:String},
    checkOutDateCopy:{type:String},
    tripType:{type:String},
    houseBoatType:{type:String},
    category:{type:String},
    totalRooms: { type: Number ,default:0},
   
    
    //common fields
    rate:{type:Number,default:0},//per day/per room
    extraPersonRate:{type:Number,default:0},//per head/per day
    bookingMode:{type:String},
    agentName:{type:String},
    guestName:{type:String},
    guestPhoneNumber:{type:String},
    advancePayment:{type:Number,default:0},
    balanceAmount:{type:Number,default:0},
    totalPayableAmount:{type:Number,default:0},
    balancePayedBy: {type:String},  
    reservationNo: { type: String },
    checkreservationNo:{type:Number,default:0},//reservationNo increment for checking eg:01
    reservationDate: {type:Date},
    reservationStatus: { type: String, default: "Reserved" },//Cancelled
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    status: { type: String, default: "Active" }
    

},
{ timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });
module.exports = mongoose.model("reservationModel", reservationModelSchema);