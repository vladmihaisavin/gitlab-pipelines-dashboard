import axios from "axios"
import Cookies from 'js-cookie'

const gitlabToken = Cookies.get('gitlabToken')

const axiosInstance = axios.create({
  headers: {
    'PRIVATE-TOKEN': gitlabToken
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error.response || "Something went wrong!"
    )
);

export default axiosInstance;
