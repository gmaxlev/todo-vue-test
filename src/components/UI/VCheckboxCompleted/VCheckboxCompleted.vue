<template>
  <label class="checkbox" :class="{ checkbox_disabled: disabled, 'checkbox_read-only': readOnly }">
    <input
      type="checkbox"
      class="checkbox__input"
      :checked="value"
      :disabled="disabled || readOnly"
      @change="$emit('input', !value)"
    />
    <span class="checkbox__mark"></span>
  </label>
</template>

<script>
export default {
  name: "VCheckboxCompleted",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      default: false,
    },
    readOnly: {
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-flex;
  cursor: pointer;
  &_disabled {
    cursor: default;
    opacity: 0.5;
  }
  &_read-only {
    cursor: default;
  }
}
.checkbox__input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  &:checked ~ .checkbox__mark {
    border-color: var(--color-main);
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
}
.checkbox__mark {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid var(--color-main);
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-time);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='12' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.332 7.275l6.305-6.62.724.69-7.029 7.38-3.695-3.88.724-.69 2.971 3.12z' fill='rgb(0,183,255)' /%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    transition: transform var(--transition-time), opacity var(--transition-time);
    transform: scale(0.6);
    opacity: 0;
  }
}
</style>
