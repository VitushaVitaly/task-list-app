import axios from "axios";

const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
const BASE_URL_PARAMS = {developer: "Vitaly"};

function request(performRequest, method, params = {}, data = {}) {
  const urlParams = new URLSearchParams(params);
  for (const key in BASE_URL_PARAMS)
    urlParams.append(key, BASE_URL_PARAMS[key]);

  const bodyData = new FormData();
  for (const key in data)
    bodyData.append(key, data[key]);

  return performRequest(`${BASE_URL}${method}?${urlParams}`, bodyData);
}

const get = (method, params = {}) => request(axios.get, method, params);
const post = (method, params = {}, data = {}) => request(axios.post, method, params, data);

export const getList = (sort_field, sort_direction, page) => get('/', {sort_field, sort_direction, page});

export const postLogin = (username, password) => post('/login', {}, {username, password});
export const postEdit = (id, token, status, text) => post(`/edit/${id}`, {}, {token, status, text});
export const postCreate = (username, email, text) => post('/create', {}, {username, email, text});