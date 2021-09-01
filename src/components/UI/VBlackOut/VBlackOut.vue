<template>
  <transition name="blackout">
    <div v-if="show" class="blackout" @click="$emit('click')"></div>
  </transition>
</template>

<script>
export default {
  name: "VBlackout",
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.blackout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000;
  background-color: black;
  opacity: 0.15;
  user-select: none;
}
@keyframes blackout-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.15;
  }
}
.blackout-enter-active {
  animation: blackout-show var(--transition-time);
}
.blackout-leave-active {
  animation: blackout-show var(--transition-time) reverse;
}
</style>
