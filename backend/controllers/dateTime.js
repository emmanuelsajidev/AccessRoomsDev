const Misc = require('../controllers/Misc')


//Get current time on the basis of region offset
async function nowDate() {
    var offset = 19800 / 3600.0
    var d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;

    // obtain UTC time in msec
    utc = localTime + localOffset;
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));
    //nd = 3600000 + nd;
    utc = new Date(utc);
    return nd;
}


//Get Dates(today, thisweek, nextweek, nextmonth)
async function getThisNextDate() {
    var today = new Date();

    var day = today.getDay();
    var tday = 6 - day;
    var thisWeekEnd = today.getTime() + (tday * 24 * 3600 * 1000);
    thisWeekEnd = new Date(thisWeekEnd);
    thisWeekEnd.setHours(23, 59, 59)

    var nxtWeekStart = thisWeekEnd.getTime() + (1000);
    nxtWeekStart = new Date(nxtWeekStart);
    var nxtWeekEnd = nxtWeekStart.getTime() + (6 * 24 * 3600 * 1000);
    nxtWeekEnd = new Date(nxtWeekEnd);
    nxtWeekEnd.setHours(23, 59, 59)

    var month = today.getMonth() + 1;
    var thisMonthEnd = today.getTime();
    thisMonthEnd = new Date(thisMonthEnd)
    thisMonthEnd.setMonth(month);
    thisMonthEnd.setDate(0);
    thisMonthEnd.setHours(23, 59, 59)

    var nxtMonthStart = thisMonthEnd.getTime() + (1000);
    nxtMonthStart = new Date(nxtMonthStart);

    month = nxtMonthStart.getMonth() + 1;
    var nxtMonthEnd = nxtMonthStart.getTime();
    nxtMonthEnd = new Date(nxtMonthEnd);
    nxtMonthEnd.setMonth(month);
    nxtMonthEnd.setDate(0);
    nxtMonthEnd.setHours(23, 59, 59)
    //console.log(nxtMonthStart)

    var result = {
        today: today,
        thisWeekEnd: thisWeekEnd,
        nxtWeekStart: nxtWeekStart,
        nxtWeekEnd: nxtWeekEnd,
        thisMonthEnd: thisMonthEnd,
        nxtMonthStart: nxtMonthStart,
        nxtMonthEnd: nxtMonthEnd,
    }
    //console.log(result)

    return result;
}





//Get Dates(today, thisweek, lastmonth)
async function getThisLastDate() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var day = today.getDay();
    //var yday = 6 - day;
    var thisWeekStart = today.getTime() - (day * 24 * 3600 * 1000);
    thisWeekStart = new Date(thisWeekStart);
    thisWeekStart.setHours(0, 0, 0, 0)

    var thisMonthStart = today.getTime();
    thisMonthStart = new Date(thisMonthStart)
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    var lastSixMonthStart = today.getTime();
    lastSixMonthStart = new Date(lastSixMonthStart);
    var month = today.getMonth() - 6;
    var date = today.getDate();
    lastSixMonthStart.setMonth(month);
    lastSixMonthStart.setDate(date);
    lastSixMonthStart.setHours(0, 0, 0, 0);

    var thisYearStart = today.getTime();
    thisYearStart = new Date(thisYearStart);
    thisYearStart.setDate(1);
    thisYearStart.setMonth(0);
    thisYearStart.setHours(0, 0, 0, 0);

    var result = {
        today: today,
        thisWeekStart: thisWeekStart,
        thisMonthStart: thisMonthStart,
        lastSixMonthStart: lastSixMonthStart,
        thisYearStart: thisYearStart
    }

    return result;
}



//Get this and last month start, end
async function getThisLastMonth() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var thisMonthStart = today.getTime();
    thisMonthStart = new Date(thisMonthStart)
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    var lastMonthStart = today.getTime();
    lastMonthStart = new Date(lastMonthStart)
    var month = today.getMonth() - 1;
    lastMonthStart.setMonth(month);
    lastMonthStart.setDate(1);
    lastMonthStart.setHours(0, 0, 0, 0);

    var lastMonthEnd = thisMonthStart.getTime();
    lastMonthEnd = new Date(lastMonthEnd)
    lastMonthEnd.setDate(0);
    lastMonthEnd.setHours(23, 59, 59, 999);

    var result = {
        day: today.getDate(),
        lastday: lastMonthEnd.getDate(),
        today: today,
        thisMonthStart: thisMonthStart,
        lastMonthStart: lastMonthStart,
        lastMonthEnd: lastMonthEnd
    }

    return result;
}



//Get month start and end
async function getMonthStartEnd(month) {
    var s = month.split("-");
    var d = new Date();
    d = await dateToLocal(d)
    // console.log(d)
    // console.log(s[0])
    var monthStart = d.getTime();
    monthStart = new Date(monthStart);
    monthStart.setFullYear(s[1]);
    monthStart.setMonth(s[0] - 1);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0);
    monthStart = new Date(monthStart);
    // console.log(monthStart)

    var monthEnd = d.getTime();
    monthEnd = new Date(monthEnd);
    monthEnd.setFullYear(s[1]);
    monthEnd.setMonth(s[0]);
    monthEnd.setDate(0);
    monthEnd.setHours(23, 59, 59);
    monthEnd = new Date(monthEnd);
    // console.log(monthEnd)

    var result = {
        today: d,
        monthStart: monthStart,
        monthEnd: monthEnd
    }

    return result;
}


