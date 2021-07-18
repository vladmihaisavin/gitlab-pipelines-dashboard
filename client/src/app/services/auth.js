import httpClient from 'axios.js'
import Cookies from 'js-cookie'

export function hasAuthToken() {
  return !!Cookies.get('auth_token')
}

export async function signIn(body) {
  return httpClient.post('/auth/login', {
    email: body.email,
    password: body.password
  }).then((response) => {
    if (response.data.token) {
      Cookies.set('auth_token', response.data.token, { expires: 1/24 })
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${ response.data.token }`
    }
    return response
  })
}

export async function signUp(body) {
  return httpClient.post('/auth/register', body)
}

export function logout() {
  Cookies.remove('auth_token')
}