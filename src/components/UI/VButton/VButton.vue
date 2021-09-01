<template>
  <button
    class="button"
    :class="{
      button_default: theme === 'default',
      button_text: theme === 'text',
      button_danger: theme === 'danger',
      button_small: size === 'default',
      button_small: size === 'small',
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    theme: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
}
.button_default {
  background-color: var(--color-main);
  border: 0;
  padding: 10px 20px;
  color: #fff;
  transition: background-color var(--transition-time);
  border-radius: var(--border-radius);
  &:hover {
    &:not(&:disabled) {
      background-color: var(--color-main---hover);
    }
  }
  &:disabled {
    opacity: 0.5;
  }
}
.button_text {
  border: 0;
  padding: 10px 20px;
  background-color: transparent;
  color: var(--color-main);
  transition: color var(--transition-time);
  border-radius: var(--border-radius);
  &:hover {
    &:not(&:disabled) {
      color: var(--color-main---hover);
    }
  }
  &:disabled {
    opacity: 0.5;
  }
}

.button_danger {
  border: 0;
  padding: 10px 20px;
  background-color: var(--color-danger);
  color: var(--color-danger-text);
  transition: background-color var(--transition-time);
  border-radius: var(--border-radius);
  &:hover {
    &:not(&:disabled) {
      background-color: var(--color-danger---hover);
    }
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
