<template>
  <div class="menu">
    <router-link to="/">
      <b-button variant="dark">Home</b-button>
    </router-link>
    <router-link to="/paid">
      <b-button variant="dark">Paid</b-button>
    </router-link>
    <router-link to="/owing">
      <b-button variant="dark">Owing</b-button>
    </router-link> 
    <router-link to="/vanquished">
      <b-button variant="dark">Vanquished</b-button>
    </router-link> 
      <b-button variant="dark" v-b-modal.modal-center>Register</b-button>

      <div>
        <b-modal id="modal-center" centered title="BootstrapVue">
          <p class="my-4">Vertically centered modal!</p>
        </b-modal>
      </div>
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
a {
  width: 2.5rem;
}
.btn {
  width: 7rem;
  margin: 0.5rem;
}
</style>
