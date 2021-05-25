<template>
  <div class="home" >
    <h2>Paid</h2>
      <div v-for="cont in account" :key="cont.id">
        <table class="table-conta" v-if="cont.pago == true">
          <thead>
            <tr>
              <th>Name</th>    
              <th>Value</th>        
              <th>Date</th>        
              <th>Paid/Owing</th>        
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ cont.name }}</td>
              <td>{{ cont.valor }}</td>
              <td>{{ cont.data_vencimento }}</td>
              <td class="paid" v-if="cont.pago == true" >Paid</td>
            </tr>            
          </tbody>
            <div class="buttons">
                <router-link :to="`/edit/${cont.id}/${cont.name}`">
                  <button class="editar">To edit</button>               
                </router-link>      
              <button class="remover" type="button" @click="remove()">Remove</button>  
            </div> 
        </table>   
      </div>
    </div>  
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/global'

export default {
  data() {
    return {
      account: {},
    }
  },
  beforeMount() {
    this.getAccount();
  },
  methods: {
    reset() {
      this.account = {}
      this.getAccount()
    },
    getAccount() {
      const url = `${baseApiUrl}/account` 
        axios.get(url).then(res => {
        this.account = res.data
      })
    },
    remove() {
      const id = this.account[0].id
        axios.delete(`${baseApiUrl}/account/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
      })
      .catch(showError)
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 14rem;
  display: flex;
  justify-content: center;
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
.paid {
  background: #80b918; 
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
td,th {
  border-top: 0.1rem solid #e8e8e8;
  border-bottom: 0.1rem solid #e8e8e8;
  border-radius: 0.5rem;
  padding: 0.7rem;
  text-align: center;
}
</style>

