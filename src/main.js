import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ConfirmDialogPlugin } from "./plugins/confirm-dialog/confirm-dialog.plugin";

Vue.config.productionTip = false;

Vue.use(ConfirmDialogPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
