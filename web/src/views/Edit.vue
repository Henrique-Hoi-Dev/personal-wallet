<template>
  <div class="edit">
    <div class="table-edit">
      <div class="primeiros">
        <h2>Nome</h2>
        <b-form-input type="text" v-model="account.name" />

        <h2>Valor</h2>
        <b-form-input type="text" v-model="account.valor" />
      </div>
      <div class="segundo">
        <h2>Número de parcelas</h2>
        <b-form-select type="text" v-model="account.parcelas" :options="options" />

        <h2>Data de vencimento</h2>
        <b-form-input type="date" v-model="account.data_vencimento" />
        <h4>{{ account.data_vencimento | dateFormat }} Data de vencimento</h4>
      </div>
      <div class="pago">
        <h2>Pago ou Devedor</h2>
        <b-form-checkbox :style="stylePago" id="checkbox-1" class="checkbox" v-model="account.pago">
          Pago / Devendo
        </b-form-checkbox>
      </div>

      <div class="buttons">
        <b-button variant="success" @click="save()">Salvar</b-button>
        <b-button variant="danger" @click="deleteAccount(), $router.push('/')">Apagar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import mixinFilter from "@/plugins/mixinFilter";

export default {
  mixins: [mixinFilter],
  data() {
    return {
      account: {},
      options: [
        { value: "0x", text: "0 Parcelas" },
        { value: "1x", text: "1 Parcelas" },
        { value: "2x", text: "2 Parcelas" },
        { value: "3x", text: "3 Parcelas" },
        { value: "4x", text: "4 Parcelas" },
        { value: "5x", text: "5 Parcelas" },
        { value: "6x", text: "6 Parcelas" },
        { value: "7x", text: "7 Parcelas" },
        { value: "8x", text: "8 Parcelas" },
        { value: "9x", text: "9 Parcelas" },
        { value: "10x", text: "10 Parcelas" },
        { value: "11x", text: "11 Parcelas" },
        { value: "12x", text: "12 Parcelas" }
      ]
    };
  },
  beforeMount() {
    this.getUrl();
  },
  computed: {
    stylePago() {
      if (!this.account.pago) {
        return "background: " + (this.account.pago == true || "#bf0603");
      } else {
        return "background: " + (this.account.pago == false || "#80b918");
      }
    }
  },

  methods: {
    reset() {
      this.account = {};
    },
    save() {
      const id = this.$route.params.id;

      axios
        .put(`${baseApiUrl}/account/${id}`, this.account)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.$router.go();
        })
        .catch(showError);
    },
    deleteAccount() {
      const id = this.$route.params.id;
      axios
        .delete(`${baseApiUrl}/account/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    getUrl() {
      const id = this.$route.params.id;

      const url = `${baseApiUrl}/account/${id}`;
      axios.get(url).then(res => {
        this.account = res.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.edit {
  display: flex;
  justify-content: center;
  margin-top: 15rem;
}

.table-edit {
  color: #d2d2d2;

  padding: 1.2rem;
  border-radius: 0.5rem;
  background: #292929;

  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 2fr 1fr;
  grid-template-areas:
    "primeiros segundo"
    "primeiros  segundo"
    "pago pago"
    "buttons buttons";

  .primeiros {
    grid-area: primeiros;
    padding: 1rem;
    h2 {
      margin-top: 4px;
      font: 1.1rem Itim;
    }
  }

  .segundo {
    grid-area: segundo;
    padding: 1rem;
    h2 {
      margin-top: 4px;
      font: 1.1rem Itim;
    }
    h4 {
      font: 1rem Itim;
    }
  }
  .pago {
    grid-area: pago;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font: 1.1rem Itim;
    }
    .checkbox {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 3rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button {
      width: 10rem;
      margin-left: 15px;

      transition: 0.5s;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }

    a {
      text-decoration: none;
      color: #d2d2d2;
    }
    h2 {
      font: 1.1rem Itim;
    }
  }
}
</style>
