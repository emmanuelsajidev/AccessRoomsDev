const axios = require("axios");

const apiUrl = "https://api.interakt.ai/v1/public/message/";
// // Function to send WhatsApp OTP
async function sendWhatsAppOTP(msgType,phoneNumber,data,countryCode,apiUrl){
  // const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  const message = {
    countryCode,
    phoneNumber: phoneNumber,
    type: "Template",
    template: {
      name: msgType,
      languageCode: "en_US", 
      bodyValues: data, 
    },
  };
  console.log(message, "message");
  try {
    // const response = await axios.post(apiUrl, message, {
    //   headers: {
    //     "Authorization": 'Basic <MXZXU0RHTGREZ0ZJTnNKZno1bVdSc0xzTU1tT0xzTFlNdE5ERG43ZlZ3ODo=>',
    //     "Content-Type": "application/json"
    //   },
    // }); 
    // return response.data;
    return;
  } catch (error) {
    console.error(
      "Error sending WhatsApp OTP:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}


module.exports.sendWhatsAppOTP = sendWhatsAppOTP;
