<template>
  <div class="wrapper">
    <the-modal-window-confirm />
    <header class="header"><div class="container">Todo</div></header>

    <router-view />

    <div class="container">
      <footer class="footer">
        <a target="_blank" href="https://github.com/gmaxlev/todo-vue-test">GitHub</a>
      </footer>
    </div>
  </div>
</template>

<script>
import "normalize.css";
import TheModalWindowConfirm from "./components/TheModalWindowConfirm/TheModalWindowConfirm.vue";

export default {
  components: { TheModalWindowConfirm },
};
</script>

<style lang="scss">
@import "./assets/styles/shared";
</style>

<style lang="scss" scoped>
.header {
  color: var(--color-main);
  text-align: center;
  font-size: 3rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1rem;
}
.footer {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid var(--border-color);
  padding: 20px 0;
}
</style>
