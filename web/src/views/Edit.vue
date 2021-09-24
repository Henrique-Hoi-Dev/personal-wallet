<template>
  <div class="edit">
    <div class="table-edit">
      <div class="primeiros">
        <h2>Nome</h2>
        <b-form-input type="text" v-model="account.name" />
        <h2>Status</h2>
        <b-form-select v-model="account.status" :options="options" ></b-form-select>
      </div>
      <div class="segundo">
        <h2>Data de vencimento</h2>
        <b-form-input type="date" v-model="account.data_vencimento" />
        <h4>{{ account.data_vencimento | dateFormat }} Data de vencimento</h4>
        <div class="infoParcelas">
          <b-form-input class="numeroParcela" type="number" v-model="numeroParcela.length"/>
          <b-dropdown variant="info" text="Info Parcelas">
            <b-dropdown-item>
              <router-link :to="`/createParcela/${this.$route.params.id}`">
                Criar nova parcela
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="`/listeParcela/${account.id}`">
                Todas as parcelas
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
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
      numeroParcela: {},
      dataVencimento: {},
        options: [
          { value: 'pendente', text: 'Pendente' },
          { value: 'pago', text: 'Pago' },
          { value: 'cancelado', text: 'Cancelado' },
        ]
    };
  },
  beforeMount() {
    this.getUrl();
  },
  methods: {
    save() {
      const id = this.$route.params.id;

      axios
        .put(`${baseApiUrl}/account/${id}`, this.account)
        .then(() => {
          this.$toasted.global.defaultSuccess();
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
        this.numeroParcela = res.data.parcela;
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
.btn-group  {
  height: 38px!important;
  width: 150px!important;
  margin-top: 5px!important;
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
@media screen and (max-width: 700px) {
  .edit {
    margin-top: 9rem;
  }
  .table-edit {
    display: flex;
    flex-direction: column;  
  }
  .btn-group {
    width: 245px !important;    
  }
  .table-edit .buttons button {
    width: 7rem;
  }
}
</style>
