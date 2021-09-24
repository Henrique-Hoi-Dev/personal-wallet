<template>
  <div class="header">
    <span v-b-toggle.sidebar-no-header>
      <img src="../assets/sidebar.jpg" alt="sidebar">
    </span>
    <b-sidebar id="sidebar-no-header"  aria-labelledby="sidebar-no-header-title"  shadow>
      <template #default="{}">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <router-link to="/">
                <button>DashBoard</button>
              </router-link>
              <router-link to="/accountTotal">
                <button>Todos</button>
              </router-link>
              <router-link to="/paid">
                <button>Pagos</button>c
              </router-link>
              <router-link to="/owing">
                <button>Pendentes</button>
              </router-link>
              <router-link to="/canceladas">
                <button>Cancelados</button>
              </router-link>
              <router-link to="/vanquished">
                <button>Vencidas</button>
              </router-link>

              <div>
                <b-button class="new-account" v-b-modal.modal-prevent-closing>Nova dívida</b-button>
              </div>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>

    <div class="avatar" v-for="use in user.user" :key="use.id">
      <b-navbar-nav>
        <b-nav-item-dropdown right>
          <template #button-content>
              <b-avatar 
                badge 
                badge-offset="-0.3em" 
                badge-variant="success" 
                :src="use.avatar.url" 
                size="3rem" 
                v-if="use.avatar" />
              <b-avatar  size="3rem" v-else />
          </template >
            <b-dropdown-item >
              <div class="profile-b" v-for="user1 in user.user" :key="user1.id">
                <router-link :to="`/profile/${user1.id}/${user1.name}`">
                  Meu perfil
                </router-link>
              </div>
            </b-dropdown-item>
            <b-dropdown-item >
              <div class="profile-b">
                <a href @click.prevent="logout">
                  Sair...
                </a>
              </div>
            </b-dropdown-item>
        </b-nav-item-dropdown>
        <div class="infoUser" >
          <h2>{{ use.name }}</h2>
          <h4>CPF: {{ use.cpf | vueBrazil("cpf") }}</h4>
          <h4 v-for="data in user.data" :key="data.id">
            Data de nascimento: {{ use.data_nascimento | dateFormat }} = Idade {{ data }}
          </h4>
        </div>
      </b-navbar-nav>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
import mixinFilter from "@/plugins/mixinFilter";

export default {
  mixins: [mixinFilter],
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
    getUser() {
      const url = `${baseApiUrl}/user`;
      axios.get(url).then(res => {
        this.user = res.data;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 5rem;

  padding: 1rem;
  color: #d2d2d2;
  background: #4717f6;

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  span img{
    width: 40px;
    height: 40px;
    display: none;
  }
}
button {
  width: 7rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.3rem;
  font-weight: bold;
  font-size: 15px;

  color: #d2d2d2;
  background-color: #49274a;

  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
  .navbar-nav {
    flex-direction: row-reverse;
    margin-top: -13px;
  }
  .infoUser {
    margin-right: 40px;
    h2 {
      margin-left: 1rem;
      font-size: 20px;
    }
    h4 {
      margin-left: 1rem;
      font-size: 13px;
    }
  }
.avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .b-avatar {
    border: 2px solid #a1ff0a !important;
  }
}
.buttons {
  background-color: transparent!important;
}
.profile-b {
  font: 1.1rem Itim;
  text-decoration: none;
  background: transparent!important;
    
    a {
      font: 1.1rem Itim;
      text-decoration: none;
    }
    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
      
   }
}
.new-account {
  background: #33cc95 !important;
  border: none !important;
  color: #333 !important;
  transition: 0.5s;
}
.form-control {
  font-weight: 450 !important;
}
.custom-control-label::before,
.custom-file-label,
.custom-select {
  font-weight: 450 !important;
}
@media screen and (max-width: 700px) {
  .header {
    span img {
      width: 40px;
      height: 40px;
      display: flex;
    }
  }
  .infoUser {
    margin-right: 25px;
    h4 {
      font-size: 10px;
    }
  }    
}
</style>
