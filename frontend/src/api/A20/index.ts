import axios from 'axios'
import router from '@/router'
import type Authentication from '@/api/A20/authentication.ts'

// create default http client for API requests
const http = axios.create({
  baseURL: '/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// request interceptor: authenticate API requests with the access token from local storage (if available)
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor: if API rejects the request because the user is no longer logged in then redirect to /login
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      router.replace('/login')
    }
    return Promise.reject(error)
  }
)

/**
 * Removes token, expiry, and username from localStorage.
 */
export const clearToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expiry')
  localStorage.removeItem('username')
}

/**
 * Authenticates the user credentials with the API and stores the temporary access token in local storage.
 * If authentication fails then the access token is cleared from local storage and an error message is thrown.
 *
 * @throws {string} error message if login fails
 */
export const login = async (username: string, password: string) => {
  return http
    .post('login/', { username, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expiry', response.data.expiry)
      localStorage.setItem('username', response.data.username)
      router.replace('/')
      return response.data as Authentication
    })
    .catch((error) => {
      clearToken()
      return Promise.reject(error.response?.data?.non_field_errors?.[0] || 'Invalid credentials')
    })
}

/**
 * Logs the user out and clears the access token from local storage.
 */
export const logout = async () => {
  return http
    .post('logout/')
    .then(() => {
      router.replace('/login')
    })
    .finally(() => {
      clearToken()
    })
}

/**
 * Checks that a valid, non-expired access token is currently present in localStorage.
 * If a token is present and is invalid or expired then it is cleared from localStorage.
 */
export const validateToken = () => {
  const token = localStorage.getItem('token')
  const expiry = localStorage.getItem('expiry')

  if (!token || !expiry) {
    clearToken()
    return false
  }

  try {
    const expiresAt = new Date(expiry)
    if (isNaN(expiresAt.getTime())) {
      clearToken()
      return false
    }

    const now = new Date()
    if (expiresAt.getTime() < now.getTime()) {
      clearToken()
      return false
    }
  } catch {
    clearToken()
    return false
  }

  return true
}
