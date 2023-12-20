// netlify-functions/api.js
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const response = await axios.post('https://Ozziekins.pythonanywhere.com/predict', {
      // Your request data
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
