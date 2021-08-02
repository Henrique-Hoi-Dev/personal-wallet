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
      <b-button class="new-account" v-b-modal.modal-prevent-closing>New Account</b-button>

      <b-modal id="modal-prevent-closing" ref="modal" title="New account registration">
        <form ref="form">
          <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
            <b-form-input
              id="name-input"
              v-model="account.name"
              placeholder="Name account"
              required
              max="30"
            >
            </b-form-input>
            Value
            <b-form-input
              id="valor-input"
              v-model="account.valor"
              placeholder="000.000,00"
              required
              v-money="money"
            >
            </b-form-input>
            Date vanquished
            <b-form-input id="data-input" v-model="account.data_vencimento" type="date" required>
            </b-form-input>
            Number of installments
            <b-form-select v-model="account.parcelas" :options="options"> </b-form-select>
          </b-form-group>
        </form>
        <b-button variant="success" @click="saves()">Save</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import { VMoney } from "v-money";

export default {
  data() {
    return {
      account: {
        name: "",
        valor: "",
        data_vencimento: "",
        parcelas: null
      },
      options: [
        { value: null, text: "Select number of installments" },
        { value: "1x", text: "1x Installments" },
        { value: "2x", text: "2x Installments" },
        { value: "3x", text: "3x Installments" },
        { value: "4x", text: "4x Installments" },
        { value: "5x", text: "5x Installments" },
        { value: "6x", text: "6x Installments" },
        { value: "7x", text: "7x Installments" },
        { value: "8x", text: "8x Installments" },
        { value: "9x", text: "9x Installments" },
        { value: "10x", text: "10x Installments" },
        { value: "11x", text: "11x Installments" },
        { value: "12x", text: "12x Installments" }
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: " ",
        suffix: " ",
        precision: 2,
        masked: false
      }
    };
  },
  directives: { money: VMoney },
  methods: {
    /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
    clean() {
      this.account.name = "";
      this.account.valor = "";
      this.account.data_vencimento = "";
      this.account.parcelas = "";
    },
    saves() {
      axios
        .post(`${baseApiUrl}/account/new`, this.account)
        .then(() => {
          this.clean(), this.$toasted.global.defaultSuccess(), this.$router.go();
        })
        .catch(showError);
    }
  }
};
</script>

<style>
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
.new-account {
  background: #ad2831 !important;
  border: none !important;
}
.new-account:hover {
  opacity: 80%;
}
.modal-header {
  background: #292929 !important;
  color: #d2d2d2;
}
.modal-body {
  background: #292929 !important;
  color: #d2d2d2;
}
.modal-footer {
  display: none !important;
}
.form-control {
  font-weight: 700 !important;
}
.modal-header .close {
  color: #d2d2d2;
}
.custom-control-label::before,
.custom-file-label,
.custom-select {
  font-weight: 700 !important;
}
</style>
