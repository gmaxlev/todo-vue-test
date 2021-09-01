export const ConfirmDialogPlugin = {
  /**
   * This plugin is used for confirm and decline some actions
   * After call $confirm method, a modal window will be shown
   * and user will be able to confirm some action
   */

  install(Vue) {
    /**
     * Example of params
     * {
        text: "Do you really want to do it?",
        buttons: {
          yes: {
            text: "Yes",
            callBack: () => someFunction(),
          },
          no: {
            text: "No",
            callBack: null,
          },
        },
      }
     * @param params
     */
    Vue.prototype.$confirm = function (params) {
      Vue.prototype.$confirm.$events.$emit("show", params);
    };

    Vue.prototype.$confirm.$events = new Vue();
  },
};
