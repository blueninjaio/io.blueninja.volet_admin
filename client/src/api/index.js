import { url } from "../config/index";

const get = async route => {
  let token = localStorage.getItem("user_token");

  let response = await fetch(`${url}${route}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
};

const post = async (route, body) => {
  let token = localStorage.getItem("user_token");

  let response = await fetch(`${url}${route}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return await response.json();
};

export default {
  getAdminInfo: async () => {
    return get("/admin/me");
  },
  getUsers: async () => {
    return get("/users");
  },
  adminLogin: async (email, password) => {
    return post("/admin/login", { email, password });
  }
};
