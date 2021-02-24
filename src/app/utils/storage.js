import jwtDecode from 'jwt-decode';

const TOKEN_KEY = "auth-token";

const GET_TOKEN = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const SET_TOKEN = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const REMOVE_TOKEN = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const GET_AND_DECODE_TOKEN = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    return jwtDecode(token);
  } catch { }
};

export default {
  GET_TOKEN,
  SET_TOKEN,
  REMOVE_TOKEN,
  GET_AND_DECODE_TOKEN
};