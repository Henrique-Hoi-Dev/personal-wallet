<template>
  <div class="edit">
    <div >
        <h2>Name</h2>
        <input type="text" v-model="id" >
        <h2>Valor</h2>
        <!-- <input type="hidden" v-model="name" > -->
        <h2>Date</h2>
        <!-- <input type="hidden" v-model="valor" > -->
      </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import { baseApiUrl } from '@/global';

export default {
  props: ['name', 'id'],
  // data() {
  //   return {
  //     account: {}
  //   }
  // },
  // beforeMount() {
  //   this.getUrl();
  // },
  // methods: {
  //   getUrl() {
  //     const id = this.$route.params.id;

  //     const url = `${baseApiUrl}/account/${id}`
  //       axios.get(url).then(res => {
  //         this.account[0] = res.data
  //         console.log(this.account[0])
  //     })  
  //   } 
  // }
}
</script>

<style scoped>
.edit {
  margin-top: 14rem;
  color: aliceblue;
}
</style>
