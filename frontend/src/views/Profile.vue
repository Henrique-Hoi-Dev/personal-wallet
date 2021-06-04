<template>
  <div class="profile">
    <div class="registre" >
        <h2>Name</h2>
        <input type="text" v-model="user.name" >
        <h2>Email</h2>
        <input type="text">
        <h2>Password</h2>
        <input type="text">
        <hr>
        <h2>New password</h2>
        <input type="text">
        <h2>Confirm new password</h2>
        <input type="text">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {}
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
        this.$http.post('/user/new', this.user)
				.then(() => {
          this.limparUser()
        })
      }
    }
}
</script>

<style scoped lang="scss">
.profile {
  margin: 10rem;
  margin-top: 14rem;
}
.registre {
  color:#d2d2d2;
  background: #292929;

  padding: 2rem;
    h2 {
      font-size: 1.5rem;
    }
}
</style>
