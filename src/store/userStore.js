import axios from "axios";
const state = {
  users: [],
  total: 0,
  total_pages: 0,
  page: 1,
};

const mutations = {
  SET_ALL_USERS(state, res) {
    state.users = res.data?.data;
    state.total = res.total;
    state.total_pages = res.total_pages;
    state.page = res.page;
  },
};

const getters = {
  getAllUser(state) {
    return state.users;
  },
};

const actions = {
  getAllUser(context, { page, per_page }) {
    // debugger;
    axios
      .get("https://reqres.in/api/users?page=" + page + "&per_page=" + per_page)
      .then((res) => {
        context.commit("SET_ALL_USERS", res);
      });
  },
  createUser(context, user) {
    axios.post("https://reqres.in/api/register", user).then((res) => {
      return res;
    });
  },
  deleteUser(context, id) {
    axios.delete("https://reqres.in/api/delete/" + id).then((res) => {
      return res;
    });
  },
  editUser(context, id) {
    axios.put("https://reqres.in/api/users/" + id).then((res) => {
      return res;
    });
  },
};
export default {
  state,
  mutations,
  getters,
  actions,
};
