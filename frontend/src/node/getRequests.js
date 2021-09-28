module.exports.getRequest = async (path) => {
  const backendIP = process.env.VUE_APP_BACKEND_IP;
  try {
    const response = await fetch(backendIP + path);
    const data = await response.json();
    return data;
  } catch (e) {
    return { type: 400, message: e };
  }
};
