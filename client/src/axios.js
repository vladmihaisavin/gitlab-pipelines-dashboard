import axios from 'axios'
import Cookies from 'js-cookie'

const getOptions = () => {
    const options = {
        baseURL: `${process.env.REACT_APP_API_URL}/api`,
        timeout: 30000,
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
            return status < 500
        }
    }
    const token = Cookies.get('auth_token')
    if (token) {
        options.headers['Authorization'] = `Bearer ${ token }`
    }
    return options
}

const httpClient = axios.create(getOptions())

httpClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error.response || "Something went wrong!"
    )
);

export default httpClient
