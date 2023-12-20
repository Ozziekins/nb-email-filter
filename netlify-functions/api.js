// netlify-functions/api.js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.handler = async function (event, context) {
  try {
    const { stdout } = await exec('python3 nb_model/api.py');
    return {
      statusCode: 200,
      body: stdout,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
