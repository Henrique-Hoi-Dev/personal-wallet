<template>
  <div class="edit">
    <div class="table-edit">
      <div class="primeiros">
        <h2>Valor</h2>
        <b-form-input type="text" v-model="parcela.valor" />

        <h2>Numero de parcela</h2>
        <b-form-input type="text" v-model="parcela.numero_parcela" />
      </div>
      <div class="segundo">
        <h2>Data de vencimento</h2>
        <b-form-input type="date" v-model="parcela.data_vencimento" />
        <h4>{{ parcela.data_vencimento | dateFormat }} Data de vencimento</h4>
        <b-form-checkbox :style="stylePago" id="checkbox-1" class="checkbox" v-model="parcela.pago">
          Pago / Devedor
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
      parcela: {}
    };
  },
  beforeMount() {
    this.getUrl();
  },
  computed: {
    stylePago() {
      if (!this.parcela.pago) {
        return "background: " + (this.parcela.pago == true || "#bf0603");
      } else {
        return "background: " + (this.parcela.pago == false || "#80b918");
      }
    }
  },

  methods: {
    reset() {
      this.parcela = {};
    },
    save() {
      const id = this.$route.params.id;

      axios
        .put(`${baseApiUrl}/account/${id}`, this.parcela)
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
        this.parcela = res.data;
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

    .checkbox {
      width: 100%;
      height: 2.4rem;
      margin-top: 13px;
      border-radius: 0.2rem;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .custom-control-label {
      margin-top: 8px;
    }

    .numeroParcela {
      margin-top: 5px;
      margin-right: 13px;

      width: 60px;
    }
    .infoParcelas {
      display: flex;
      flex-direction: row;
      a:hover {
        text-decoration: none;
      }
    }
    h2 {
      margin-top: 4px;
      font: 1.1rem Itim;
    }
    h4 {
      font: 1rem Itim;
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
