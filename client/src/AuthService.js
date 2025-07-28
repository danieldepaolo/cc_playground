import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export function loggedIn() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (exp && (Date.now() / 1000 > exp)) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function sendRequestAuth(url, method='get', body=null) {
  return axios({
    url: url,
    method: method,
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    data: body
  });
}

export function logout() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}