<template>
  <div class="progress">Loading...</div>
</template>

<script>
export default {
  name: "VProgress",
};
</script>

<style lang="scss" scoped>
.progress {
  color: var(--color-main);
  text-align: center;
  font-weight: 500;
  margin: 20px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
