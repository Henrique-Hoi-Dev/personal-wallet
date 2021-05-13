<template>
  <div class="home">
    <div v-for="account in accounts" :key="account.id" >
      <table>
        <thead>
          <tr>
            <th>Nome</th>    
            <th>Valor</th>        
            <th>Data</th>        
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ account.name }}</td>
            <td>{{ account.valor }}</td>
            <td>{{ account.data }}</td>
          </tr>            
        </tbody>
      </table>        
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      accounts: {},
      baseUrl: process.env.BASE_URL,      
    }
  },
  beforeMount() {
    this.getContas();
  },
  methods: { 
    async getContas() {
      const res = await fetch('http://localhost:3333/account');
      const accounts = await res.json();
      this.accounts = accounts;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
table {
  color: #d2d2d2;
  margin-top: 0.1rem;
  width: 30rem;
  border-radius: 0.8rem;
  background: #292929;
  border: 1px solid #333;
  margin-bottom: 2rem;
  padding: 1rem;
  font: 1.1rem Itim;
} 
table tr {
  margin-bottom: 0.625em;
  border-bottom: 0.1rem solid #e8e8e8;
}
table td {
  border-top: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  border-radius: 0.5rem;
}
td,th {
  border-top: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  border-radius: 0.5rem;
  padding: 0.7rem;
  text-align: center;
}
</style>


