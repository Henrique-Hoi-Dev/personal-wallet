<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div class="nome">
        <img src="../assets/personal.svg" alt="personal" v-if="!showSignup" />
      </div>

      <div class="logo">
        <img src="../assets/imagemLogo.png" alt="logo" />
      </div>
      <div class="register">
        <div class="auth-title">{{ showSignup ? "Register" : "Login" }}</div>

        <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome" />
        <input v-model="user.email" name="email" type="text" placeholder="E-mail" />

        <input
          v-model="user.password"
          name="password"
          @keyup.enter="signin"
          type="password"
          placeholder="Senha"
          v-if="!showSignup"
        />
        <input v-model="user.password" name="password" type="password" placeholder="Senha" v-else />

        <input
          v-if="showSignup"
          v-model="user.cpf"
          v-brazilmask="{ type: 'cpf' }"
          data-brtype="cpf"
          type="text"
          placeholder="CPF"
        />
        <h6 v-if="showSignup">Data de nascimento</h6>
        <input
          v-if="showSignup"
          v-model="user.data_nascimento"
          type="date"
          placeholder="Birth date"
        />

        <button v-if="showSignup" @click="signup">Registrar</button>
        <button v-else @click="signin">Login</button>

        <a href @click.prevent="showSignup = !showSignup">
          <span v-if="showSignup">Já tem registro? Acesse o Login!</span>
          <span v-else>Sem registro? Registre-se aqui !</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      user: {}
    };
  },
  methods: {
    signup() {
      axios
        .post(`${baseApiUrl}/users/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    signin() {
      axios
        .post(`${baseApiUrl}/users/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-content {
  width: 100%;
  height: 667px;

  display: flex;
  justify-content: center;

  background-size: 100% 100%;
  background-image: url("../assets/background.jpg");
}

.auth-modal {
  padding: 35px;
  margin-top: 4rem;

  height: fit-content;

  border-top-left-radius: 10rem;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 10rem;

  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background: rgba(19, 52, 182, 0.892);
  color: #d2d2d2;

  display: grid;
  grid-template-columns: 400px 300px;
  grid-template-rows: 1fr;
  grid-template-areas:
    "nome nome"
    "logo register";
}

.nome {
  grid-area: nome;
}

.logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #fff;
  margin-right: 35px;
}

.register {
  grid-area: register;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 0.3rem;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: stretch;
  background: #49274a !important;
  color: #d2d2d2;
  padding: 5px 15px;
  border-radius: 0.5rem;
  transition: 1s;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
.auth-modal a {
  margin-top: 35px;
  width: 10rem;
  color: #d2d2d2 !important;
  text-decoration: none !important;
  transition: 1s;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
