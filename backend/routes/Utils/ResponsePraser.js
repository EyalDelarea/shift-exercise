module.exports.buildResponse = (code, message) => {

    return JSON.stringify({
      type: code,
      message: message,
    });
  };