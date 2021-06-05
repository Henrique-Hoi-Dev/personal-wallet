<template>
  <div class="profile">
    <div class="registre" >
        <div class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${avatar})` }"
            @click="selectImage">
          </div>
          <input class="avatar" accept="image/*" ref="file" type="file"
            @input="pickFile"
            @change="onSelect"
          >
        <hr>
        <label class="input" >
          <input class="input__field" type="text" placeholder=" " v-model="user.name"/>
          <span class="input__label">User Name</span>
        </label>
        <label class="input" >
          <input class="input__field" type="text" placeholder=" " v-model="user.email"/>
          <span class="input__label">Email</span>
        </label>
        <hr>
        <label class="input" >
          <input class="input__field" type="password" placeholder=" " v-model="user.oldPassword"/>
          <span class="input__label">New password</span>
        </label>
        <label class="input" >
          <input class="input__field" type="password" placeholder=" " v-model="user.password"/>
          <span class="input__label">Confirm new password</span>
        </label>
        <hr>
        <b-button variant="success" @click="salvarUsers()">Enviar</b-button> 
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
  data() {
    return {
      avatar: null,
      user: {},
    }
  },
  methods: {
      selectImage() {
        this.$refs.file.click()
      },
      pickFile() {
        let input = this.$refs.file
        let file = input.files

        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.avatar = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      },
      async onSelect(event) {
        let formData = new FormData();
          formData.append('file', event.target.files[0])
        let res = await fetch('http://localhost:3333/files', {
        method: 'POST',
        body: formData,
        });
        let data = await res.json();
        this.data = data;

        this.user.avatar_id = data.id        
      }, 
      /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
      limparUser() {
        this.user
		  },
      salvarUsers() { 
        axios.put(`${baseApiUrl}/user`, this.user)
				.then(() => {
          this.$toasted.global.defaultSuccess(),
          this.limparUser()
        }).catch(showError)
      },
    },
}
</script>

<style scoped lang="scss">
.profile {
  margin: 10rem;
  margin-top: 17rem;
  width: auto;
}
.registre {
  color:#d2d2d2;
  background: #292929;

  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
    h2 {
      font-size: 1.5rem;
    }
    hr {
      color: #d2d2d2
    }
    /* input {
      width: 50%;
      margin-top: 5px;
      border-radius: 0.2rem;
      padding: 5px;
      font-weight: 700;
      font-family: Itim;
    } */
}
@import url('https://rsms.me/inter/inter.css');
.input {
  position: relative;
  width: auto;
  margin-top: 15px;
  
  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(.5rem * 0.75) calc(.5rem * .5);
    margin: calc(.5rem * 0.75 + 3px) calc(.5rem * .5);
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
    width: 30rem;
    border: 1px solid currentColor;
    padding: calc(.5rem * 1.5) .5rem;
    color: currentColor;
    background: transparent;
    border-radius: 8px;
    
    &:focus,
    &:not(:placeholder-shown) {
      & + .input__label {
        transform: translate(.25rem, -65%) scale(.8);
        color: #007bff;
      }
    }
  }
}
.imagePreviewWrapper {
    width: 150px;
    height: 150px;
    display: block;
    margin-top: 2rem;

    border: 2px solid #d2d2d2;
    border-radius: 1rem;

    cursor: pointer;
    background-size: cover;
    background-position: center center;
}
.avatar  {
  display: none;
}
</style>
