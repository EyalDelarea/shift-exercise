module.exports.postRequest = async (object, path) => {
  const BACKEND = process.env.VUE_APP_BACKEND_IP;
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    };
    const response = await fetch(BACKEND + path, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { type: 400, message: e };
  }
};
module.exports.putRequest = async (object, path) => {
  const BACKEND = process.env.VUE_APP_BACKEND_IP;
  const obj = JSON.stringify(object);

  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: obj,
    };
    const response = await fetch(BACKEND + path, requestOptions);
    const data = await response.json();
    return data;
  } catch (e) {
    return { type: 400, message: e };
  }
};
