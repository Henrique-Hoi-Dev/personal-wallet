<template>
  <div class="home">
    <div class="title">
      <h1>Todas as Parcelas</h1>
    </div>

    <div class="resul-total" >
      <div class="totalValorParcela">
        <h5>Valor total da divida</h5>
         <span>
          {{ total | currencyFormat }}
        </span>
      </div>
      
      <div class="totalNumeroParcela">
        <h5>Quantidade de parcelas</h5>
          <span>
            N: {{ numeroParcela }}
          </span>
      </div>
    </div>

    <div v-for="cont in parcelas.rows" :key="cont.id">
      <table class="table-conta">
        <thead>
          <tr>
            <th>Valor</th>
            <th>Data Venci...</th>
            <th>N parcela</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ cont.valor | currencyFormat }}</td>
            <td>{{ cont.data_vencimento | dateFormat }}</td>
            <td>{{ cont.numero_parcela }}</td>
            <td v-if="cont.pago == true" class="paid">Pago</td>
            <td v-if="cont.pago == false" class="owing">Pendente</td>
            <td class="editar-button">
              <router-link :to="`/editarParcela/${cont.id}`">
                <button>
                   <b-icon 
                    icon="pencil-fill" 
                    class="rounded bg-primary p-2" 
                    font-scale="2" 
                    style="color: #36c356;" >
                    </b-icon>
                </button>
               
              </router-link>
            </td>
            <td class="apagar-button">
              <button @click="deleteAccount(cont.id)">
                <b-icon 
                  icon="trash-fill"
                  class="rounded bg-primary p-2" 
                  font-scale="2" 
                  variant="danger" >
                  </b-icon>
              </button> 
            </td>
          </tr>
        </tbody>
      </table>
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
      parcelas: {},
      total: {},
      numeroParcela: {}
    };
  },
  beforeMount() {
    this.getAccount();
  },
  methods: {
    reset() {
      this.parcelas = {};
      this.getAccount();
    },
    getAccount() {
      const id = this.$route.params.id;

      const url = `${baseApiUrl}/portions/${id}`;
      axios.get(url).then(res => {
        this.parcelas = res.data.portion;
        this.total = res.data.total
        this.numeroParcela = res.data.portion.count
      });
    },
    deleteAccount(id) {
      axios
        .delete(`${baseApiUrl}/portion/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 10rem 0 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.resul-total{
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #d2d2d2;
  margin-top: 0.1rem;
  /* width: 20rem; */
  padding: 0.8rem;
  border-radius: 0.6rem;
  background: #161a1d;
  margin-bottom: 1rem;
  font: 1.1rem Itim;
  border-collapse: inherit;
  box-shadow: -9px 12px 12px 5px #333;

  .totalValorParcela {
    display: flex;
    flex-direction: column;
  }

  .totalNumeroParcela {
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin: 10px;
    padding: 5px;

    /* border-bottom: 2px solid #4717f6;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem; */
  }
  span {
    margin: 10px;
    padding: 0.5rem;
    text-align: center;

    border: 0.2rem solid #4717f6;
    border-radius: 0.9rem;
  }
}
.owing {
  background: #bf0603;
}
.paid {
  background: #80b918;
}
.title {
  width: 20rem;
  text-align: center;

  border-bottom: 5px solid #4717f6;

  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;

  margin-bottom: 3rem;
  box-shadow: -4px 9px 4px 6px #333;

  h1 {
    color: #a5adff;
  }
}

.table-conta {
  color: #d2d2d2;
  margin-top: 0.1rem;
  width: 32rem;
  padding: 0.8rem;
  border-radius: 0.6rem;
  background: #161a1d;
  margin-bottom: 1rem;
  font: 1.1rem Itim;
  border-collapse: inherit;
  box-shadow: -9px 12px 12px 5px #333;

  td {
    min-width: 7rem;
    border: 0.2rem solid #4717f6;
    border-radius: 0.9rem;
    padding: 0.2rem;
    text-align: center;
  }
  th {
    padding: 0.3rem;
    text-align: center;
  }
  .editar-button {
    min-width: 3rem;
    border: none;

    button {
      border: none;
      border-radius: 0.35rem !important;
      transition: 0.5s;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }
  }
  .apagar-button {
    min-width: 2rem;
    border: none;

    button {
      border: none;
      border-radius: 0.35rem !important;
      transition: 0.5s;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .home {
    margin: 7rem 0 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .resul-total {
      max-width: 25rem;
    }
  .table-conta {
    display: flex;
    max-width: 22rem;
    justify-content: center;

    th {
      display: flex;
      flex-direction: column;
      margin-top: 2px;
    }
    td {
      display: flex;
      flex-direction: column;
    }
    .editar-button {
      margin-top: 10px;
      button {
        background-color: #007bff;
        width: 10rem;
      }
    }
    .apagar-button {
        button {
          background-color: #007bff;
          width: 10rem;
        }
      }
  
  }
}
</style>