//Get year start and end
async function getYearStartEnd(year) {
    if (Misc.isnullorempty(year)) {
        var d = new Date();
        year = d.getFullYear();
    }

    var yearStart = new Date();
    yearStart.setFullYear(year);
    yearStart.setMonth(0);
    yearStart.setDate(1);
    yearStart.setHours(0, 0, 0, 0);
    yearStart = new Date(yearStart);

    var yearEnd = new Date();
    yearEnd.setFullYear(year);
    yearEnd.setMonth(12);
    yearEnd.setDate(0);
    yearEnd.setHours(23, 59, 59, 999);
    yearEnd = new Date(yearEnd);

    var result = {
        year: year,
        yearStart: yearStart,
        yearEnd: yearEnd
    }

    return result;
}




//Get start and end of a month of an year 
async function getYear_MonthStartEnd(year, month) {
    if (Misc.isnullorempty(year)) {
        var d = new Date();
        year = d.getFullYear();
    }
    if (Misc.isnullorempty(month)) {
        var dd = new Date();
        month = dd.getMonth();
    }
    else {
        month = parseInt(month) - 1;
    }

    var monthStart = new Date();
    monthStart.setFullYear(year);
    monthStart.setMonth(month);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0);
    monthStart = new Date(monthStart);

    var monthEnd = new Date();
    monthEnd.setFullYear(year);
    monthEnd.setMonth(parseInt(month) + 1);
    monthEnd.setDate(0);
    monthEnd.setHours(23, 59, 59);
    monthEnd = new Date(monthEnd);

    var result = {
        year: parseInt(year),
        month: (parseInt(month) + 1),
        monthStart: monthStart,
        monthEnd: monthEnd
    }

    return result;
}




// const nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Calcutta'
//   });



//Get today's starting and ending
async function getTodayStartEnd() {
    var todayStart = new Date();
    //console.log(todayStart)
    todayStart.setHours(0, 0, 0, 0);
    //console.log(todayStart)

    var todayEnd = new Date();
    //console.log(todayEnd)
    todayEnd.setHours(23, 59, 59, 999);
    //console.log(todayEnd)

    var result = {
        todayStart: todayStart,
        todayEnd: todayEnd
    }

    return result;
}



//Get yesterday's starting and ending
async function getYesterdayStartEnd() {
    var today = new Date();
    var day = today.getDate();
    var yesterdayStart = new Date();
    //console.log(yesterdayStart)
    yesterdayStart.setDate(day - 1);
    yesterdayStart.setHours(0, 0, 0, 0);
    //console.log(yesterdayStart)

    var yesterdayEnd = new Date();
    //console.log(yesterdayEnd)
    yesterdayEnd.setDate(day - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);
    //console.log(yesterdayEnd)

    var result = {
        yesterdayStart: yesterdayStart,
        yesterdayEnd: yesterdayEnd
    }

    return result;
}


//Get a specific dates starting and ending
async function getDateStartEnd(dt) {
    var dStart = dt.getTime();
    dStart = new Date(dStart);
    //console.log(dStart)
    dStart.setHours(0,0,0,0);
    dStart = new Date(dStart);
    //dStart = await dateToLocal(dStart)
    //console.log(dStart)

    var dEnd = dt.getTime();
    dEnd = new Date(dEnd);
    //console.log(dEnd)
    dEnd.setHours(23, 59, 59, 999);
    dEnd = new Date(dEnd);
    //dEnd = await dateToLocal(dEnd)
    //console.log(dEnd)

    var result = {
        dStart: dStart,
        dEnd: dEnd
    }

    return result;
}



//Set a date with specific time
async function setDatewithTime(dt, time) {
    var t = time.split(':');
    var hr = parseInt(t[0])
    var min = parseInt(t[1])
    var newD = dt.setHours(hr, min, 59);
    newD = new Date(newD)
    //newD = await dateToLocal(newD)

    return newD;
}


//check product on specific day and time
async function checkIsAvailable(availableTimings, time, day) {
    for (var j = 0; j < availableTimings; j++) {
        for (var i = 0; i < availableTimings[j].availableDays.length; i++) {
            if (availableTimings[j].availableDays === day) {
                if (time < start && end > time) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    }
    //var data = await productModel.findOne({_id:productId,status:'Active'})



}



async function dateToLocal(cdt) {
    // var d = new Date(cdt)
    // var dt=d.toLocaleString('en-US', {
    //     timeZone: 'Asia/Calcutta'
    //   });

    // return (new Date(dt))

    var newDate = new Date(cdt.getTime() - cdt.getTimezoneOffset()*60*1000);
    newDate = new Date(newDate);

    // var d = new Date(cdt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    // var newDate = new Date(d);
    return newDate;
}



module.exports.nowDate = nowDate;
module.exports.getThisNextDate = getThisNextDate;
module.exports.getThisLastDate = getThisLastDate;
module.exports.getThisLastMonth = getThisLastMonth;
module.exports.getMonthStartEnd = getMonthStartEnd;
module.exports.getYearStartEnd = getYearStartEnd;
module.exports.getYear_MonthStartEnd = getYear_MonthStartEnd;
module.exports.getTodayStartEnd = getTodayStartEnd;
module.exports.getYesterdayStartEnd = getYesterdayStartEnd;
module.exports.getDateStartEnd = getDateStartEnd;
module.exports.setDatewithTime = setDatewithTime;
module.exports.dateToLocal = dateToLocal;