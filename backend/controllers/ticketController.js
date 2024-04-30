var ShikkaraBookingModel = require('../models/shikaraBookingModel');
var PdfPrinter = require('pdfmake')
var QRCode = require('qrcode')
const moment = require('moment')
const shikaraBookingModel = require('../models/shikaraBookingModel');
const houseboatBookingItemModel=require('../models/houseboatBookingItemModel');
const tripTypeModel = require('../models/tripTypeModel');

function formatTimestamp(timestamp) {
    return moment(new Date(timestamp)).format('YYYY-MM-DDTHH:mm:ss');
}

async function getqrimage(data) {
    try {
        var content = "nodata";
        QRCode.toDataURL(data, function (err, url) {
            content = url;
            //console.log(url)
        })
        var tries = 0;

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        do {
            await sleep(500);
            tries++;
            if (tries > 40) {
                //20 secs & yet not fully read
                return null;
            }
        } while (content === "nodata");
        return content;
    }
    catch (e) {
        console.log(e);
    }
    return null;
}
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
function formatTimestampToHHMM(timestamp) {
    return moment(new Date(timestamp)).format('hh:mm A');
}

var fonts = {
    Roboto: {
        normal: 'Roboto', // Replace with the path to the normal font file
        bold: 'Roboto-Bold',       // Replace with the path to the bold font file
    },
    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
        normal: 'Symbol'
    },
    ZapfDingbats: {
        normal: 'ZapfDingbats'
    }
};


