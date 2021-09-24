<template>
  <div class="profile">
    <div class="registre">
      <div class="user">
        <div class="userAvatar">
          <div
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${avatar})` }"
            @click="selectImage"
          ></div>
          <input
            class="avatar"
            accept="image/*"
            ref="file"
            type="file"
            @input="pickFile"
            @change="onSelect"
          />

          <b-button variant="success" @click="salvarUsers()">Enviar</b-button>
        </div>

        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.name" />
          <span class="input__label">Nome</span>
        </label>
        <label class="input">
          <input class="input__field" type="password" placeholder=" " v-model="user.oldPassword" />
          <span class="input__label">Senha</span>
        </label>
        <label class="input">
          <input class="input__field" type="password" placeholder=" " v-model="user.password" />
          <span class="input__label">Nova senha</span>
        </label>
      </div>

      <div class="inputs">
        <label class="input">
          <input class="input__field" type="email" placeholder=" " v-model="user.email" />
          <span class="input__label">Email</span>
        </label>
        <label class="input">
          <input
            class="input__field"
            type="text"
            placeholder=" "
            v-model="user.cpf"
            v-brazilmask="{ type: 'cpf' }"
            data-brtype="cpf"
          />
          <span class="input__label">CPF</span>
        </label>
        <label class="input">
          <input class="input__field" type="date" placeholder=" " v-model="user.data_nascimento" />
          <span class="input__label">Data de Nascimento</span>
        </label>
        <label class="input">
          <input class="input__field" type="email" placeholder=" " v-model="user.cep" />
          <span class="input__label">CEP</span>
        </label>
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.logradouro" />
          <span class="input__label">Logradouro</span>
        </label>
      </div>

      <div class="endereco">
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.complemento" />
          <span class="input__label">Complemento</span>
        </label>
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.numero" />
          <span class="input__label">Número</span>
        </label>
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.bairro" />
          <span class="input__label">Bairro</span>
        </label>
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.cidade" />
          <span class="input__label">Cidade</span>
        </label>
        <label class="input">
          <input class="input__field" type="text" placeholder=" " v-model="user.uf" />
          <span class="input__label">UF</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  data() {
    return {
      avatar: {},
      user: {
        name: "",
        email: "",
        password: "",
        oldPassword: "",
        avatar_id: "",
        cpf: "",
        cep: "",
        logradouro: "",
        cidade: "",
        bairro: "",
        uf: "",
        numero: "",
        complemento: ""
      }
    };
  },
  beforeMount() {
    this.getUrl();
  },
  methods: {
    selectImage() {
      this.$refs.file.click();
    },
    limparUser() {
      this.user;
      this.avatar;
    },
    pickFile() {
      let input = this.$refs.file;
      let file = input.files;

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.avatar = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async onSelect(event) {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      axios
        .post(`${baseApiUrl}/files`, formData)
        .then(res => {
          this.user.avatar_id = res.data.id;
        })
        .catch(showError); //
    },
    /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
    salvarUsers() {
      let id = this.$route.params.id;

      axios
        .put(`${baseApiUrl}/user/${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess(), this.$router.go();
          this.limparUser();
        })
        .catch(showError);
    },
    getUrl() {
      const id = this.$route.params.id;

      const url = `${baseApiUrl}/user/${id}`;
      axios.get(url).then(res => {
        this.user = res.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;
  margin-top: 13rem;
  margin-left: 7rem;
}
.registre {
  width: 1050px;
  justify-content: center;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "user inputs endereco"
    "user inputs endereco";
  .user {
    grid-area: user;
    padding: 1rem;
  }
  .endereco {
    grid-area: endereco;
    padding: 1rem;
  }
  .inputs {
    grid-area: inputs;
    padding: 1rem;
  }
  .userAvatar {
    display: flex;
    flex-direction: row;
    margin-top: -10px;

    justify-content: space-around;
    align-items: center;

    button {
      width: 120px;
    }
  }

  color: #d2d2d2;
  background: #292929;

  border-radius: 0.8rem;

  h2 {
    font-size: 1.5rem;
  }
  hr {
    color: #d2d2d2;
  }
}
@import url("https://rsms.me/inter/inter.css");
.input {
  position: relative;
  width: auto;
  margin-top: 12px;

  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
    margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5);
    background: pink;
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    background: #292929;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }
  &__field {
    box-sizing: border-box;
    display: block;
    width: 20rem;
    border: 1px solid currentColor;
    padding: calc(0.5rem * 1.5) 0.5rem;
    color: currentColor;
    background: transparent;
    border-radius: 8px;

    &:focus,
    &:not(:placeholder-shown) {
      & + .input__label {
        transform: translate(0.25rem, -65%) scale(0.8);
        color: #007bff;
      }
    }
  }
}
.imagePreviewWrapper {
  width: 120px;
  height: 120px;
  display: block;
  margin-top: 2rem;

  border: 2px solid #d2d2d2;
  border-radius: 1rem;

  cursor: pointer;
  background-size: cover;
  background-position: center center;

  img {
    width: 100px;
    height: 100px;
  }
}
.avatar {
  display: none;
}
@media screen and (max-width: 700px) {
  .registre {
    display: flex;
    flex-direction: column;
    width: auto;

    margin-top: -7rem;
    margin-left: -7rem;
  }
  .user {
    display: flex;
    flex-direction: column;
  }
  .userAvatar {
    justify-content: flex-start!important;
    button {
      width: 187px!important;
      margin-left: 10px;
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
  }
  .endereco {
    display: flex;
    flex-direction: column;
  }
}
</style>
