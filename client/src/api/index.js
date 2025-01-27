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
  },
  getMerchants: async () => {
    return get("/merchants");
  },
  getBusiness: async () => {
    return get("/business");
  },
  getBusinessTypes: async () => {
    return get("/business_type");
  },
  getTransactions: async type => {
    return get(`/transaction/${type}`);
  },
  getFeedbacks: async () => {
    return get("/feedback");
  },
  postBusinessTypes: async (name, description) => {
    return post("/business_type", { name, description });
  },
  getBusinessCategory: async () => {
    return get("/business_category");
  },
  postBusinessCategory: async (name, description) => {
    return post("/business_category", { name, description });
  },
  getVouchers: async () => {
    return get("/vouchers");
  },
  postVouchers: async (code, name, description, amount, quantity, expiry) => {
    return post("/vouchers", { code, name, description, amount, quantity, expiry });
  },
  getStatic: async () => {
    return get("/static");
  },
  postPolicy: async policy => {
    return post("/static/policies", { policy });
  },
  postFAQ: async faq => {
    return post("/static/faq", { faq });
  },
  postBankToggle: async (_id, isActive) => {
    return post("/bank/toggle", { _id, isActive });
  },
  postBusinessApprove: async _id => {
    return post("/business/approve", { _id });
  },
  postBusinessDecline: async _id => {
    return post("/business/decline", { _id });
  },
    postAgentApprove: async _id => {
        return post("/users/agent/approve", { _id });
    },
    postAgentDecline: async _id => {
        return post("/users/agent/decline", { _id });
    }
};
