async function ticketpdf(id) {
    //id = "651d6ba00ce8aeb873b758cb"
    var printer = new PdfPrinter(fonts);
   
    var docDefinition = {
    // pageSize: 'A5',
    pageMargins: 30/*40*/, //[ 20, 60, 20, 60 ]
    info: {
    title: 'Mudumalai'
    },
    content: [
    ]
    // footer: function (currentPage, pageCount) { return { margin: 10, text: currentPage.toString() + ' of ' + pageCount, alignment: 'right' } }
    };
    var tableLineHeight = 1.2
   
    docDefinition.defaultStyle = {
    font: 'Times',
    fontSize: 9,
    alignment: 'left'
    }
    docDefinition.styles = {
    h1: {
    fontSize: 9,
    bold: true,
    alignment: 'center'
    },
    h2: {
    fontSize: 10,
    bold: true,
    // alignment: 'center'
    },
    eTicket: {
    underline: true,
    fontSize: 10,
    bold: true,
    alignment: 'center',
    decoration: 'underline'
    },
    ticketNum: {
    fontSize: 11,
    bold: true,
    alignment: 'left',
    },
    reschedule:{
    fontSize: 11,
    bold: true,
    alignment: 'center',
    },
    amount: {
    fontSize: 11,
    bold: true,
    alignment: 'right',
    },
    topInstructions: {
    fontSize: 9,
    margin: [30, 0, 0, 0]
    },
    paymentSummaryHeader: {
    bold: true,
    fontSize: 11,
    fillColor: '#FFA500',
    alignment: 'left',
    lineHeight: tableLineHeight,
    },
    bookingAbstractHeader: {
    bold: true,
    fontSize: 11,
    color: '#F6FAF3',
    fillColor: '#FFA500',
    alignment: 'center',
    lineHeight: tableLineHeight,
    },
    bookingCancellAbstractHeader: {
    bold: true,
    fontSize: 19,
    color: '#000000',
    fillColor: '#000000',
    alignment: 'center',
    lineHeight: tableLineHeight,
    },
    bookingDescriptionHeader: {
    bold: true,
    fontSize: 11,
    color: '#F6FAF3',
    fillColor: '#FFA500',
    alignment: 'center',
    lineHeight: tableLineHeight,
    },
    entranceTicketHeader: {
    bold: true,
    fontSize: 11,
    fillColor: '#FFD700',
    alignment: 'left',
    lineHeight: tableLineHeight,
    },
    programmeDescriptionHeader: {
    bold: true,
    fontSize: 11,
    fillColor: '#FFD700',
    lineHeight: tableLineHeight,
    },
    }
    try
    {
    var ticketData = await ticketModel.findById(id)
    if (Misc.isnullorempty(ticketData)) {
    text = 'Sorry we are not unable to print your ticket right now try after some times.';
    docDefinition.content.push(text);
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
    }
   
   
    var bookigData = await bookingModel.find({ ticket: id }).populate('programme').populate('guest').populate('slotDetail').populate('payment')
    if (Misc.isnullorempty(bookigData)) {
    text = 'Sorry we are not unable to print your ticket right now try after some times......';
    docDefinition.content.push(text);
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
    }
    
    if (bookigData.length < 1) {
    text = 'Failed to find any bookings under this ticket';
    docDefinition.content.push(text);
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
    }
   
    var paymentId=null;
    if(bookigData[0].payment)
    if(bookigData[0].payment._id)
    paymentId=bookigData[0].payment._id;
   
    var userid=null;
    if(bookigData[0].payment)
    if(bookigData[0].payment.user)
    userid=bookigData[0].payment.user;
   
    var cartId=null;
    var allcartIds=null;
    var allentrancetcks=[];
    var allvehicles=[]
    if(paymentId)
    {
    var crt=await cartModel.findOne({payment:paymentId,status:'Deleted'})
    if(crt)
    cartId=crt._id;
   
    var allcrts=await cartModel.find({payment:paymentId,status:'Deleted'})
    if(allcrts)
    {
    allcartIds=allcrts.map(x=>x._id);
    allentrancetcks=allcrts.map(x=>x.entranceTicket);
    allvehicles=allcrts.map(x=>x.vehicle);
    var fulllst=[]
    var fullvh=[]
    for(var en=0;en<allentrancetcks.length;en++)
    {
    if(allentrancetcks[en].length>0)
    fulllst=fulllst.concat(allentrancetcks[en])
    }
    for(var en=0;en<allvehicles.length;en++)
    {
    if(allvehicles[en].length>0)
    fullvh=fullvh.concat(allvehicles[en])
    }
    allentrancetcks=fulllst
    allvehicles=fullvh;
    }
    }
    console.log("cart id: "+cartId)
   
    //delete payment without cart
    if(ticketData.ticketNo==1077)
    {
    console.log("this is ticket 1077")
    
   
    /* var bookigData = await bookingModel.find({ ticket: id,status:'Active' })
    var paymentid=bookigData[0].payment;
    console.log("paymentid: "+paymentId)
    var entrids=await cartModel.findOne({payment: paymentid,status:'Deleted'})
    var cartid=null;
    if(entrids)
    cartid=entrids._id
    if(entrids)
    entrids=entrids.entranceTicket;
    else
    entrids=[];
    console.log(entrids) 
    await entranceTicketModel.deleteMany({ payment: paymentid,status:'Active' })
   
    if(entrids.length>0)
    {
    console.log("entries more than one")
    await entranceTicketModel.deleteMany({ _id:{$in:entrids} })
    }
    var vehiclesQuery={type:{$in:['Vehicle','Camera']},cart:cartid,status:{$nin:['Deleted']}}
    await entranceTicketModel.deleteMany(vehiclesQuery)
    await paymentItemModel.deleteMany({ payment:paymentid })
   
    await bookingModel.deleteMany({ ticket: id,status:'Active' })
    await roomBookingModel.deleteMany({ ticket: id,status:'Active' })
    await entranceTicketModel.deleteMany({ ticket: id,status:'Active' }) 
    await ticketModel.deleteMany({_id:id})
    await paymentModel.deleteMany({_id:paymentid}) */
    
    }
   
    //date change without cart
    if(ticketData.ticketNo==5713)
    {
    console.log("this is ticket 5713")
    var newdate=new Date(2023,4,28,6)
    newdate=newdate.toString()
    console.log(newdate)
    /* await bookingModel.updateMany({ ticket: id,status:'Active' },{$set:{bookingDate:newdate}})
    await roomBookingModel.updateMany({ ticket: id,status:'Active' },{$set:{bookingDate:newdate}})
    await entranceTicketModel.updateMany({ ticket: id,status:'Active' },{$set:{bookingDate:newdate}})
    //Include vehicle booking model also for mudumalai
   
    var bookigData = await bookingModel.find({ ticket: id,status:'Active' })
    var paymentid=bookigData[0].payment;
    var entrids=await cartModel.findOne({payment: paymentid,status:'Deleted'})
    var cartid=null;
    if(entrids)
    cartid=entrids._id
    if(entrids)
    entrids=entrids.entranceTicket;
    else
    entrids=[]; 
    await entranceTicketModel.updateMany({ payment: paymentid,status:'Active' },{$set:{bookingDate:newdate}})
   
    if(entrids.length>0)
    {
    console.log("entries more than one")
    await entranceTicketModel.updateMany({ _id:{$in:entrids} },{$set:{bookingDate:newdate}})
    }
    var vehiclesQuery={type:{$in:['Vehicle','Camera']},cart:cartid,status:{$nin:['Deleted']}}
    if(cartid)
    await entranceTicketModel.updateMany(vehiclesQuery,{$set:{bookingDate:newdate}})
    if(paymentid)
    await paymentItemModel.updateMany({ payment:paymentid },{$set:{bookingDate:newdate}})
    return doc; */
    }
   
    //multiple date change without cart
    if(ticketData.ticketNo==2487)
    {
    /* console.log("this is ticket 2487")
    var newdate=new Date(2022,4,11,6)
    newdate=newdate.toString()
    console.log('newdate')
    console.log(newdate)
    var entranceticketdate=new Date(2022,4,10,6)
    entranceticketdate=entranceticketdate.toString()
    console.log('entranceticketdate')
    console.log(entranceticketdate)
    var olddate=new Date(2022,4,10,0)
    olddate=olddate.toString()
    console.log('olddate bfr')
    console.log(olddate)
    await bookingModel.updateMany({ ticket: id,status:'Active',bookingDate:{$lt:olddate} },{$set:{bookingDate:newdate}})
    await roomBookingModel.updateMany({ ticket: id,status:'Active' ,bookingDate:{$lt:olddate}},{$set:{bookingDate:newdate}})
    await entranceTicketModel.updateMany({ ticket: id,status:'Active' },{$set:{bookingDate:entranceticketdate}})
    
   
    var bookigData = await bookingModel.find({ ticket: id,status:'Active' })
    var paymentid=bookigData[0].payment;
    var entrids=await cartModel.findOne({payment: paymentid,status:'Deleted'})
    var cartid=null;
    if(entrids)
    cartid=entrids._id
    if(entrids)
    entrids=entrids.entranceTicket;
    else
    entrids=[]; 
    await entranceTicketModel.updateMany({ payment: paymentid,status:'Active' },{$set:{bookingDate:entranceticketdate}})
   
    if(entrids.length>0)
    {
    console.log("entries more than one")
    await entranceTicketModel.updateMany({ _id:{$in:entrids} },{$set:{bookingDate:entranceticketdate}})
    }
    var vehiclesQuery={type:{$in:['Vehicle','Camera']},cart:cartid,status:{$nin:['Deleted']}}
    if(cartid)
    await entranceTicketModel.updateMany(vehiclesQuery,{$set:{bookingDate:entranceticketdate}})
    if(paymentid)
    await paymentItemModel.updateMany({ payment:paymentid,bookingDate:{$lt:olddate} },{$set:{bookingDate:newdate}})
    return doc; */
    }
   
   
    //programme & slotdetail change without cart
    if(ticketData.ticketNo==5617)
    {
    /* console.log("this is ticket 5617")
    var solat = await SloatModel.findOne({_id:"6062f6d17672134504746dcd",programme:"6056f67d3f552e2298a9f674"}).populate('programme')
    //console.log(solat)
    await bookingModel.updateMany({ ticket: id,status:'Active' },{$set:{slotDetail:'6062f6d17672134504746dce',programme:'6056f67d3f552e2298a9f674'}})
    await roomBookingModel.updateMany({ ticket: id,status:'Active' },{$set:{slotDetail:'6062f6d17672134504746dce',programme:'6056f67d3f552e2298a9f674'}})
   
    var bookigData = await bookingModel.find({ ticket: id,status:'Active' })
    var paymentid=bookigData[0].payment;
    if(paymentid)
    await paymentItemModel.updateMany({ payment:paymentid },{$set:{slotDetail:'6062f6d17672134504746dce',programme:'6056f67d3f552e2298a9f674'}})
    else
    console.log("payment id is empty -> paymentItemModel not updated")
    return doc; */
    }
    var qrstring="https://api.mudumalaitigerreserve.com/booking/ticketbyticketpdf?id="+id;//Change
    var qrContent=await getqrimage(qrstring)
    
    var topTable = {
    table: {
    widths: ['*', '*','*', 'auto'],
    headerRows: 0,
    body: [
    [{ text: 'MUDUMALAI TIGER RESERVE', bold: true },
    { rowSpan: 3, image: './assets/pdflogo.jpg', width: 80 },
    { rowSpan: 3, image: './assets/tamilnadu.png', width: 60 },
    { rowSpan: 3, image: qrContent, width: 60 }],
    [
    'Tamil Nadu,India \n Ph:+91 948-777-5971 \n Email : mtronlinebooking@gmail.com \n Website : www.mudumalaitigerreserve.com'
    ],
    [
    { colSpan: 4, text: 'e-Ticket Receipt', style: 'eTicket' }
    ],
    [
    { colSpan: 4, text: '\n' }
    ]
    ]
    },
    layout: 'noBorders'
    }
    docDefinition.content.push(topTable);
   
    var topLine = [
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1, margin: [0, 0, 0, 0] }] },
    ]
   
    docDefinition.content.push(topLine);
   
    docDefinition.content.push({ text: '\n' })
   
   
   
    var ticketSection = {
    table: {
    widths: ['*', 'auto'],
    headerRows: 0,
    body: [
    [{ text: ('Ticket #' + ticketData.ticketNo), style: 'ticketNum' }, { text: ('Amount: INR.' + bookigData[0].payment.total), style: 'ticketNum' }],
    ]
    },
    layout: 'noBorders'
    }
    var rescheduleCharge = 0
    if(bookigData[0].payment.reScheduledProgramAmount>0){
    rescheduleCharge = bookigData[0].payment.reScheduledProgramAmount
    ticketSection = {
    table: {
    widths: ['*', 'auto'],
    headerRows: 0,
    body: [
    [{ text: ('Ticket #' + ticketData.ticketNo), style: 'ticketNum' }, { text: ('Amount: INR.' + bookigData[0].payment.total), style: 'ticketNum' }],
    ]
    },
    layout: 'noBorders'
    }
    }
    docDefinition.content.push(ticketSection);
    docDefinition.content.push({ text: '\n' })
   
    var topLine2 = [
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1, margin: [0, 0, 0, 0] }] },
    ]
    docDefinition.content.push(topLine2);
   
    docDefinition.content.push({ text: '\n' })
   
    var topInstructions = {
    ul: [
    'Your electronic ticket is stored on our reservation system. This e-ticket receipt is your electronic ticket. You may need to show this receipt in all the points of Mudumalai Tiger Reserve and keep until the end of your visit.',
    'Your attention is drawn to the Conditions and Notices set out in the attached documents.',
    'Please visit our website for more information.'
    ],
    style: 'topInstructions'
    }
    docDefinition.content.push(topInstructions);
   
    docDefinition.content.push({ text: '\n' })
   
    docDefinition.content.push({ text: 'Below are the details of your booking.' })
   
    docDefinition.content.push({ text: '\n' })
    var transactionDate = ""
    transactionDate = new Date(bookigData[0].payment.init_date)
    // if (typeof bookigData[0].payment.init_date == "string")
    // transactionDate = new Date(bookigData[0].payment.init_date)
   
    // transactionDate = transactionDate.getDate() + "-" + (transactionDate.getMonth() + 1) + "-" + transactionDate.getFullYear() 
    transactionDate = await DateHelper.dateToLocal(transactionDate)
    var trsDate = transactionDate
    // if (typeof result[i].payment.init_date == "string")
    // transactionDate = new Date(result[i].payment.init_date)
    //transactionDate = transactionDate.getDate() + "-" + (transactionDate.getMonth() + 1) + "-" + transactionDate.getFullYear() 
    transactionDate = transactionDate.toDateString()
    var hours = trsDate.getHours().toString().padStart(2, '0');
    var minutes = trsDate.getMinutes().toString().padStart(2, '0');
    let amPm = "AM";
   
    // Convert hours to 12-hour format and determine AM/PM
    if (hours >= 12) {
    amPm = "PM";
    if (hours > 12) {
    hours -= 12;
    }
    }
    if(hours==0){
    hours = 12
    }
    transactionDate =transactionDate +"\n"+" "+ hours+" : "+minutes+" "+amPm
    
    var guestCount = 0;
    var guestIds = [];
    for (var i = 0; i < bookigData.length; i++) {
    if (!guestIds.includes(bookigData[i].guest._id)) {
    guestIds.push(bookigData[i].guest._id)
    }
    }
    guestCount = guestIds.length;
    var paymentInfo = null
    var bookedBy = null;
    if (bookigData[0].payment) {
    paymentInfo = bookigData[0].payment
    if (bookigData[0].payment.user) {
    bookedBy = bookigData[0].guest//await UserModel.findOne({ uid: bookigData[0].payment.user }).populate('uid')
    }
   
    }
    var bookedByText = ""
    if (bookedBy) {
    bookedByText = bookedBy.name;
    if (bookedBy.address) {
    bookedByText = bookedByText + "\n" + bookedBy.address
    }
    if (bookedBy.locality) {
    bookedByText = bookedByText + "\n" + bookedBy.locality
    }
    if (bookedBy.city) {
    bookedByText = bookedByText + "\n" + bookedBy.city
    }
    if (bookedBy.district) {
    bookedByText = bookedByText + "\n" + bookedBy.district
    }
    if (bookedBy.state) {
    bookedByText = bookedByText + "\n" + bookedBy.state
    }
    if (bookedBy.email) {
    bookedByText = bookedByText + "\nEmail: " + bookedBy.email
    }
    if (bookedBy.phoneno){
    bookedByText = bookedByText + "\nPh: " + bookedBy.phoneno
    }
    
    } 
    var allpgms = [];
    var prgTotal = 0
    for (var i = 0; i < bookigData.length; i++) {
    var pgm = bookigData[i].programme._id;
    pgm = JSON.parse(JSON.stringify(pgm));
   
    var doexists = allpgms.filter(x => x.pgmid === pgm);
    if (doexists.length > 0) {
    doexists[0].guestdata.push({ guest: bookigData[i].guest, slotDetail: bookigData[i].slotDetail,bookingDate:bookigData[i].bookingDate })
    }
    else {
    var item = { pgmid: pgm, programme: bookigData[i].programme, guestdata: [{ guest: bookigData[i].guest, slotDetail: bookigData[i].slotDetail,bookingDate:bookigData[i].bookingDate }] }
    var notice=[];
    var payItems=await paymentItemModel.find({ticket:bookigData[i].ticket,programme:bookigData[i].programme._id},{bookingDate:1,notice:1,programTotal:1})
    if(payItems)
    {
    for(var n=0;n<payItems.length;n++)
    {
    prgTotal = prgTotal+payItems[n].programTotal
    if(payItems[n].notice)
    {
    if(!Misc.isnullorempty(payItems[n].notice))
    {
    notice.push({notice:payItems[n].notice,bookingDate:payItems[n].bookingDate})
    }
    }
    }
    }
    if(notice.length>0)
    {
    item.notice=notice;
    }
    allpgms.push(item);
    }
    }
   
    var vehcileCamTicketData = [];
    var entranceTicketData = [];
    var shuttleTicketData = []
    var entranceTicketSummary = {
    total: 0,
    indianAdult: {
    number: 0,
    rate: 0,
    amount: 0
    },
    indianChild: {
    number: 0,
    rate: 0,
    amount: 0
    },
    foreignAdult: {
    number: 0,
    rate: 0,
    amount: 0
    },
    foreignChild: {
    number: 0,
    rate: 0,
    amount: 0
    },
    LMV: {
    number: 0,
    rate: 0,
    amount: 0
    },
    HMV: {
    number: 0,
    rate: 0,
    amount: 0
    },
    Wheeler: {
    number: 0,
    rate: 0,
    amount: 0
    },
    VideoCamera: {
    number: 0,
    rate: 0,
    amount: 0
    },
    StillCamera: {
    number: 0,
    rate: 0,
    amount: 0
    },
    Shuttle: {
    number: 0,
    rate: 0,
    amount: 0
    }
    }
    var atomTxnID = "";
    var bankRefNo = "";
    var invoiceId = ""
    var otherCahegges = (bookigData[0].payment.total)-(prgTotal+rescheduleCharge)
    if(rescheduleCharge<=0){
    if(paymentInfo){
    if(paymentInfo.txnid){
    atomTxnID = paymentInfo.txnid
    }
    if(paymentInfo.invoice_id){
    invoiceId = paymentInfo.invoice_id
    }
    
    }
    var chargesText = "INR " +prgTotal +'\n\nINR '+ otherCahegges+'\n INR '+bookigData[0].payment.total
    var paymentSummary = {
    table: {
    widths: ['auto', 300, 'auto', '*'],
    headerRows: 1,
    body: [
    [{ text: 'Item', style: 'paymentSummaryHeader', border: [true, true, false, true] }, { border: [false, true, false, true], text: 'Details', style: 'paymentSummaryHeader' }, { border: [true, true, false, false], text: 'Item', style: 'paymentSummaryHeader' }, { border: [false, true, true, true], text: 'Details', style: 'paymentSummaryHeader' }],
    [{ text: 'PG Txn. #.', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: atomTxnID, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Order Id #', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: invoiceId, lineHeight: tableLineHeight }],
    [{ text: 'No. of Pax', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: guestCount, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booked on', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: transactionDate, lineHeight: tableLineHeight }],
    [{ text: 'Booked by', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: bookedByText, lineHeight: tableLineHeight }, { border: [true, true, false, true], text: 'Programme charges\nCamera & Vehicle charge\nTOTAL', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: chargesText, lineHeight: tableLineHeight }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return (i === 0) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return (i === 0) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
    }else{
    if(paymentInfo){
    if(paymentInfo.txnid){
    atomTxnID = paymentInfo.txnid
    }
    if(paymentInfo.invoice_id){
    invoiceId = paymentInfo.invoice_id
    }
    
    }
    var chargesText = "INR " +prgTotal +'\n\nINR '+ otherCahegges+'\n INR '+rescheduleCharge+'\n INR '+(bookigData[0].payment.total);//rescheduleCharge
    var paymentSummary = {
    table: {
    widths: ['auto', 300, 'auto', '*'],
    headerRows: 1,
    body: [
    [{ text: 'Item', style: 'paymentSummaryHeader', border: [true, true, false, true] }, { border: [false, true, false, true], text: 'Details', style: 'paymentSummaryHeader' }, { border: [true, true, false, false], text: 'Item', style: 'paymentSummaryHeader' }, { border: [false, true, true, true], text: 'Details', style: 'paymentSummaryHeader' }],
    [{ text: 'PG Txn. #.', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: atomTxnID, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Order Id #', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: invoiceId, lineHeight: tableLineHeight }],
    [{ text: 'No. of Pax', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: guestCount, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booked on', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: transactionDate, lineHeight: tableLineHeight }],
    [{ text: 'Booked by', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: bookedByText, lineHeight: tableLineHeight }, { border: [true, true, false, true], text: 'Programme charges\nCamera & Vehicle charge\nRe schedule charge\nTOTAL', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: chargesText, lineHeight: tableLineHeight }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return (i === 0) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return (i === 0) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
    
    }
    docDefinition.content.push(paymentSummary);
   
    docDefinition.content.push({ text: '\n' })
    
    var entranceGuest=await entranceTicketModel.find({ticket:ticketData._id,type:'Guest'}).populate('guest');
   
    console.log(entranceGuest.length)
    if((entranceGuest.length<1)||(allentrancetcks.length>entranceGuest.length))
    {
    entranceGuest=await entranceTicketModel.find({_id:{$in:allentrancetcks},type:'Guest'}).populate('guest');
    }
    var bookingAbstract = {
    table: {
    widths: ['*', '*', '*', 'auto'],
    headerRows: 1,
    body: [
    [{ text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: 'BOOKING ABSTRACT', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }],
    [{ text: 'Programme Description', lineHeight: tableLineHeight, bold: true, }, { text: 'Numbers', lineHeight: tableLineHeight, bold: true }, { text: 'Rate', lineHeight: tableLineHeight, bold: true }, { text: 'Amount', lineHeight: tableLineHeight, bold: true }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return (i === 0) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return (i === 0) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
   
    for (var j = 0; j < entranceGuest.length; j++) {
    var guestname = "";
    if (entranceGuest[j].guest)
    guestname = entranceGuest[j].guest.name
   
    var nationality = "";
    if (entranceGuest[j].guest)
    if (entranceGuest[j].guest.nationality)
    nationality = entranceGuest[j].guest.nationality
   
    var gender = "";
    if (entranceGuest[j].guest)
    if (entranceGuest[j].guest.gender)
    gender = entranceGuest[j].guest.gender
   
    var dob = "";
    var age = ""
    if (entranceGuest[j].guest)
    dob = entranceGuest[j].guest.dob
    if (dob) {
    age = await getAgeFromDOB(dob)
    }
   
    var guestType = "";
    if (entranceGuest[j].guest)
    if (entranceGuest[j].guest.guestType)
    guestType = entranceGuest[j].guest.guestType
   
    var entranceTicketDate = entranceGuest[j].bookingDate;
    if (entranceTicketDate) {
    if (typeof entranceTicketDate == "string")
    entranceTicketDate = new Date(entranceTicketDate)
    entranceTicketDate = entranceTicketDate.getDate() + "-" + (entranceTicketDate.getMonth() + 1) + "-" + entranceTicketDate.getFullYear()
    }
   
    var guestCharge = entranceGuest[j].charge
   
    if (guestname)
    guestname = guestname.replace(/undefined/g, "");
    else
    guestname = "";
   
    entranceTicketData.push({ name: guestname, age: age, gender: gender, nationality: nationality, date: entranceTicketDate })
   
   
   
    if (guestType == "indian") {
    entranceTicketSummary.indianAdult.number++
    if (guestCharge > 0) {
    entranceTicketSummary.indianAdult.rate = guestCharge;
    entranceTicketSummary.indianAdult.amount = entranceTicketSummary.indianAdult.amount + guestCharge;
    }
    }
    if (guestType == "foreigner") {
    entranceTicketSummary.foreignAdult.number++
    if (guestCharge > 0) {
    entranceTicketSummary.foreignAdult.rate = guestCharge;
    entranceTicketSummary.foreignAdult.amount = entranceTicketSummary.foreignAdult.amount + guestCharge;
    }
    }
    if (guestType == "indianChildren") {
    entranceTicketSummary.indianChild.number++
    if (guestCharge > 0) {
    entranceTicketSummary.indianChild.rate = guestCharge;
    entranceTicketSummary.indianChild.amount = entranceTicketSummary.indianChild.amount + guestCharge;
    }
    }
    if (guestType == "foreignerChildren") {
    entranceTicketSummary.foreignChild.number++
    if (guestCharge > 0) {
    entranceTicketSummary.foreignChild.rate = guestCharge;
    entranceTicketSummary.foreignChild.amount = entranceTicketSummary.foreignChild.amount + guestCharge;
    }
    }
    }
   
   
    
   
    var entranceTicketSummaryAmount = 0;
    if (entranceTicketSummary) {
   
    if (entranceTicketSummary.indianAdult) {
    if (entranceTicketSummary.indianAdult.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Entrance Tickets – Indian Adult',lineHeight: tableLineHeight },{ text: entranceTicketSummary.indianAdult.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.indianAdult.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.indianAdult.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.indianAdult.amount
    entranceTicketSummaryAmount = entranceTicketSummaryAmount + entranceTicketSummary.indianAdult.amount
    }
    }
    if (entranceTicketSummary.indianChild) {
    if (entranceTicketSummary.indianChild.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Entrance Tickets – Indian Child',lineHeight: tableLineHeight },{ text: entranceTicketSummary.indianChild.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.indianChild.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.indianChild.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.indianChild.amount
    entranceTicketSummaryAmount = entranceTicketSummaryAmount + entranceTicketSummary.indianChild.amount
    }
    }
    if (entranceTicketSummary.foreignAdult) {
    if (entranceTicketSummary.foreignAdult.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Entrance Tickets – Foreigner Adult',lineHeight: tableLineHeight },{ text: entranceTicketSummary.foreignAdult.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.foreignAdult.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.foreignAdult.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.foreignAdult.amount
    entranceTicketSummaryAmount = entranceTicketSummaryAmount + entranceTicketSummary.foreignAdult.amount
    }
    }
    if (entranceTicketSummary.foreignChild) {
    if (entranceTicketSummary.foreignChild.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Entrance Tickets – Foreigner Child',lineHeight: tableLineHeight },{ text: entranceTicketSummary.foreignChild.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.foreignChild.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.foreignChild.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.foreignChild.amount
    entranceTicketSummaryAmount = entranceTicketSummaryAmount + entranceTicketSummary.foreignChild.amount
    }
    }
    if (entranceTicketSummary.LMV) {
    if (entranceTicketSummary.LMV.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'LMV',lineHeight: tableLineHeight },{ text: entranceTicketSummary.LMV.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.LMV.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.LMV.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.LMV.amount
    }
    }
    if (entranceTicketSummary.HMV) {
    if (entranceTicketSummary.HMV.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'HMV',lineHeight: tableLineHeight },{ text: entranceTicketSummary.HMV.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.HMV.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.HMV.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.HMV.amount
    }
    }
    if (entranceTicketSummary.Wheeler) {
    if (entranceTicketSummary.Wheeler.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: '2 & 3 Wheeler',lineHeight: tableLineHeight },{ text: entranceTicketSummary.Wheeler.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.Wheeler.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.Wheeler.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.Wheeler.amount
    }
    }
    if (entranceTicketSummary.StillCamera) {
    if (entranceTicketSummary.StillCamera.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Still Camera',lineHeight: tableLineHeight },{ text: entranceTicketSummary.StillCamera.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.StillCamera.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.StillCamera.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.StillCamera.amount
    }
    }
    if (entranceTicketSummary.VideoCamera) {
    if (entranceTicketSummary.VideoCamera.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Video Camera',lineHeight: tableLineHeight },{ text: entranceTicketSummary.VideoCamera.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.VideoCamera.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.VideoCamera.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.VideoCamera.amount
    }
    }
    if (entranceTicketSummary.Shuttle) {
    if (entranceTicketSummary.Shuttle.number > 0) {
    // bookingAbstract.table.body.push([
    // { text: 'Shuttle Bus',lineHeight: tableLineHeight },{ text: entranceTicketSummary.Shuttle.number ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.Shuttle.rate ,lineHeight: tableLineHeight},{ text:entranceTicketSummary.Shuttle.amount ,lineHeight: tableLineHeight}
    // ])
    entranceTicketSummary.total = entranceTicketSummary.total + entranceTicketSummary.Shuttle.amount
    }
    }
    }
    
    for (var i = 0; i < allpgms.length; i++) {
    
    docDefinition.content.push({ text: '\n' })
   
   
    var programmeDescriptionHeader = {
    table: {
    widths: ['*'],
    headerRows: 1,
    body: [
    [{ text: allpgms[i].programme.progName, style: 'programmeDescriptionHeader' }],
    ]
    },
    layout: 'noBorders'
    }
    
    docDefinition.content.push(programmeDescriptionHeader);
    try
    {
    if(allpgms[i].programme.isCottage==true)
    {
    var room=await roomBookingModel.find({programme:allpgms[i].programme._id,ticket:id,status:'Active'})
    if(!Misc.isnullorempty(room))
    {
    if(room.length>0)
    {
    var allrooms=room.map(x=>x.roomAllocation.length)
    var roomData=""
    for(var r=0;r<allrooms.length;r++)
    {
    if(allrooms[r]>0)
    {
    if(r<1)
    roomData=allrooms[r]
    else
    roomData=roomData+","+allrooms[r]
    }
    }
    text = "Room data: "+roomData+" room(s)"
    docDefinition.content.push({ text: '\n' })
    docDefinition.content.push({ text: text, bold: true })
    }
    }
    }
    else{
    var veh = await bookingModel.find({programme:allpgms[i].programme._id,ticket:id,status:'Active'})
    if(veh.length>0){
    if(veh[0].noOfSafariVehiclesBooked>0){
    text = "Safari Vehicles: "+veh[0].noOfSafariVehiclesBooked+" Vehicle(s)"
    docDefinition.content.push({ text: '\n' })
    docDefinition.content.push({ text: text, bold: true })
    }
   
    }
    }
    }
    catch(ex)
    {
    console.log(ex);
    }
    docDefinition.content.push({ text: '\n' })
    var programmeDetailTable = {
    table: {
    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
    headerRows: 1,
    body: [
    [{ text: 'Sl.', lineHeight: tableLineHeight, bold: true, }, { text: 'Name', lineHeight: tableLineHeight, bold: true }, { text: 'Age', lineHeight: tableLineHeight, bold: true }, { text: 'Gender', lineHeight: tableLineHeight, bold: true }, { text: 'Nationality', lineHeight: tableLineHeight, bold: true }, { text: 'Programme Date', lineHeight: tableLineHeight, bold: true }, { text: 'Slot', lineHeight: tableLineHeight, bold: true }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return 1;
    //return (i === 0 ) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return 'gray'
    //return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
    for (var j = 0; j < allpgms[i].guestdata.length; j++) {
   
    var name = allpgms[i].guestdata[j].guest.name
    var age = await getAgeFromDOB(dob)
    if(!Misc.isnullorempty(allpgms[i].guestdata[j].guest.idproofs)){
    name = await capitalizeFirstLetter(name);
    }
    var dob = allpgms[i].guestdata[j].guest.dob;
    var gender = allpgms[i].guestdata[j].guest.gender
    var guestType = allpgms[i].guestdata[j].guest.nationality;//guestTyptoString(allpgms[i].guestdata[j].guest.guestType);
    var slot = convertTime(allpgms[i].guestdata[j].slotDetail.startTime) + " - " + convertTime(allpgms[i].guestdata[j].slotDetail.endTime);
    var bookingdate=allpgms[i].guestdata[j].bookingDate
    if (typeof bookingdate == "string")
    bookingdate = new Date(bookingdate)
    if (bookingdate)
    bookingdate = bookingdate.getDate() + "-" + (bookingdate.getMonth() + 1) + "-" + bookingdate.getFullYear()
   
    if(name)
    name = name.replace(/undefined/g, "");
    else
    name="";
    if(gender)
    gender = gender.replace(/undefined/g, "");
    else
    gender="";
    if(guestType)
    guestType = guestType.replace(/undefined/g, "");
    else
    guestType="";
    if(slot)
    slot = slot.replace(/undefined/g, "");
    else
    slot="";
    programmeDetailTable.table.body.push([
    { text: (j + 1), lineHeight: tableLineHeight }, { text: name, lineHeight: tableLineHeight }, { text: age, lineHeight: tableLineHeight }, { text: gender, lineHeight: tableLineHeight },
    { text: guestType, lineHeight: tableLineHeight }, { text: bookingdate, lineHeight: tableLineHeight }, { text: slot, lineHeight: tableLineHeight }
    ]) 
    }
    docDefinition.content.push(programmeDetailTable);
    }
   
    var bookingDescriptionTable = {
    table: {
    widths: ['*'],
    headerRows: 1,
    body: [
    [{ text: 'BOOKING DESCRIPTION', style: 'bookingDescriptionHeader' }],
    ]
    },
    layout: 'noBorders'
    }
    docDefinition.content.push(bookingDescriptionTable);
   
   
    if (entranceTicketData) {
    if (entranceTicketData.length > 0) {
    var entranceTicket = {
    table: {
    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
    headerRows: 1,
    body: [
    [{ text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: 'Entrance tickets', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }],
    [{ text: 'Sl.', lineHeight: tableLineHeight, bold: true, }, { text: 'Name', lineHeight: tableLineHeight, bold: true }, { text: 'Age', lineHeight: tableLineHeight, bold: true }, { text: 'Gender', lineHeight: tableLineHeight, bold: true }, { text: 'Nationality', lineHeight: tableLineHeight, bold: true }, { text: 'Validity Date', lineHeight: tableLineHeight, bold: true }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return (i === 0) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return (i === 0) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
    for (var i = 0; i < entranceTicketData.length; i++) {
    entranceTicket.table.body.push([{ text: (i + 1), lineHeight: tableLineHeight }, { text: entranceTicketData[i].name, lineHeight: tableLineHeight }, { text: entranceTicketData[i].age, lineHeight: tableLineHeight }, { text: entranceTicketData[i].gender, lineHeight: tableLineHeight }, { text: entranceTicketData[i].nationality, lineHeight: tableLineHeight }, { text: entranceTicketData[i].date, lineHeight: tableLineHeight }])
    }
   
    docDefinition.content.push(entranceTicket);
    }
    }
   
   
    if (entranceTicketSummary.total > 0) {
    //console.log(entranceTicketSummary.total)
    bookingAbstract.table.body.push([
    { text: '', lineHeight: tableLineHeight }, { text: '', lineHeight: tableLineHeight }, { text: 'Total', lineHeight: tableLineHeight, align: 'right', bold: true }, { text: entranceTicketSummary.total.toString(), lineHeight: tableLineHeight, bold: true }
    ])
    }
   
    var vehicles=await entranceTicketModel.find({$or:[{ticket:ticketData._id},{payment:paymentId}],type:'Vehicle'});
   
    if(vehicles.length<1)
    {
    vehicles=await entranceTicketModel.find({_id:{$in:allvehicles},type:'Vehicle'});
    }
   
    if (vehicles.length > 0) {
   
    for (var j = 0; j < vehicles.length; j++) {
    var vehicename = vehicles[j].vehicle
   
   
    var vehicledate = vehicles[j].bookingDate
    if (typeof vehicledate == "string")
    vehicledate = new Date(vehicledate)
    if (vehicledate)
    vehicledate = vehicledate.getDate() + "-" + (vehicledate.getMonth() + 1) + "-" + vehicledate.getFullYear()
   
    var vehiclecharge = vehicles[j].charge
   
    if (vehicename)
    vehicename = vehicename.replace(/undefined/g, "");
    else
    vehicename = "";
   
    if (vehicename == "LMVParkingFee") {
    entranceTicketSummary.LMV.number++
    if (vehiclecharge > 0) {
    entranceTicketSummary.LMV.rate = vehiclecharge;
    entranceTicketSummary.LMV.amount = entranceTicketSummary.LMV.amount + vehiclecharge;
    }
    }
    if (vehicename == "HMVParkingFee") {
    entranceTicketSummary.HMV.number++
    if (vehiclecharge > 0) {
    entranceTicketSummary.HMV.rate = vehiclecharge;
    entranceTicketSummary.HMV.amount = entranceTicketSummary.HMV.amount + vehiclecharge;
    }
    }
    if (vehicename == "Wheeler") {
    entranceTicketSummary.Wheeler.number++
    if (vehiclecharge > 0) {
    entranceTicketSummary.Wheeler.rate = vehiclecharge;
    entranceTicketSummary.Wheeler.amount = entranceTicketSummary.Wheeler.amount + vehiclecharge;
    }
    }
   
    if (vehicename == "VideoCamera") {
    entranceTicketSummary.VideoCamera.number++
    if (vehiclecharge > 0) {
    entranceTicketSummary.VideoCamera.rate = vehiclecharge;
    entranceTicketSummary.VideoCamera.amount = entranceTicketSummary.VideoCamera.amount + vehiclecharge;
    }
    }
    if (vehicename == "StillCamera") {
    entranceTicketSummary.StillCamera.number++
    if (vehiclecharge > 0) {
    entranceTicketSummary.StillCamera.rate = vehiclecharge;
    entranceTicketSummary.StillCamera.amount = entranceTicketSummary.StillCamera.amount + vehiclecharge;
    }
    }
   
    var match = vehcileCamTicketData.filter(x => (x.type == vehicename && x.date == vehicledate))
    if (match.length > 0)
    match[0].nos = match[0].nos + 1;
    else
    vehcileCamTicketData.push({ type: vehicename, nos: 1, date: vehicledate })
   
    }
    }
   
   
    if (vehcileCamTicketData) {
    if (vehcileCamTicketData.length > 0) {
    var vehcileDetailTable = {
    table: {
    widths: ['auto', '*', '*', 'auto'],
    headerRows: 1,
    body: [
    [{ text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: 'Vehicle And Camera details', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }],
    [{ text: 'Sl.', lineHeight: tableLineHeight, bold: true, }, { text: 'Type', lineHeight: tableLineHeight, bold: true }, { text: 'Nos', lineHeight: tableLineHeight, bold: true }, { text: 'Validity Date', lineHeight: tableLineHeight, bold: true }]
    ]
    },
    layout: {
    hLineWidth: function (i, node) {
    return (i === 0) ? 0 : 1;
    },
    vLineWidth: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 0 : 1;
    },
    hLineColor: function (i, node) {
    return (i === 0) ? 'black' : 'gray';
    },
    vLineColor: function (i, node) {
    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    },
    }
    }
    for (var i = 0; i < vehcileCamTicketData.length; i++) {
    vehcileDetailTable.table.body.push([{ text: (i + 1), lineHeight: tableLineHeight }, { text: vehcileCamTicketData[i].type, lineHeight: tableLineHeight }, { text: vehcileCamTicketData[i].nos, lineHeight: tableLineHeight }, { text: vehcileCamTicketData[i].date, lineHeight: tableLineHeight }])
    }
   
    docDefinition.content.push(vehcileDetailTable);
    }
    }
   
   
   
    
    var terms = await StaticModelsGeneral.StaticDataModel.findOne({Name:"Terms and Conditions"})
    var cancellation = await StaticModelsGeneral.StaticDataModel.findOne({Name:"Travel and Cancellation Policy"})
   
    if (terms) {
    docDefinition.content.push({ text: '\n' })
   
    terms = terms.Value;
    terms = htmlToText(terms, {
    wordwrap: null
    });
   
    var TermsHeader = {
    table: {
    widths: ['*'],
    headerRows: 1,
    body: [
    [{ text: 'Terms & Conditions', style: 'programmeDescriptionHeader' }],
    ]
    },
    layout: 'noBorders'
    }
   
    docDefinition.content.push({ text: '\n' })
    docDefinition.content.push(TermsHeader);
   
    docDefinition.content.push({ text: '\n' })
   
    docDefinition.content.push({ text: terms });
    }
   
    if (cancellation) {
    docDefinition.content.push({ text: '\n' })
   
    cancellation = cancellation.Value;
    cancellation = cancellation.replace(/�/g, "")
    cancellation = htmlToText(cancellation, {
    wordwrap: null
    });
   
    var TermsHeader = {
    table: {
    widths: ['*'],
    headerRows: 1,
    body: [
    [{ text: 'Booking & Cancellation Policy', style: 'programmeDescriptionHeader' }],
    ]
    },
    layout: 'noBorders'
    }
    docDefinition.content.push(TermsHeader);
   
    docDefinition.content.push({ text: '\n' })
   
    docDefinition.content.push({ text: cancellation });
    }
   
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
   
   }
   catch(ex)
   {
    console.log(ex)
   }
    return pdfDoc;
   
   }

async function bookingTicketpdf(id){
    try{
        var printer = new PdfPrinter(fonts);
        var docDefinition = {
            // pageSize: 'A5',
            pageMargins: 30/*40*/, //[ 20, 60, 20, 60 ]
            info: {
                title: 'Mudumalai'
            },
            content: [
            ],
            footer: function (currentPage, pageCount) { return { margin: 10, text: currentPage.toString() + ' of ' + pageCount, alignment: 'right' } }
        };
        var tableLineHeight = 1.2

        docDefinition.defaultStyle = {
            font: 'Times',
            fontSize: 9,
            alignment: 'left'
        }
    } catch (err) {
        //Retun an empty document
    }
}