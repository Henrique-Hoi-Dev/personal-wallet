<template>
  <div class="home" >
    <h2>Paid bills</h2>
      <div v-for="cont in account" :key="cont.id">
        <table class="table-conta">
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
              <td>{{ cont.data }}</td>
              <td class="pago-devendo">Paid</td>
            </tr>            
          </tbody>
            <div class="buttons">
              <button class="pagar" type="button">Pay</button>  
                <router-link :to="`/edit/${cont.id}`">
                  <button class="editar" @click="loadUser()">To edit</button>               
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
    this.getContas();
  },
  methods: {
    reset() {
      this.account = {}
      this.getContas()
    },
    getContas() {
      const url = `${baseApiUrl}/account`
        axios.get(url).then(res => {
        this.account = res.data
      })
    },
    loadUser(account) {
      this.account[account] = { ...account }
      // console.log(this.account[0])
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

