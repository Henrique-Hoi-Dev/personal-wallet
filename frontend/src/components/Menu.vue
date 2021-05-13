<template>
  <div class="menu">
    <h2>Menu</h2>
    <router-link to="/accountRegistration">Registration</router-link> --
    <router-link to="/">home</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;

  color: #d2d2d2;
  background: linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
}

</style>
