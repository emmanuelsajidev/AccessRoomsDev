var http = require('https');
var shortid = require('shortid');
var crypto = require('crypto');
const { base64encode, base64decode } = require('nodejs-base64');
const { Buffer } = require('buffer');
const PaymentModel = require('../models/paymentModel');

//Live For Customer
var key = '4bb1ed50-5e9d-46d3-b361-eb326238b107'
var MID = "ACCESSONLINE"
var keyIndex = "1";

//Live For Agent
var key = '529d7a56-aed3-4817-b083-2b269ff70918'
var MID = "ACCPGONLINE"
var keyIndex = "1";

async function startPayment(amount, clientcode,merchantTransactionId ) {
  try{
  //var key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
  var key = '4bb1ed50-5e9d-46d3-b361-eb326238b107'
  var keyIndex = "1";
  //var MID = "PGTESTPAYUAT";
  var MID = "ACCESSONLINE"

  var data = {"merchantId":MID,"merchantUserId": clientcode,"amount": 100,"redirectUrl": "https://wtiadmin.in/payment/phonepe/success/production","redirectMode": "POST","callbackUrl": "https://wtiadmin.in/phonepay/trnsaction/response","mobileNumber": 9744833812,"paymentInstrument": {"type": "PAY_PAGE"}}
  data.amount = amount*100;
  data.merchantTransactionId = merchantTransactionId;
  var trasctionMarchentId = data.merchantTransactionId;
  var time = new Date();
  if (clientcode)
    if (clientcode.length > 15)
      clientcode = clientcode.substring(1, 10)
  var cc = clientcode;
  //console.log(data);
  //console.log(JSON.stringify(data));
  var buff = new Buffer.from(JSON.stringify(data))
  var final = buff.toString('base64');
  //console.log(final)


  var sign = final + "/pg/v1/pay" + key
  const hash = crypto.createHash('sha256').update(sign).digest('hex');
  //console.log(hash)
  var PhonePeData = await PhonePeModel.findOne({_id:clientcode,status:"initiate"})
  if(PhonePeData){
    PhonePeData.hash = hash;
    PhonePeData.payLoad = final;
    PhonePeData.x_Verify = hash + '###' +keyIndex
    await PhonePeData.save()
  }
  const options = {
    method: 'POST',
    hostname: 'api.phonepe.com',
    port: null,
    path: '/apis/hermes/pg/v1/pay',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': hash + '###' + keyIndex
    },
  };
  const data1 = JSON.stringify({
    request: final
  });
  var result = await doRequest(options, data1);
  function doRequest(options, data) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(data)
      req.end();
    });
  }
  //console.log(result)

  return result
}catch(e){
  console.log(e)
}
}

async function startPaymentTest(amount, clientcode,merchantTransactionId,payId,sucessurl,falilureurl,isCustomer ) {
  try{
    if(isCustomer == false){
      var key = '529d7a56-aed3-4817-b083-2b269ff70918'//4bb1ed50-5e9d-46d3-b361-eb326238b107   //6be30289-569c-4623-9c34-8d3d1419c024  
      var keyIndex = "1";
      var MID = "ACCPGONLINE"// ACCESSONLINE  //PGTESTPAYUAT76
    }else{
      var key = '4bb1ed50-5e9d-46d3-b361-eb326238b107'
      var MID = "ACCESSONLINE"
      var keyIndex = "1";
    }
  var data = {"merchantId":MID,"merchantUserId": clientcode,"amount": 100,"redirectUrl": sucessurl,"redirectMode": "POST","callbackUrl": "https://api.accessrooms.com/payment/phonepe/success/production","mobileNumber": 9744833812,"paymentInstrument": {"type": "PAY_PAGE"}}
  data.amount = amount*100;
  data.merchantTransactionId = merchantTransactionId;
  var buff = new Buffer.from(JSON.stringify(data))
  var final = buff.toString('base64');
  var sign = final + "/pg/v1/pay" + key
  const hash = crypto.createHash('sha256').update(sign).digest('hex');
  console.log("Hash Value ",hash)
  var PhonePeData = await PaymentModel.findOne({_id:payId,status:"initiate"})
  if(PhonePeData){
    PhonePeData.hash = hash;
    PhonePeData.payLoad = final;
    PhonePeData.x_Verify = hash + '###' +keyIndex
    await PhonePeData.save()
  }
  const options = {
    method: 'POST',
    hostname: 'api.phonepe.com',
    port: null,
    path: '/apis/hermes/pg/v1/pay',///apis/pg-sandbox/pg/v1/pay  ,,,Live:/apis/hermes/pg/v1/pay
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': hash + '###' + keyIndex
    },
  };
  const data1 = JSON.stringify({
    request: final
  });
  console.log(data1)
  var result = await doRequest(options, data1);
  function doRequest(options, data) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(data)
      req.end();
    });
  }
  console.log(result)

  return result
}catch(e){
  console.log(e)
}
}


//responce handler
async function handleResponse(encData){
    try{
        let bufferObj = Buffer.from(encData, "base64");
        let decodedString = bufferObj.toString("utf8");
        return decodedString;
    }catch(e){
        console.log(e)
    }
}


async function handlePhonePeResponse(encData){
  try{
      let bufferObj = Buffer.from(encData, "base64");
      let decodedString = bufferObj.toString("utf8");
      return decodedString;

  }catch(e){
      console.log(e)
  }
}

async function validateHash(data){
    try{
        var key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        var keyIndex = "1";
        var MID = "PGTESTPAYUAT";
        
    }catch(e){
        console.log(e)
    }
}

async function CheckPaymentStatus(transId){
  try{
      var data = "/pg/v1/status/"+MID+"/"+transId+"/"+key
      data = JSON.toString(data)
      var buff = new Buffer.from(JSON.stringify(data))
      //var final = buff.toString('base64');
      //var sign = final + "/pg/v1/pay" + key
      const hash = crypto.createHash('sha256').update(data).digest('hex')
      console.log(hash)
      var x_Verify = hash+'###' + keyIndex;
      console.log(x_Verify)
      const options = {
        method: 'GET',
        hostname: 'api-preprod.phonepe.com',
        port: null,
        path: '/apis/pg-sandbox/pg/v1/status/'+MID+"/"+transId,///apis/pg-sandbox/pg/v1/pay  ,,,Live:/apis/hermes/pg/v1/pay
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': x_Verify
        },
      };
      var result = await doRequest(options);
      function doRequest(options, data) {
        return new Promise((resolve, reject) => {
          const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
    
            res.on('data', (chunk) => {
              responseBody += chunk;
            });
    
            res.on('end', () => {
              resolve(JSON.parse(responseBody));
            });
          });
    
          req.on('error', (err) => {
            reject(err);
          });
    
          req.write(data)
          req.end();
        });
      }
      console.log(result)

  }catch(err){
    console.log(err)
    return{status:false}
  }
}

module.exports.startPayment = startPayment;
module.exports.startPaymentTest = startPaymentTest
module.exports.handleResponse = handleResponse;
module.exports.CheckPaymentStatus = CheckPaymentStatus;
