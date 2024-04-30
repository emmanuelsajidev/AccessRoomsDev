const mongoose = require("mongoose");

const Misc = require("./Misc");
const DateTime = require('./dateTime')

const ifToken = require("../middleware/ifToken");
const guestOrUser = require("../middleware/guestOrUser");

const houseBoatModel = require("../models/houseBoatModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const tripTypeModel = require("../models/tripTypeModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");


//Calculate Rate for Night Stay
async function CalculateNightStayRate(houseboat,dayTrip,dates,noOfGuest){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var commissioRateOfThisDate=0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd,},customerRate:{$gte:0}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailable = houseboat.totalRooms
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*normalRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }else{
                console.log("Special Rate Found")
                var totalRoomsAvailable = houseboat.totalRooms
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }
            totalAmount+=rateOfThisDate
            totalCommissionAmount+=commissioRateOfThisDate
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}

//Calculate Rate for Day Cruis
async function CalculateDayCruisRate(houseboat,dayTrip,dates,noOfGuest){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var commissioRateOfThisDate=0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd},customerRate:{$gte:0}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                var normalRate = details[0]
                var minGuestNeeded = dayTrip.minCapacityOfBoats;
                var maxGuestNeeded = dayTrip.maxCapacityOfBoats;
                var totalGuests = noOfGuest
                var ratePerHead = normalRate.customerRate;
                var ratePerHeadComission = normalRate.customerRateCommission
                rateOfThisDate = ratePerHead*totalGuests;
                commissioRateOfThisDate=ratePerHeadComission*totalGuests
                
                
            }else{
                console.log("Special Rate Found")
                var minGuestNeeded = dayTrip.minCapacityOfBoats;
                var maxGuestNeeded = dayTrip.maxCapacityOfBoats;
                var totalGuests = noOfGuest
                var ratePerHead = checkForSpecialRate.customerRate;
                var ratePerHeadComission = checkForSpecialRate.customerRateCommission
                rateOfThisDate = ratePerHead*totalGuests;
                commissioRateOfThisDate=ratePerHeadComission*totalGuests
            }
            totalAmount+=rateOfThisDate
            totalCommissionAmount+=commissioRateOfThisDate
        }
        if(totalAmount<=0){

            console.log("Invalid Value ",totalAmount)
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}

//Calculate Rate for Over 
async function CalculateOverNightStayRate(houseboat,dayTrip,dates,noOfGuest){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var commissioRateOfThisDate=0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd},customerRate:{$gte:0}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailable = houseboat.totalRooms
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*normalRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }else{
                console.log("Special Rate Found")
                var totalRoomsAvailable = houseboat.totalRooms
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }
            totalAmount+=rateOfThisDate;
            totalCommissionAmount+=commissioRateOfThisDate;
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}







