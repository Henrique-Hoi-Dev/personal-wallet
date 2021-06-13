<template>
  <div class="home">
    <h2>Vanquished</h2>
    <div v-for="cont in account" :key="cont.id">
      <div v-if="currentDate <= cont.data_vencimento"></div>
      <table class="table-conta" v-else>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Date expired</th>
            <th>Paid/Owing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ cont.name }}</td>
            <td>{{ cont.valor | currencyFormat }}</td>
            <td>{{ cont.data_vencimento | dateFormat }}</td>
            <td class="vanquished">Vanquished</td>
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
      currentDate: new Date().toLocaleString(),
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
  margin: 18rem 0 0 10rem;
  display: flex;

  flex-direction: column;
  align-items: center;
}
.buttons {
  display: flex;
  flex-direction: row;
}
.editar {
  background: #1780a1;
}
.vanquished {
  background: #6c757d;
}
.remover {
  margin-left: 4.5rem;
  background: #bf0603;
}
h2 {
  color: #d2d2d2;
  margin-bottom: 1rem;
}
button {
  width: 5rem;
  height: 1.8rem;
  color: #d2d2d2;

  border-radius: 0.2rem;
  margin-top: 1rem;
  margin-left: 1rem;

  &:hover {
    opacity: 90%;
    border: 2px solid #d2d2d2;
  }
}
.table-conta {
  color: #d2d2d2;
  margin-top: 0.1rem;
  width: 32rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background: #292929;
  border: 1px solid #333;
  margin-bottom: 2rem;
  font: 1.1rem Itim;
  border-collapse: inherit;
}
table tr {
  margin-bottom: 0.625em;
  border-bottom: 0.1rem solid #e8e8e8;
}
table td {
  min-width: 10rem;
  border-top: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  border-radius: 0.5rem;
}
td,
th {
  border-top: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  border-radius: 0.5rem;
  padding: 0.7rem;
  text-align: center;
}
</style>