async function bookingTicketShikarapdf(id) {
    try {
        var printer = new PdfPrinter(fonts);
        var docDefinition = {
            // pageSize: 'A5',
            pageMargins: 30/*40*/, //[ 20, 60, 20, 60 ]
            info: {
                title: 'Access_rooms_ticket'
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
        docDefinition.styles = {
            h1: {
                fontSize: 9,
                bold: true,
                alignment: 'center'
            },
            h2: {
                fontSize: 10,
                bold: true,
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
            reschedule: {
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
                fillColor: '#F38137',
                alignment: 'left',
                lineHeight: tableLineHeight,
            },
            bookingAbstractHeader: {
                bold: true,
                fontSize: 11,
                color: '#F38137',
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
                color: '#F38137',
                fillColor: '#F38137',
                alignment: 'center',
                lineHeight: tableLineHeight,
            },
            entranceTicketHeader: {
                bold: true,
                fontSize: 11,
                fillColor: '#F38137',
                alignment: 'left',
                lineHeight: tableLineHeight,
            },
            programmeDescriptionHeader: {
                bold: true,
                fontSize: 11,
                fillColor: '#F38137',
                lineHeight: tableLineHeight,
            },
        }
        var booking = await shikaraBookingModel.findOne({ _id: id, status: "Active" }).populate([{ path: "shikaraid", populate: { path: "startingLocation" } }]).populate("location").populate("bookedbyid")
        if (!booking) {
             res.status(200).json({
                status: false,
                msg: 'No Active Booking Found!'
            })
            return
        }
        const ticketNumber = Math.floor(1000 + Math.random() * 9000);
        if (booking) {
            var totalAmount = ""
            if (booking.bookingTotal) {
                totalAmount = booking.bookingTotal;
            }

            var memberCount = "0"
            if (booking.memberCount) {
                memberCount = booking.memberCount
            }
            var childrenCount = "0"
            if (booking.childrenCount) {
                childrenCount = booking.childrenCount
            }
            var adultcount = "0"
            adultcount = Math.abs(parseInt(memberCount) - parseInt(childrenCount))
            if (booking.customerDetails) {
                var phoneNumber = ""
                if (booking.customerDetails.phoneNumber) {
                    phoneNumber = booking.customerDetails.phoneNumber
                }
                /*  if (booking.customerDetails.name) {
                     name = booking.customerDetails.name
                 }
                 if (booking.customerDetails.email) {
                     email = booking.customerDetails.email
                 }
                 if (booking.customerDetails.address) {
                     address = booking.customerDetails.address
                 } */
            }
            // if (booking.bookedbyid) {
            //     var name = ""
            //     if (booking.bookedbyid.name) {
            //         name = booking.bookedbyid.name
            //     }
            //     var email = ""
            //     if (booking.bookedbyid.email) {
            //         email = booking.bookedbyid.email
            //     }
            //     var address = ""
            //     if (booking.bookedbyid.address) {
            //         address = booking.bookedbyid.address
            //     }
            // }
            if (booking.customerDetails) {
                var name = ""
                if (booking.customerDetails.name) {
                    name = booking.customerDetails.name
                }
                var email = ""
                if (booking.customerDetails.email) {
                    email = booking.customerDetails.email
                }
                var address = ""
                if (booking.customerDetails.address) {
                    address = booking.customerDetails.address
                }
            }
            var bookingNo = ""
            if (booking.bookingNo) {
                bookingNo = booking.bookingNo
            }
            var bookedon = ""
            if (booking.created_at) {
                bookedon = formatDate(booking.created_at)
            }
            var startTime = ""
            if (booking.startTime) {
                startTime = formatTimestampToHHMM(booking.startTime)
            }
            var endTime = ""
            if (booking.endTime) {
                endTime = formatTimestampToHHMM(booking.endTime)
            }
            var advance = ""
            if (booking.advance) {
                advance = booking.advance
            }
            var firstGst = ""
            if (booking.firstGst) {
                firstGst = booking.firstGst
            }
            var balance = ""
            if (booking.postBookingamount) {
                balance = booking.postBookingamount
            }
            var shikaraName = ""
            if (booking.shikaraid) {
                if (booking.shikaraid.shikaraName) {
                    shikaraName = booking.shikaraid.shikaraName
                }

            }
            var selectedDate = ""
            if (booking.selectedDate) {
                selectedDate = formatDate(booking.selectedDate)
            }
            var location = ""
            if (booking.location) {
                if (booking.location.name) {
                    location = booking.location.name
                }
            }
            var pickUpLocation = ""
            if (booking.shikaraid) {
                if (booking.shikaraid.startingLocation) {
                    if (booking.shikaraid.startingLocation.name) {
                        pickUpLocation = booking.shikaraid.startingLocation.name
                    }
                }
            }
        }
        var qrstring = "https://api.accessrooms.com/invoice/shikara/agent?id=" + id;
        var qrContent = await getqrimage(qrstring)
        var topTable = {
            table: {
                widths: ['*', '*', 'auto'],
                headerRows: 0,
                body: [
                    [{ text: 'Access Rooms', bold: true },
                    { rowSpan: 2, colSpan: 1, image: './assets/logo.png', width: 80, margin: [-13, 0, 0, 0] },
                    { rowSpan: 2, image: qrContent, width: 60 }],
                    [
                        'Kailasam Complex \n 455 Kottayam ,Kerala 686503 \n Helplines:+917994111694 ,\n +919539920001 \n Website : https://accessrooms.com'
                    ],
                    [
                        { colSpan: 3, text: 'e-Ticket Receipt', style: 'eTicket' }
                    ],
                    [
                        { colSpan: 3, text: '\n' }
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
                headerRows: 1,
                body: [
                    [{ text: ('Ticket # ' + bookingNo + ' '), style: 'ticketNum' }, { text: ('Amount: Rs. ' + totalAmount + ' ' /*+ booking.bookingTotal*/), style: 'ticketNum' }],
                ]
            },
            layout: 'noBorders'
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
                'Your electronic ticket is stored on our reservation system. This e-ticket receipt is your electronic ticket. You may need to show this receipt in all the points of check in and keep until the end of your visit.',
                'Your attention is drawn to the Conditions and Notices set out in the attached documents.',
                'Please visit our website for more information.'
            ],
            style: 'topInstructions'
        }
        docDefinition.content.push(topInstructions);

        docDefinition.content.push({ text: '\n' })

        docDefinition.content.push({ text: 'Below are the details of your booking.' })

        docDefinition.content.push({ text: '\n' })
        var atomTxnID = "TAX123456_ghj";
        var invoiceId = bookingNo;
        var guestCount = memberCount;
        var transactionDate = bookedon;
        var bookedByText = "Name: " + name + " \n  Address: " + address + " \n Email: " + email + " \n Customer Ph: " + phoneNumber + "";
        var chargesText = " Rs " + totalAmount + " \n 0 \n Rs "+ advance +"\n Rs " + balance + " "
        var guestcount = "Adult :" + adultcount + "\n Children :" + childrenCount + " "
        var ticketNo = "100\n100\n100\n300"
        var bookingTotal = totalAmount
        // var "Booked on"  =  bookedOn

        var paymentSummary = {
            table: {
                widths: ['auto', 300, 'auto', '*'],
                headerRows: 1,
                body: [
                    [{ text: 'Item', style: 'paymentSummaryHeader', border: [true, true, false, true] }, { border: [false, true, false, true], text: 'Details', style: 'paymentSummaryHeader' }, { border: [true, true, false, false], text: 'Item', style: 'paymentSummaryHeader' }, { border: [false, true, true, true], text: 'Details', style: 'paymentSummaryHeader' }],
                    [{ text: 'PG Txn. #.', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: atomTxnID, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booking Id #', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: invoiceId, lineHeight: tableLineHeight }],
                    [{ text: 'No. of Guest', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: guestcount, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booked on', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: transactionDate, lineHeight: tableLineHeight }],
                    [{ text: 'Agent Details', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: bookedByText, lineHeight: tableLineHeight }, { border: [true, true, false, true], text: ' Total Booking Amount \n GST Amount \n Advance Paid \n Balance Amount', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: chargesText, lineHeight: tableLineHeight }]
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
        docDefinition.content.push(paymentSummary)
        docDefinition.content.push({ text: '\n' })



        docDefinition.content.push({ text: '\n' })
        var programmeDescriptionHeader = {
            table: {
                widths: ['*'],
                headerRows: 1,
                body: [
                    [{ text: "Shikara Details", style: 'programmeDescriptionHeader' }],
                ]
            },
            layout: 'noBorders'
        }
        docDefinition.content.push(programmeDescriptionHeader);
        var programmeDetailTable = {
            table: {
                widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'/*, 'auto' */],
                headerRows: 1,
                body: [
                    [{ text: 'Sl.', lineHeight: tableLineHeight, bold: true, }, { text: 'Name', lineHeight: tableLineHeight, bold: true }, { text: 'Booked For', lineHeight: tableLineHeight, bold: true }, { text: 'Time Slots', lineHeight: tableLineHeight, bold: true }, { text: 'Location', lineHeight: tableLineHeight, bold: true }, { text: 'Starting Location', lineHeight: tableLineHeight, bold: true },/*  { text: 'Programme Date', lineHeight: tableLineHeight, bold: true }, { text: 'Slot', lineHeight: tableLineHeight, bold: true } */],
                    [{ text: '1.', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' ' + shikaraName + ' ', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' ' + selectedDate + '', lineHeight: tableLineHeight,/*  bold: true */ }, { text: '' + startTime + ' - ' + endTime + ' ', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' ' + location + '', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' ' + pickUpLocation + '', lineHeight: tableLineHeight,/*  bold: true */ },/*  { text: 'Programme Date', lineHeight: tableLineHeight, bold: true }, { text: 'Slot', lineHeight: tableLineHeight, bold: true } */]
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
        docDefinition.content.push(programmeDetailTable);
        docDefinition.content.push({ text: '\n' })

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

        docDefinition.content.push({ text: "* House Boat & Hotel: Individual hotel property located in India.Access Rooms: Access Rooms (India) and Access Rooms Hospitality.\n * Submit documents: Account Number, Pan Card, Aadhar Number, GST Certificate, and Address Proof.\n* Documents subject to change, periodically updated on the platform.Access Rooms may verify submitted documents.\n* Relisting from a chain requires a no-objection certificate.\n * Negotiated agreements for chains, franchises, aggregators.No restriction on platform access without a negotiated agreement. \n* Submission of documents evidencing vendor compliance with laws may be required.Applicable laws prevail in case of conflict.\n* Grievances to be raised at legal@Access Rooms.com."});


        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        return pdfDoc;
    } catch (err) {
        console.log(err)
        //Retun an empty document
    }
}
async function bookingTicketHouseboatpdf(id) {
    try {
        var printer = new PdfPrinter(fonts);
        var docDefinition = {
            // pageSize: 'A5',
            pageMargins: 30/*40*/, //[ 20, 60, 20, 60 ]
            info: {
                title: 'Access_rooms_ticket'
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
            reschedule: {
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
                fillColor: '#F38137',
                alignment: 'left',
                lineHeight: tableLineHeight,
            },
            bookingAbstractHeader: {
                bold: true,
                fontSize: 11,
                color: '#F38137',
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
                color: '#F38137',
                fillColor: '#F38137',
                alignment: 'center',
                lineHeight: tableLineHeight,
            },
            entranceTicketHeader: {
                bold: true,
                fontSize: 11,
                fillColor: '#F38137',
                alignment: 'left',
                lineHeight: tableLineHeight,
            },
            programmeDescriptionHeader: {
                bold: true,
                fontSize: 11,
                fillColor: '#F38137',
                lineHeight: tableLineHeight,
            },
        }
        var booking = await houseboatBookingItemModel.findOne({ _id: id, status: "Active" }).populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("location")
        // if(Misc.isnullorempty(booking)){
        //     res.status(200).json({
        //         status: false,
        //         msg: 'No Active Booking Found!'
        //     })
        // }
        const ticketNumber = Math.floor(1000 + Math.random() * 9000);
        if (booking) {
            var totalAmount =0;
            if (booking.totalAmount) {
                totalAmount = booking.totalAmount;
            }

            var totalGuests = 0;
            if (booking.totalGuests) {
                totalGuests = booking.totalGuests
            }
            var adultcount=0;
            if (booking.noOfAdults) {
                adultcount = booking.noOfAdults
            }
            var childrenCount =0;
            if (booking.noOfChildren) {
                childrenCount = booking.noOfChildren
            }
            var name = ""
            var email = ""
            var address = ""
            var phoneNumber=""
            
                if (booking.fullName) {
                    name = booking.fullName
                }
                if (booking.email) {
                    email = booking.email
                }
                if (booking.address) {
                    address = booking.address
                }
                if (booking.phoneNumber) {
                    phoneNumber = booking.phoneNumber
                }
        
            var bookingNo = ""
            if (booking.bookingNo) {
                bookingNo = booking.bookingNo
            }
            var bookingDate = ""
            if (booking.bookingDate) {
                bookingDate = formatDate(booking.bookingDate)
            }
             var advanceAmount = 0;
            if (booking.advanceAmountPaid) {
                advanceAmount = booking.advanceAmountPaid
            }
            var gstAmount =0
            if (booking.gstAmount) {
                gstAmount = booking.gstAmount 
            }
            var balanceAmount = 0;
            if (booking.balancePayAmount) {
                balanceAmount = booking.balancePayAmount 
            }
            var houseBoatName = ""
            if (booking.houseBoatId) {
                if (booking.houseBoatId.houseBoatName) {
                    houseBoatName = booking.houseBoatId.houseBoatName
                }
            }
            var houseBoatType = ""
                if (booking.houseBoatType) {
                    houseBoatType = booking.houseBoatType
                }
            var CheckInDate = ""
            if (booking.startDate) {
                if (booking.startDate) {
                    CheckInDate = formatDate(booking.startDate)
                }

            }
            var CheckOutDate = ""
            if (booking.endDate) {
                if (booking.endDate) {
                    CheckOutDate =formatDate(booking.endDate)
                }

            }
            var tripType=""
            if (booking.tripType) {
                if (booking.tripType) {
                    tripType =booking.tripType;
                }

            }
            // var selectedDate = ""
            // if (booking.bookedDates) {
            //     var selecteddates=booking.bookedDates.map(x=>{return formatDate(x)}).join(", ");
            //     selectedDate = selecteddates;
            // }
            var location = ""
            if (booking.location) {
                if (booking.location.name) {
                    location = booking.location.name
                }
            }
            var category = ""
            if (booking.category) {
                if (booking.category) {
                    category = booking.category
                }
            }
            var pickUpLocation = ""
            if (booking.houseBoatId.startingLocation) {
                    pickUpLocation = booking.houseBoatId.startingLocation.name
                }
            var totalRooms =0;
            if (booking.totalRooms) {
                totalRooms = booking.totalRooms
             }
        }
        var qrstring = "https://api.accessrooms.com/get/ticket/houseboat?id=" + id;
        var qrContent = await getqrimage(qrstring)
        var topTable = {
            table: {
                widths: ['*', '*', 'auto'],
                headerRows: 0,
                body: [
                    [{ text: 'Access Rooms', bold: true },
                    { rowSpan: 2, colSpan: 1, image: './assets/logo.png', width: 80, margin: [-13, 0, 0, 0] },
                    //{ rowSpan: 3, image: './assets/logo.png', width: 60 },
                    { rowSpan: 2, image: qrContent, width: 60 }],
                    [
                        'Kailasam Complex \n 455 Kottayam ,Kerala 686503 \n Helplines:+917994111694 ,\n +919539920001 \n Website : https://accessrooms.com'
                    ],
                    [
                        { colSpan: 3, text: 'e-Ticket Receipt', style: 'eTicket' }
                    ],
                    [
                        { colSpan: 3, text: '\n' }
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
                headerRows: 1,
                body: [
                    [{ text: ('Ticket # ' + bookingNo + ' '), style: 'ticketNum' }, { text: ('Amount: Rs.' + totalAmount + '  ' /*+ booking.bookingTotal*/), style: 'ticketNum' }],
                ]
            },
            layout: 'noBorders'
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
                'Your electronic ticket is stored on our reservation system. This e-ticket receipt is your electronic ticket. You may need to show this receipt in all the points of check in and keep until the end of your visit.',
                'Your attention is drawn to the Conditions and Notices set out in the attached documents.',
                'Please visit our website for more information.'
            ],
            style: 'topInstructions'
        }
        docDefinition.content.push(topInstructions);

        docDefinition.content.push({ text: '\n' })

        docDefinition.content.push({ text: 'Below are the details of your booking.' })

        docDefinition.content.push({ text: '\n' })
        var atomTxnID = "TAX123456_ghj";
        var invoiceId = bookingNo;
        var guestCount = totalGuests;
        var transactionDate = bookingDate;
        var bookedByText = "Name: "+name+" \n  Address: "+address+" \n Email: "+email+" \n Phone Number: "+phoneNumber+" ";
        // var chargesText = "Rs. "+advanceAmount+" \n Rs."+balanceAmount+" \n Rs."+totalAmount+"  "
        var chargesText = " Rs. " + advanceAmount + " \n 0 \n Rs. "+ balanceAmount +"\n Rs. " + totalAmount + " "
        var guestcount = "Adult :" + adultcount + "\n Children :" + childrenCount + " "
        var ticketNo = "100\n100\n100\n300"
        var bookingTotal = totalAmount
        //var "Booked on  =  bookedOn

        var paymentSummary = {
            table: {
                widths: ['auto', 300, 'auto', '*'],
                headerRows: 1,
                body: [
                    [{ text: 'Item', style: 'paymentSummaryHeader', border: [true, true, false, true] }, { border: [false, true, false, true], text: 'Details', style: 'paymentSummaryHeader' }, { border: [true, true, false, false], text: 'Item', style: 'paymentSummaryHeader' }, { border: [false, true, true, true], text: 'Details', style: 'paymentSummaryHeader' }],
                    [{ text: 'PG Txn. #.', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: atomTxnID, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booking Id #', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: invoiceId, lineHeight: tableLineHeight }],
                    //[{ text: 'No. of Guest', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: guestCount, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booked on', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: transactionDate, lineHeight: tableLineHeight }],
                    [{ text: 'No. of Guest', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: guestcount, lineHeight: tableLineHeight }, { border: [true, true, false, false], text: 'Booked on', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: transactionDate, lineHeight: tableLineHeight }],
                    [{ text: 'Booked by', lineHeight: tableLineHeight, border: [true, true, false, true] }, { border: [false, true, false, true], text: bookedByText, lineHeight: tableLineHeight }, { border: [true, true, false, true], text: 'Advance amount \n GST amount\n Balance amount \n TOTAL AMOUNT', lineHeight: tableLineHeight }, { border: [false, true, true, true], text: chargesText, lineHeight: tableLineHeight }]
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
        docDefinition.content.push(paymentSummary)
        docDefinition.content.push({ text: '\n' })


        // var bookingAbstract = {
        //     table: {
        //     widths: ['*', '*', '*', 'auto'],
        //     headerRows: 1,
        //     body: [
        //     [{ text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: 'BOOKING ABSTRACT', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }, { text: '', style: 'bookingAbstractHeader', border: [false, false, false, false] }],
        //     [{ text: 'Programme Description', lineHeight: tableLineHeight, bold: true, }, { text: 'Numbers', lineHeight: tableLineHeight, bold: true }, { text: 'Rate', lineHeight: tableLineHeight, bold: true }, { text: 'Amount', lineHeight: tableLineHeight, bold: true }]
        //     ]
        //     },
        //     layout: {
        //     hLineWidth: function (i, node) {
        //     return (i === 0) ? 0 : 1;
        //     },
        //     vLineWidth: function (i, node) {
        //     return (i === 0 || i === node.table.widths.length) ? 0 : 1;
        //     },
        //     hLineColor: function (i, node) {
        //     return (i === 0) ? 'black' : 'gray';
        //     },
        //     vLineColor: function (i, node) {
        //     return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        //     },
        //     }
        //     }
        docDefinition.content.push({ text: '\n' })
        var programmeDescriptionHeader = {
            table: {
                widths: ['*'],
                headerRows: 1,
                body: [
                    [{ text: "Houseboat Details", style: 'programmeDescriptionHeader' }],
                ]
            },
            layout: 'noBorders'
        }
        docDefinition.content.push(programmeDescriptionHeader);
        var programmeDetailTable = {
            table: {
                widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto','auto','auto' ,'auto'],
                headerRows: 1,
                body: [
                    [{ text: 'Sl.', lineHeight: tableLineHeight, bold: true, }, { text: 'Name', lineHeight: tableLineHeight, bold: true },{ text: 'Total Rooms', lineHeight: tableLineHeight, bold: true },{ text: 'Category', lineHeight: tableLineHeight, bold: true },{ text: 'Houseboat Type', lineHeight: tableLineHeight, bold: true },{ text: 'CheckIn Date', lineHeight: tableLineHeight, bold: true },{ text: 'CheckOut Date', lineHeight: tableLineHeight, bold: true }, { text: 'Trip Type', lineHeight: tableLineHeight, bold: true }, { text: 'Location', lineHeight: tableLineHeight, bold: true }, { text: 'Starting Location', lineHeight: tableLineHeight, bold: true },/*  { text: 'Programme Date', lineHeight: tableLineHeight, bold: true }, { text: 'Slot', lineHeight: tableLineHeight, bold: true } */],
                    [{ text: '1.', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' '+houseBoatName+' ', lineHeight: tableLineHeight,/*  bold: true */ },{ text: ' '+totalRooms+' ', lineHeight: tableLineHeight,/*  bold: true */ },{ text: ' '+category+' ', lineHeight: tableLineHeight,/*  bold: true */ },{ text: ' '+houseBoatType+' ', lineHeight: tableLineHeight,/*  bold: true */ },{ text: ' '+CheckInDate+' ', lineHeight: tableLineHeight,/*  bold: true */ },{ text: ' '+CheckOutDate+' ', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' '+tripType+'', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' '+location+'', lineHeight: tableLineHeight,/*  bold: true */ }, { text: ' '+pickUpLocation+'', lineHeight: tableLineHeight,/*  bold: true */ },/*  { text: 'Programme Date', lineHeight: tableLineHeight, bold: true }, { text: 'Slot', lineHeight: tableLineHeight, bold: true } */]
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
        docDefinition.content.push(programmeDetailTable);
        docDefinition.content.push({ text: '\n' })

        // var bookingDescriptionTable = {
        //     table: {
        //     widths: ['*'],
        //     headerRows: 1,
        //     body: [
        //     [{ text: 'BOOKING DESCRIPTION', style: 'bookingDescriptionHeader' }],
        //     ]
        //     },
        //     layout: 'noBorders'
        //     }
        //     docDefinition.content.push(bookingDescriptionTable);

        // var entranceTicket = {
        //     table: {
        //     widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
        //     headerRows: 1,
        //     body: [
        //     [{ text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: 'Entrance tickets', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }, { text: '', style: 'entranceTicketHeader', border: [false, false, false, false] }],
        //     [{ text: 'Sl.', lineHeight: tableLineHeight, /* bold: true */ }, { text: 'Name', lineHeight: tableLineHeight, /* bold: true */ }, { text: 'Age', lineHeight: tableLineHeight, /* bold: true */ }, { text: 'Gender', lineHeight: tableLineHeight, /* bold: true */ }, { text: 'Nationality', lineHeight: tableLineHeight, /* bold: true */ }, { text: 'Validity Date', lineHeight: tableLineHeight, /* bold: true */ }]
        //     ]
        //     },
        //     layout: {
        //     hLineWidth: function (i, node) {
        //     return (i === 0) ? 0 : 1;
        //     },
        //     vLineWidth: function (i, node) {
        //     return (i === 0 || i === node.table.widths.length) ? 0 : 1;
        //     },
        //     hLineColor: function (i, node) {
        //     return (i === 0) ? 'black' : 'gray';
        //     },
        //     vLineColor: function (i, node) {
        //     return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        //     },
        //     }
        //     }
        //     docDefinition.content.push(entranceTicket);

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

        docDefinition.content.push({ text: "* Access Rooms Platform Listing Terms and Conditions outline the requirements for House Boat & Hotel listings on the Access Rooms platform. It defines key terms, such as Access Rooms and House Boat & Hotel, and establishes the scope and applicability of the document. Eligibility criteria include the submission of specific documents, subject to periodic updates. Access Rooms reserves the right to verify documents and may request a no-objection certificate for relisting individual House Boat & Hotels previously part of a chain.\n *We accept government-issued identification documents such as Passport, Aadhar Card, Government ID, and Driving License as valid proof of identity.\n*Please note that pets are not permitted on the premises.\n*Kindly be informed that bringing outside food onto the premises is not permitted.\n*For the comfort and safety of all guests, smoking within the premises is strictly prohibited." });


        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        return pdfDoc;
    } catch (err) {
        console.log(err)
        //Retun an empty document
    }
}
module.exports.bookingTicketShikarapdf = bookingTicketShikarapdf;
module.exports.bookingTicketHouseboatpdf = bookingTicketHouseboatpdf;