import axios from "axios";
// import messages from "messages";

const client = axios.create({
    baseURL: 'https://gamescore-api-prod-37cu4rqvoa-as.a.run.app',
    // baseURL: 'http://localhost:8080',
});


client.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token"); 
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
);


const onSuccess = function (response) {
    return response.data;
};

const onError = function (error) {
    console.error("Request Failed:", error.config);
    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
        if (
            error.response.data.status === 401 &&
            invalidTokenMessages.includes(error.response.data.message)
        ) {
            localStorage.removeItem("token");
            location.reload();
        }
    } else {
        // triggered the error
        console.error("Error Message:", error.message);
    }

    return Promise.reject({
        errMsg: !error?.response
            ? "Network Issue!"
            : error?.response?.data?.message
            || error?.response?.data?.errors[0].param +
            " " +
            error?.response?.data?.errors[0].msg,
        status: error?.response?.status || "not status",
    });
};

client.interceptors.response.use(onSuccess, onError);
export default client;

const invalidTokenMessages = [
    "Session has been expired!",
    "Invalid token",
    "invalid signature",
];