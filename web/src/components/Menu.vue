<template>
  <div class="menu">
    <router-link to="/">
      <button>Todos</button>
    </router-link>
    <router-link to="/paid">
      <button>Pagos</button>
    </router-link>
    <router-link to="/owing">
      <button>Devedor</button>
    </router-link>
    <router-link to="/vanquished">
      <button>Vencidas</button>
    </router-link>
    <!-- Modal que sera feito o cadastro da novas contas -->
    <div>
      <b-button class="new-account" v-b-modal.modal-prevent-closing>Nova dívida</b-button>

      <b-modal id="modal-prevent-closing" ref="modal" title="New account registration">
        <form ref="form">
          <b-form-group label-for="name-input" invalid-feedback="Name is required">
            <label>Name</label>
            <b-form-input
              id="name-input"
              v-model="account.name"
              placeholder="Name account"
              required
              max="30"
            >
            </b-form-input>
            <label>Value</label>
            <b-form-input
              id="valor-input"
              v-model="account.valor"
              placeholder="000.000,00"
              required
              v-money="money"
            >
            </b-form-input>
            <label>Date vanquished</label>
            <b-form-input id="data-input" v-model="account.data_vencimento" type="date" required>
            </b-form-input>
            <label>Number of installments</label>
            <b-form-select v-model="account.parcelas" :options="options"> </b-form-select>
          </b-form-group>
        </form>
        <button @click="saves()">Save</button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";

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

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 17rem;
  width: 8rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  display: flex;
  flex-direction: column;

  background: #4717f6;
}
label {
  margin: 0.5rem;
  font-weight: bold;
  font: 1.1rem Itim;
}
a {
  width: 2.5rem;
}
button {
  width: 7rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.3rem;
  font-weight: bold;
  font-size: 15px;

  color: #d2d2d2;
  background-color: #49274a;

  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
.new-account {
  background: #33cc95 !important;
  border: none !important;
  color: #333 !important;
  transition: 0.5s;
}
.form-control {
  font-weight: 450 !important;
}
.custom-control-label::before,
.custom-file-label,
.custom-select {
  font-weight: 450 !important;
}
</style>
