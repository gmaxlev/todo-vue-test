<template>
  <div
    class="alert"
    :class="{
      alert_error: type === 'error',
      alert_success: type === 'success',
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "VAlert",
  props: {
    type: {
      type: String,
      default: "error",
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  margin: 20px 0;
  color: #fff;
  padding: 20px;
  border-radius: var(--border-radius);
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &_error {
    background-color: var(--color-danger);
  }
  &_success {
    background-color: #2fa955;
  }
}
</style>
