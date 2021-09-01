<template>
  <div>
    <v-blackOut :show="value" />
    <transition name="modal-window-toggle">
      <div v-if="value" class="modal-window">
        <transition name="modal-window-toggle">
          <div class="modal-window__window">
            <div class="modal-window__content">
              <slot />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import VBlackOut from "../VBlackOut/VBlackOut.vue";

export default {
  name: "ModalWindow",
  components: { VBlackOut },
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes modal-window-toggle {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.modal-window-toggle-enter-active {
  animation: modal-window-toggle var(--transition-time);
}
.modal-window-toggle-leave-active {
  animation: modal-window-toggle var(--transition-time) reverse;
}
@keyframes modal-window-loading-toggle {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes modal-window-loading-toggle-end {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-15px);
  }
}
.modal-window-loading-toggle-enter-active {
  animation: modal-window-loading-toggle var(--transition-time);
}
.modal-window-loading-toggle-leave-active {
  animation: modal-window-loading-toggle-end var(--transition-time);
}
.modal-window {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 6000;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
}
.modal-window__window {
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.modal-window__content {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding: var(--padding-desktop);
  justify-content: center;
  display: inline-flex;
}
.modal-window__loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6000;
  & > span {
    width: 45px;
    height: 45px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
    user-select: none;
    position: relative;
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
    & > img {
      width: 100%;
      height: 100%;
      user-select: none;
    }
  }
}
@keyframes try-close-animation {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.98);
  }
  65% {
    transform: scale(1.015);
  }
  100% {
    transform: scale(1);
  }
}
.modal-window__window_tryClose {
  animation: try-close-animation 0.3s;
  animation-iteration-count: 1;
}
</style>
