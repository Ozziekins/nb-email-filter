// netlify-functions/api.js
const { execSync } = require('child_process');
const path = require('path');

exports.handler = async function (event, context) {
  try {
    // Set the path to the directory containing api.py
    const nbModelPath = path.join(__dirname, '..', 'nb_model');

    // Run the command with cd to the nb_model directory
    const result = execSync(`cd ${nbModelPath} && python api.py`).toString('utf-8');

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
