<template>
  <div class="header">
    <div class="avatar" v-for="use in user.user" :key="use.id">
      <b-avatar variant="light" rounded="sm" :src="use.avatar.url" size="6rem" v-if="use.avatar" />
      <b-avatar variant="light" rounded="sm" size="6rem" v-else />
      <div class="infoUser">
        <h2>{{ use.name }}</h2>
        <h4>CPF: {{ use.cpf | vueBrazil("cpf") }}</h4>
        <h4 v-for="data in user.data" :key="data.id">
          Data de nascimento: {{ use.data_nascimento | dateFormat }} = Idade {{ data }}
        </h4>
      </div>
    </div>
    <div class="button-info">
      <button type="button">
        <a href @click.prevent="logout">
          Sair...
        </a>
      </button>
      <div v-for="user1 in user.user" :key="user1.id">
        <router-link :to="`/profile/${user1.id}/${user1.name}`">
          <button class="profile-b">Perfil</button>
        </router-link>
      </div>
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
      user: {}
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
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 8rem;

  padding: 1rem;
  color: #d2d2d2;
  background: #4717f6;

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .infoUser {
    h2 {
      margin-left: 1rem;
    }
    h4 {
      margin-left: 1rem;
      font-size: 17px;
    }
  }

  .b-avatar {
    border: 5px solid #a1ff0a !important;
  }
}

.button-info {
  display: flex;
  flex-direction: column;

  button {
    width: 7rem;
    height: 2.5rem;

    color: #d2d2d2;
    font: 1.1rem Itim;

    margin-top: 5px;
    border-radius: 0.5rem;

    background: brown;

    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }

    a {
      font: 1.1rem Itim;
      color: #d2d2d2;
      text-decoration: none;
    }
  }
}
.profile-b {
  background: #49274a !important;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
</style>
