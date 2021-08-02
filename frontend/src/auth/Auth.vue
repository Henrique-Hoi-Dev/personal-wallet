<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div class="nome">
        <img src="../assets/personal.svg" alt="personal" />
      </div>

      <div class="logo">
        <img src="../assets/imagemLogo.png" alt="logo" />
      </div>
      <div class="register">
        <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>

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

        <button v-if="showSignup" @click="signup">Registrar</button>
        <button v-else @click="signin">Login</button>

        <a href @click.prevent="showSignup = !showSignup">
          <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
          <span v-else>Não tem cadastro? Registre-se aqui!</span>
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

<style lang="scss">
.auth-content {
  height: 100%;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}

.auth-modal {
  background: #292929;
  color: #d2d2d2;
  padding: 35px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background: linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
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
  border-radius: 0.5rem;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: stretch;
  background-color: #2460ae;
  color: #d2d2d2;
  padding: 5px 15px;
  border-radius: 0.5rem;
  transition: 0.5s;
}

.auth-modal button:hover {
  opacity: 80%;
}

.auth-modal a {
  margin-top: 35px;
  width: 10rem;
  color: #d2d2d2;
  transition: 0.5s;

  &:hover {
    text-decoration: none;
    color: #d2d2d2;
    opacity: 70%;
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
