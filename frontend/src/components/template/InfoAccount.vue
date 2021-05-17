<template>
  <div class="home">
       <h2>Contas Pagas</h2>
    <div v-for="account in accounts" :key="account.id" >
      <table class="table-conta">
        <thead>
          <tr>
            <th>Nome</th>    
            <th>Valor</th>        
            <th>Data</th>        
            <th>Pago/Devendo</th>        
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ account.name }}</td>
            <td>{{ account.valor }}</td>
            <td>{{ account.data }}</td>
            <td class="pago-devendo">Pago</td>
          </tr>            
        </tbody>
          <div class="buttons">
            <button class="pagar" type="button">Pagar</button>        
            <button class="editar" type="button">Editar</button>    
            <button class="remover" type="button">Remover</button>  
          </div>    
      </table>   
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accounts: [],
      baseUrl: process.env.BASE_URL,      
    }
  },
  beforeMount() {
    this.getContas();
  },
  methods: { 
    getContas() {
      const url = 'http://localhost:3333/account'
      axios.get(url).then(res => {
        this.accounts = res.data
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 16rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.pago-devendo {
  background: #80b918; 
}
.buttons {
  display: flex;
  flex-direction: row;
}
.editar {
  background: #1780a1;
}
.pagar {
  background: #80b918; 
}
.remover {
  background: #bf0603; 
}
h2 {
  color: #d2d2d2;
  margin-bottom: 1rem;
}
button {
  width: 5rem;
  height: 1.5rem;
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

