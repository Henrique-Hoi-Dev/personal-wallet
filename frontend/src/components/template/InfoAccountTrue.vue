<template>
  <div class="home">
    <div class="title">
      <h1>Paid</h1>
    </div>

    <div v-for="cont in account" :key="cont.id">
      <table class="table-conta" v-if="cont.pago == true">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Date expired</th>
            <th>Portion</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ cont.name }}</td>
            <td>{{ cont.valor | currencyFormat }}</td>
            <td>{{ cont.data_vencimento | dateFormat }}</td>
            <td>{{ cont.parcelas }}</td>
            <td class="paid" v-if="cont.pago == true">Paid</td>
          </tr>
        </tbody>
        <div class="buttons">
          <router-link :to="`/edit/${cont.id}/${cont.name}`">
            <button class="editar">To edit</button>
          </router-link>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import mixinFilter from "@/plugins/mixinFilter";

export default {
  mixins: [mixinFilter],
  data() {
    return {
      account: {}
    };
  },
  beforeMount() {
    this.getAccount();
  },
  methods: {
    reset() {
      this.account = {};
      this.getAccount();
    },
    getAccount() {
      const url = `${baseApiUrl}/account`;
      axios.get(url).then(res => {
        this.account = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 18rem 0 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons {
  display: flex;
  flex-direction: row;

  button {
    width: 5rem;
    height: 1.8rem;

    border-radius: 0.2rem;
    margin-top: 1rem;

    color: #d2d2d2;
    background-color: #49274a;

    transition: 0.5s;

    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }
}
.owing {
  background: #bf0603;
}
.paid {
  background: #80b918;
}
.title {
  width: 17rem;
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
    min-width: 10rem;
    border: 0.2rem solid #4717f6;
    border-radius: 0.5rem;
    padding: 0.7rem;
    text-align: center;
  }
  th {
    padding: 0.8rem;
  }
}
</style>
