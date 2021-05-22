<template>
  <div class="edit">
    <div >
      <h2>Name</h2>
      <input type="text" v-model="account.name" >
      <h2>Value</h2>
      <input type="text" v-model="account.valor" >
      <h2>Date</h2>
      <input type="text" v-model="account.data" >
      <h2>Number of installments</h2>
      <input type="text" v-model="account.parcelas" >
      <div  :style="stylePago" >
        <h2>{{ account.pago }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
  data() {
    return {
      account: {}
    }
  },
  beforeMount() {
    this.getUrl();
  },
  computed: {
    stylePago() {
      if (!this.account.pago) {
        return "background: " + (this.account.pago == true || "#bf0603" )
      } else {
        return "background: " + (this.account.pago == false || "#80b918" )
      }
    }
  },
  methods: {
    getUrl() {
      const id = this.$route.params.id;

      const url = `${baseApiUrl}/account/${id}`
        axios.get(url).then(res => {
          this.account = res.data
      })  
    } 
  }
}
</script>

<style scoped>
.edit {
  margin-top: 14rem;
  color: aliceblue;
}
</style>
