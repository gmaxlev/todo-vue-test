<template>
  <button :disabled="disabled" class="button-delete" @click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="500px" height="500px">
      <path
        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "VButtonDelete",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button-delete {
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  &:hover {
    &:not(&:disabled) {
      svg {
        fill: red;
      }
    }
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #000;
    transition: fill var(--transition-time);
  }
}
</style>