async function CalculateOverNightStayRateSharingOld(houseboat,dayTrip,dates,noOfGuest,totalRooms){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailbleForBooking = houseboat.totalRooms-(houseboat.noOfRoomsBookedShared+houseboat.noOfRoomsBookedReserved)//houseboat.totalRoomsAvailable
                //totalRoomsAvailbleForBooking = 1
                var maxPersonsInRooms = dayTrip.maxPersonPerRooms+dayTrip.extraPersonPerRooms
                var totalGuestsCanAccomadatedInBoat =(totalRoomsAvailbleForBooking*maxPersonsInRooms)// - (houseboat.noOfGuestsBookedShared+houseboat.noOfGuestsBookedReserved)
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                
                if(noOfGuest>totalGuestsCanAccomadatedInBoat){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.extraPersonPerRooms
                console.log("totalGuestsCanBeAcc ",totalGuestsCanBeAcc)
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*normalRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*normalRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*normalRate.customerExtraRate
                    rateOfThisDate = totalRooms*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRooms*normalRate.customerRateCommission+extraRate
                }
            }else{
                console.log("Special Rate")
                var totalRoomsAvailable = houseboat.totalRoomsAvailable
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }else{
                    return{ status:false };
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalRoomsAvailbleForBooking = houseboat.totalRoomsAvailable
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.extraPersonPerRooms
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                if(noOfGuest>houseboat.totalGuestsCanAccomadated){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*checkForSpecialRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*checkForSpecialRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRooms*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRooms*checkForSpecialRate.customerRateCommission+extraRate
                }
            }
            totalAmount+=rateOfThisDate
            totalCommissionAmount+=commissioRateOfThisDate
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}
async function CalculateOverNightStayRateSharing(houseboat,dates,noOfGuest,totalRooms){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:houseboat.tripDetails._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:houseboat.tripDetails._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(houseboat.tripDetails._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailbleForBooking = houseboat.totalRooms-(houseboat.noOfRoomsBookedShared+houseboat.noOfRoomsBookedReserved)//houseboat.totalRoomsAvailable
                //totalRoomsAvailbleForBooking = 1
                var maxPersonsInRooms = houseboat.tripDetails.maxPersonPerRooms+houseboat.tripDetails.extraPersonPerRooms
                var totalGuestsCanAccomadatedInBoat =(totalRoomsAvailbleForBooking*maxPersonsInRooms)// - (houseboat.noOfGuestsBookedShared+houseboat.noOfGuestsBookedReserved)
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                
                if(noOfGuest>totalGuestsCanAccomadatedInBoat){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*houseboat.tripDetails.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*houseboat.tripDetails.extraPersonPerRooms
                console.log("totalGuestsCanBeAcc ",totalGuestsCanBeAcc)
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*normalRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*normalRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*normalRate.customerExtraRate
                    rateOfThisDate = totalRooms*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRooms*normalRate.customerRateCommission+extraRate
                }
            }else{
                console.log("Special Rate")
                var totalRoomsAvailable = houseboat.totalRoomsAvailable
                // if(checkForSpecialRate.numberOfRooms>0){
                //     console.log(1)
                //totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                // }else{
                //     console.log(2)
                //     return{ status:false };
                // }
                if(checkForSpecialRate.isAvailable ==false){
                    console.log(3)
                    return{ status:false };
                }
                var totalRoomsAvailbleForBooking = houseboat.totalRoomsAvailable
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*houseboat.tripDetails.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*houseboat.tripDetails.extraPersonPerRooms
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                if(noOfGuest>houseboat.totalGuestsCanAccomadated){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*checkForSpecialRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*checkForSpecialRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRooms*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRooms*checkForSpecialRate.customerRateCommission+extraRate
                }
            }
            totalAmount+=rateOfThisDate
            totalCommissionAmount+=commissioRateOfThisDate
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}
async function CalculateNightStayRateSharing(houseboat,dayTrip,dates,noOfGuest,totalRooms){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        for(var i=0;i<dates.length;i++){
            var rateOfThisDate = 0;
            var commissioRateOfThisDate=0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd,}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailbleForBooking = houseboat.totalRoomsAvailable
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                if(noOfGuest>houseboat.totalGuestsCanAccomadated){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.extraPersonPerRooms
                console.log("totalGuestsCanBeAcc ",totalGuestsCanBeAcc)
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*normalRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*normalRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*normalRate.customerExtraRate
                    rateOfThisDate = totalRooms*normalRate.customerRate+extraRate
                }
            }else{
                console.log("Special Rate Found")
                var totalRoomsAvailable = houseboat.totalRooms
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalRoomsAvailbleForBooking = houseboat.totalRoomsAvailable
                var totalRoomsAvailable = houseboat.totalRooms
                if(totalRoomsAvailbleForBooking<totalRooms){
                    console.log("No Rooms Available")
                    return{ status:false };
                }
                var totalRoomsNeededByCustomer = totalRooms
                var extraCount = 0;
                var totalGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.maxPersonPerRooms
                var extraGuestsCanBeAcc = totalRoomsNeededByCustomer*dayTrip.extraPersonPerRooms
                if(totalGuestsCanBeAcc<noOfGuest){
                    extraCount = noOfGuest-totalGuestsCanBeAcc
                    if(extraCount>extraGuestsCanBeAcc){
                        return {status : false}
                    }
                }
                if(noOfGuest>houseboat.totalGuestsCanAccomadated){
                    console.log("Sorry! The Houseboat can not accommodate "+noOfGuest)
                    return{ status:false };
                }
                var roomsForCalculations = totalRooms
                rateOfThisDate = roomsForCalculations*checkForSpecialRate.customerRate
                commissioRateOfThisDate=roomsForCalculations*checkForSpecialRate.customerRateCommission
                if(extraCount>0){
                    var extraRate = extraCount*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRooms*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate = totalRooms*checkForSpecialRate.customerRateCommission+extraRate
                }
            }
            totalAmount+=rateOfThisDate
            totalCommissionAmount+=commissioRateOfThisDate
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}


