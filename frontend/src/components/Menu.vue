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
      <!-- Modal que sera feito o cadastro da novas contas -->
      <div>
      <b-button variant="dark" v-b-modal.modal-prevent-closing>Register</b-button>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="New account registration"
      >
        <form ref="form" >
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="account.name"
              placeholder="Name account"
              required
              max="30">
            </b-form-input>
            Value
            <b-form-input
              id="valor-input"
              v-model="account.valor"
              placeholder="000.000,00"
              required
              >
            </b-form-input>
            Date vanquished
            <b-form-input 
              id="data-input"
              v-model="account.data_vencimento"
              type="text"
              required
              max="10"
              placeholder="99/99/9999"
              v-mask="'##/##/####'">>
            </b-form-input>          
            Number of installments
            <b-form-select 
              v-model="account.parcelas" 
              :options="options">
            </b-form-select>
          </b-form-group>
        </form>
        <b-button variant="success" @click="saves()">Save</b-button> 
      </b-modal>
    </div>
  </div>
</template>

<script>
import { showError } from '@/global'

export default {
  data() {
      return {
        account: {
          name: '',
          valor: '',
          data_vencimento: '',
          parcelas: '',
        },
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
    methods: { 
      /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
      clean() {
        this.account.name = ''
        this.account.valor = ''
        this.account.data_vencimento = ''
        this.account.parcelas = ''
		  },
      saves() { 
        this.$http.post('/account/new', this.account)
				.then(() => {
          this.clean(),
          this.account.name = ''
          this.account.valor = ''
          this.account.data_vencimento = ''
          this.account.parcelas = ''
          this.$toasted.global.defaultSuccess()
        }).catch(showError)
      }
    }
}
</script>

<style >
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
.modal-header {
  background: #292929!important;
  color: #d2d2d2;
}
.modal-body {
  background: #292929!important;
  color: #d2d2d2;
}
.modal-footer {
  display: none!important;
}
.form-control {
  font-weight: 700!important;
}
.modal-header .close {
  color: #d2d2d2;
}
.custom-control-label::before, .custom-file-label, .custom-select {
  font-weight: 700!important;
}
</style>
