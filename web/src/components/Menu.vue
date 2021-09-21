<template>
  <div class="menu">
    <router-link to="/">
      <button>Home</button>
    </router-link>
    <router-link to="/accountTotal">
      <button>Todos</button>
    </router-link>
    <router-link to="/paid">
      <button>Pagos</button>
    </router-link>
    <router-link to="/owing">
      <button>Pendente</button>
    </router-link>
    <router-link to="/vanquished">
      <button>Vencidas</button>
    </router-link>
    <!-- Modal que sera feito o cadastro da novas contas -->
    <div>
      <b-button class="new-account" v-b-modal.modal-prevent-closing>Nova dívida</b-button>

      <b-modal id="modal-prevent-closing" ref="modal" title="Registro de nova dívida">
        <form ref="form">
          <b-form-group label-for="name-input" invalid-feedback="Name is required">
            <label>Nome</label>
            <b-form-input
              id="name-input"
              v-model="account.name"
              placeholder="Nome da dívida"
              required
              max="30"
            >
            </b-form-input>
            <label>Status</label>
            <b-form-select v-model="account.status" :options="options" ></b-form-select>

            <label>Data vencimento</label>
            <b-form-input id="data-input" v-model="account.data_vencimento" type="date" required>
            </b-form-input>
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
      money: {
        decimal: ",",
        thousands: ".",
        prefix: " ",
        suffix: " ",
        precision: 2,
        masked: false
      },
      options: [
          { value: 'pendente', text: 'Pendente' },
          { value: 'pago', text: 'Pago' },
          { value: 'cancelado', text: 'Cancelado' },
        ]
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