async function CalculateGuestsInRooms(totalRooms,totalGuestperRoom,extraPersonPerRoom,guestsRequired,maxGuest){
    try {
        
        var totalExtraPersons = 0
        var totalRoomsRequired = 0;
        // for(var i=0;i<totalRooms;i++){
        //     var guestInRooms = 0;
        //     var extraGuest = 0;
        // }
        var totalGuestsAccomadatedIncludingExtra = totalRooms*(totalGuestperRoom+extraPersonPerRoom)
        var totalGuestsAccomadatedExpectExtra = totalRooms*totalGuestperRoom
        if(guestsRequired>totalGuestsAccomadatedExpectExtra){
            totalExtraPersons = guestsRequired-totalGuestsAccomadatedExpectExtra
        }
        var totalExtraAvailable = totalRooms*extraPersonPerRoom;
        if(totalExtraAvailable<totalExtraPersons){
            return{ status:false };
        }
        if(totalExtraPersons<=0){
            totalRoomsRequired = guestsRequired/totalGuestperRoom
            totalRoomsRequired = Math.ceil(totalRoomsRequired);

        }else{
            totalRoomsRequired = totalRooms
        }
        console.log("totalGuestsAccomadatedIncludingExtra ",totalGuestsAccomadatedIncludingExtra)
        return { status:true,totalExtraPersons:totalExtraPersons,totalRoomsRequired:totalRoomsRequired}
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    } 
}

 async function calculateRoomsAndExtraGuests(guests, roomsRequired, personPerRoom, extraPersonPerRoom) {
    let roomsNeeded = Math.min(roomsRequired, Math.ceil(guests / personPerRoom));
    let extraPersons = 0;

    if (roomsNeeded < roomsRequired && guests > roomsNeeded * personPerRoom) {
        extraPersons = guests - roomsNeeded * personPerRoom;
    }

    if (roomsNeeded > totalRooms) {
        extraPersons += (roomsNeeded - totalRooms) * personPerRoom;
        roomsNeeded = totalRooms;
    }

    return { roomsNeeded, extraPersons };
}

async function CalculateOverNightStayRateCombination(houseboat,dayTrip,dates,noOfGuest){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        var extraPersonRate = 0
        for(var i=0;i<dates.length;i++){
           
            var rateOfThisDate = 0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailable = houseboat.totalRooms
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                extraPersonRate+=normalRate.customerExtraRate
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*normalRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }else{
                console.log("Special Rate Found")
                var totalRoomsAvailable = houseboat.totalRooms
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                extraPersonRate+=checkForSpecialRate.customerExtraRate
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }
            //console.log("extraPersonRate   ",extraPersonRate)
            totalAmount+=rateOfThisDate;
            totalCommissionAmount+=commissioRateOfThisDate;
            //extraPersonRate+=extraPersonRate;
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount,extraPersonRate:extraPersonRate};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}

