// netlify-functions/api.js
const { execSync } = require('child_process');
const path = require('path');

exports.handler = async function (event, context) {
  try {
    const result = execSync(`python ../../nb_model/api.py`).toString('utf-8');

    return {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
