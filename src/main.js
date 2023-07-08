import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(Vuex);
// Vue.use(store);
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