async function CalculateNightStayRateCombination(houseboat,dayTrip,dates,noOfGuest){
    try{
        var totalAmount = 0;
        var totalCommissionAmount=0;
        var isValid = true;
        var extraPersonRate = 0
        for(var i=0;i<dates.length;i++){
           
            var rateOfThisDate = 0;
            var DateStartEnd = await DateTime.getDateStartEnd(dates[i])
            var startDate = DateStartEnd.dStart;
            startDate.setHours(5, 30, 0, 0)
            var endDate = DateStartEnd.dEnd;
            endDate.setHours(5, 30, 0, 0)
            var checkForSpecialRate = await tripPackageModel.findOne({status:"Active",packageType:"Special",houseBoatId:houseboat._id,tripTypeId:dayTrip._id,startDate:{$gte:DateStartEnd.dStart},endDate:{$lte:DateStartEnd.dEnd}})
            if(Misc.isnullorempty(checkForSpecialRate)){
                var normalRate = await tripPackageModel.findOne({status:"Active",houseBoatId:houseboat._id,tripTypeId:dayTrip._id})
                var details = await tripPackageModel.aggregate([
                    {$match:{packageType:{$ne:"Special"},status:"Active",houseBoatId:new mongoose.Types.ObjectId(houseboat._id),tripTypeId:new mongoose.Types.ObjectId(dayTrip._id),startDate:{$lte:startDate},endDate:{$gte:endDate},customerRate:{$gte:0}}}
                ])
                if(details.length<=0){
                    console.log("No Normal Rate Found")
                    return{ status:false };
                }
                if(details.length>1){
                    console.log("Multiple entry")
                    return{ status:false };
                }
                normalRate = details[0]
                var totalRoomsAvailable = houseboat.totalRooms
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                extraPersonRate+=normalRate.customerExtraRate
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*normalRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*normalRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*normalRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }else{
                console.log("Special Rate Found")
                var totalRoomsAvailable = houseboat.totalRooms
                if(checkForSpecialRate.numberOfRooms>0){
                    totalRoomsAvailable = checkForSpecialRate.numberOfRooms
                }
                if(checkForSpecialRate.isAvailable ==false){
                    return{ status:false };
                }
                var totalGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.maxPersonPerRooms
                var totalExtraGuestsCanBeAccomadated = totalRoomsAvailable*dayTrip.extraPersonPerRooms
                var maxGuestsAccomadated = totalGuestsCanBeAccomadated+totalExtraGuestsCanBeAccomadated;
                extraPersonRate+=checkForSpecialRate.customerExtraRate
                if(noOfGuest<=totalGuestsCanBeAccomadated){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                }else if(totalGuestsCanBeAccomadated<noOfGuest){
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission
                    var extraPersonsAvailable = noOfGuest-totalGuestsCanBeAccomadated
                    if(extraPersonsAvailable>totalExtraGuestsCanBeAccomadated){
                        console.log("Cant Accomadate")
                        return{ status:false };
                    }
                    var extraRate = extraPersonsAvailable*checkForSpecialRate.customerExtraRate
                    rateOfThisDate = totalRoomsAvailable*checkForSpecialRate.customerRate+extraRate
                    commissioRateOfThisDate=totalRoomsAvailable*checkForSpecialRate.customerRateCommission+extraRate

                }else if(maxGuestsAccomadated<noOfGuest){
                    console.log("Cant Accomadateeee")
                    return{ status:false };
                }else{
                    console.log("All Else")
                }
            }
            //console.log("extraPersonRate   ",extraPersonRate)
            totalAmount+=rateOfThisDate;
            totalCommissionAmount+=commissioRateOfThisDate;
            //extraPersonRate+=extraPersonRate;
        }
        if(totalAmount<=0){
            console.log("Invalid Value")
            return{ status:false };
        }
        return{status:true,rate:totalAmount,commissionAmount:totalCommissionAmount,extraPersonRate:extraPersonRate};
    }catch(err){
        console.log(err)
        return{status:false,data:{},msg:"Error While Calculating Rate"}
    }
}
module.exports.CalculateNightStayRate = CalculateNightStayRate;
module.exports.CalculateDayCruisRate = CalculateDayCruisRate;
module.exports.CalculateOverNightStayRate = CalculateOverNightStayRate;
module.exports.CalculateOverNightStayRateSharing = CalculateOverNightStayRateSharing;
module.exports.CalculateNightStayRateSharing = CalculateNightStayRateSharing;
module.exports.CalculateOverNightStayRateCombination = CalculateOverNightStayRateCombination;
module.exports.CalculateNightStayRateCombination = CalculateNightStayRateCombination;