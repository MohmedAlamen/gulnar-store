<template>
  <nav-bar />
  <router-view />
  <footer-layout />
</template>

<script>
import NavBar from "./components/layouts/navBar.vue";
import footerLayout from "./components/layouts/footerLayout.vue";

export default {
  name: "App",
  components: {
    NavBar,
    footerLayout,
  },
};
</script>

<style lang="scss">
@import "~@/../mdb/scss/index.free.scss";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
