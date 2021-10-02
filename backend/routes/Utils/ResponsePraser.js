/**
 * parse a response to send to the frontend
 * @param {*} code  4xx,3xx,2xx,1xx etc..
 * @param {*} message msg
 * @returns object
 */
module.exports.buildResponse = (code, message) => {

    return JSON.stringify({
      type: code,
      message: message,
    });
  };