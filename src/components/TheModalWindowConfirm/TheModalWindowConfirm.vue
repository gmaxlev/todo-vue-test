<template>
  <v-modal-window v-model="isShow">
    <div class="modal-window-confirm">
      <p class="modal-window-confirm__header">{{ confirmOptions.text }}</p>
      <div class="modal-window-confirm__variants">
        <div class="modal-window-confirm__variant">
          <v-button :disabled="isFetching" @click="applyOption('yes')">
            {{ confirmOptions.buttons.yes.text }}
          </v-button>
        </div>
        <div class="modal-window-confirm__variant">
          <v-button :disabled="isFetching" @click="applyOption('no')">
            {{ confirmOptions.buttons.no.text }}
          </v-button>
        </div>
      </div>
    </div>
  </v-modal-window>
</template>

<script>
import VModalWindow from "../UI/VModalWindow/VModalWindow.vue";
import VButton from "../UI/VButton/VButton";

export default {
  name: "TheModalWindowConfirm",
  components: {
    VModalWindow,
    VButton,
  },
  data() {
    return {
      isShow: false,
      isFetching: false,
      confirmOptions: {
        text: "",
        buttons: {
          yes: {
            text: "",
            callBack: null,
          },
          no: {
            text: "",
            callBack: null,
          },
        },
      },
    };
  },
  created() {
    /**
     * Listen events from eventbus
     */
    this.$confirm.$events.$on("show", (confirmOptions) => {
      this.isShow = true;
      this.$set(this, "confirmOptions", confirmOptions);
    });
  },
  methods: {
    /**
     * Select options
     * @param {string} option - yes / no
     */
    applyOption(option) {
      // If callback exists
      if (this.confirmOptions.buttons[option].callBack) {
        // Call callback and save result
        const callBackResult = this.confirmOptions.buttons[option].callBack();
        // If result is Promise subscribe to it and wait
        // else just close the window
        if (callBackResult instanceof Promise) {
          this.isFetching = true;
          callBackResult
            .then(() => {
              this.isShow = false;
            })
            .finally(() => {
              this.isFetching = false;
            });
        } else {
          this.isShow = false;
        }
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-window-confirm {
  background-color: #fff;
  max-width: 400px;
  width: 100%;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.modal-window-confirm__header {
  margin: 0;
  margin-bottom: 20px;
}
.modal-window-confirm__variants {
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-window-confirm__variant {
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
