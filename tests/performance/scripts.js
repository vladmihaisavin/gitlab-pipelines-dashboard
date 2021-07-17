import { group, check } from 'k6'
import http from 'k6/http'

export let options = {
  vus: 100,
  duration: '30s',
}

export default function() {
  const baseUrl = 'http://localhost:6606'
  const name = 'vlad'
  const email = 'savin.vladmihai@gmail.com'
  const password = 'asd123'
  let res, userId, token

  group('Auth - Users', function() {
    /* ------------------------------   START REGISTER   ---------------------------------- */
    res = http.post(`${baseUrl}/api/auth/register`, JSON.stringify({
      name, email, password
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    check(res, {
      'Register - status code is 201': (res) => {
        userId = JSON.parse(res.body).id
        return res.status === 201
      }
    })
    /* ------------------------------   END REGISTER   ---------------------------------- */

    /* ------------------------------   START LOGIN   ---------------------------------- */
    res = http.post(`${baseUrl}/api/auth/login`, JSON.stringify({
      email, password
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    check(res, {
      'Login - status code is 200': (res) => {
        token = JSON.parse(res.body).token
        return res.status === 200
      }
    })
    /* ------------------------------   END LOGIN   ---------------------------------- */

    /* ------------------------------   START LIST   ---------------------------------- */
    res = http.get(`${baseUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    check(res, {
      'GET /api/users - status code is 200': (res) => {
        return res.status === 200
      }
    })
    /* ------------------------------   END LIST   ---------------------------------- */

    /* ------------------------------   START BULK UPDATE   ---------------------------------- */
    res = http.patch(`${baseUrl}/api/users`, JSON.stringify({
      criteria: [{
        field: 'id',
        op: 'in',
        value: [userId]
      }],
      set: {
        type: 'guest'
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    check(res, {
      'PATCH /api/users - status code is 204': (res) => {
        return res.status === 204
      }
    })
    /* ------------------------------   END BULK UPDATE   ---------------------------------- */
    
    /* ------------------------------   START SHOW   ---------------------------------- */
    res = http.get(`${baseUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    check(res, {
      'GET /api/users/userId - status code is 200': (res) => {
        return res.status === 200
      }
    })
    /* ------------------------------   END SHOW   ---------------------------------- */

    /* ------------------------------   START UPDATE   ---------------------------------- */
    const now = '2000-01-01 01:00:00'
    res = http.put(`${baseUrl}/api/users/${userId}`, JSON.stringify({
      type: 'guest',
      name,
      email,
      password,
      createdAt: now,
      updatedAt: now
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    check(res, {
      'PUT /api/users/userId - status code is 204': (res) => {
        return res.status === 204
      }
    })
    /* ------------------------------   END UPDATE   ---------------------------------- */
    
    /* ------------------------------   START PARTIAL UPDATE   ---------------------------------- */
    res = http.patch(`${baseUrl}/api/users/${userId}`, JSON.stringify({
      type: 'guest'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    check(res, {
      'PATCH /api/users/userId - status code is 204': (res) => {
        return res.status === 204
      }
    })
    /* ------------------------------   END PARTIAL UPDATE   ---------------------------------- */
    
    /* ------------------------------   START DELETE   ---------------------------------- */
    res = http.del(`${baseUrl}/api/users/${userId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    check(res, {
      'DELETE /api/users/userId - status code is 204': (res) => {
        return res.status === 204
      }
    })
    /* ------------------------------   END DELETE   ---------------------------------- */
  })
}