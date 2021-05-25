<template>
  <div class="edit">
    <div class="table-edit">
      <h2>Name</h2>
      <b-form-input type="text" v-model="account.name" />
      <h2>Value</h2>
      <b-form-input type="text" v-model="account.valor" />
      <h2>Date</h2>
      <b-form-input type="text" v-model="account.data_vencimento" />
      <h2>Number of installments</h2>
      <b-form-select type="text" v-model="account.parcelas" :options="options" />
      <h2>Pay the bill</h2>   
        <b-form-checkbox
          :style="stylePago"
          id="checkbox-1"
          class="checkbox"
          v-model="account.pago"
          name="checkbox-1">
          Pay / Owing
        </b-form-checkbox>
    </div>
      <div class="buttons">
        <b-button variant="success" @click="save()">Save</b-button>
        <b-button variant="danger" @click="deleteAccount()">Delete</b-button>       
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/global';

export default {
  data() {
    return {
      account: {},
       options: [
          { value: '0x', text: '0 Parcelas' },
          { value: '1x', text: '1 Parcelas' },
          { value: '2x', text: '2 Parcelas' },
          { value: '3x', text: '3 Parcelas' },
          { value: '4x', text: '4 Parcelas' },
          { value: '5x', text: '5 Parcelas' },
          { value: '6x', text: '6 Parcelas' },
          { value: '7x', text: '7 Parcelas' },
          { value: '8x', text: '8 Parcelas' },
          { value: '9x', text: '9 Parcelas' },
          { value: '10x', text: '10 Parcelas' },
          { value: '11x', text: '11 Parcelas' },
          { value: '12x', text: '12 Parcelas' },
        ],
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
    reset() {
      this.account = {}
    },
    save() {
      const id = this.$route.params.id

        axios.put(`${baseApiUrl}/account/${id}`, this.account)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
      })
      .catch(showError)
    },
    deleteAccount() {
      const id = this.$route.params.id
        axios.delete(`${baseApiUrl}/account/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
      })
      .catch(showError)
    },
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

<style scoped lang="scss">
.edit {
  display:  flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  margin-top: 15rem;
  color: #d2d2d2;

    .checkbox {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 3rem;
      border-radius: 0.5rem;
  }
}
.table-edit {
  width: 30rem;
  height: 30rem;

  padding: 1.5rem;
  border-radius: 1rem;
  background: #292929;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
