<template>
  <div class="edit">
    <div class="table-edit">
      <div class="volta" >
        <router-link :to="`/listeParcela/${parcelaId}`">
          <b-button class="buttonVolta" variant="warning">
            <b-icon icon="arrow-left" scale="1"></b-icon>
            Volta
          </b-button>
        </router-link>
      </div>
      <div class="primeiros">
        <h2>Valor</h2>
        <b-form-input type="text" v-model="account.valor" />

        <h2>N parcela</h2>
        <b-form-input type="text" v-model="account.numero_parcela" />
      </div>
      <div class="segundo">
        <h2>Data de vencimento</h2>
        <b-form-input type="date" v-model="account.data_vencimento" />

        <h2>{{ account.data_vencimento | dateFormat }}</h2>
        <b-form-checkbox :style="stylePago" id="checkbox-1" class="checkbox" v-model="account.pago">
          Pago / Devedor
        </b-form-checkbox>
      </div>
      <div class="buttons">
        <b-button variant="success" @click="save(), $router.push(`/listeParcela/${parcelaId}`)">Salvar</b-button>
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
      parcelaId: {}
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
        .put(`${baseApiUrl}/portion/${id}`, this.account)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          // this.$router.go();
        })
        .catch(showError);
    },
    deleteAccount() {
      const id = this.$route.params.id;
      axios
        .delete(`${baseApiUrl}/portion/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    getUrl() {
      const id = this.$route.params.id;

      const url = `${baseApiUrl}/portion/${id}`;
      axios.get(url).then(res => {
        this.account = res.data;
        this.parcelaId = res.data.accounts_id;
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
.volta {
  margin: 10px;
  position: absolute;

  .buttonVolta {
    width: 10rem;
            border-radius: 1rem;
    transition: 0.5s;
    font: 1.1rem Itim;
    text-align: center;
    margin-left: 6px;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
  }
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
    margin-top: 40px;
    h2 {
      margin-top: 4px;
      font: 1.1rem Itim;

      text-align: center;
    }
  }
  .segundo {
    grid-area: segundo;
    padding: 1rem;
    margin-top: 40px;
    h2 {
      margin-top: 3px;
      font: 1.1rem Itim;

      text-align: center;
    }
    h4 {
      font: 1rem Itim;
    }
  }
  .checkbox {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
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
