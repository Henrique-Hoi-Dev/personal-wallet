<template>
  <div class="header">
      <div class="avatar">
        <b-avatar src="https://placekitten.com/300/300" size="6rem" /> 
        <h2 v-for="use in user" :key="use.name">{{ use.name }}</h2>
      </div>
      <div class="button-info">
        <button type="button">
          <a href  @click.prevent="logout">
            Exit...
          </a>
        </button>
        <div v-for="user1 in user" :key="user1.id">
          <router-link :to="`/profile/${user1.id}`">
            <button class="profile-b" >Profile</button>
          </router-link>
        </div>
          
      </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from '@/global'
import axios from 'axios'

export default {
  data() {
    return {
      user: {},
    }
  },
   beforeMount() {
    this.getUser();
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'auth' })
    },
    getUser() {
      const url = `${baseApiUrl}/user` 
        axios.get(url).then(res => {
        this.user = res.data
      })
    },
  }, 
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 1rem;
  color: #d2d2d2;
  background: linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
}
#card {
  position: block;
  margin-top: -5.5rem;
}
.avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between; 

    h2 {
      margin-left: 1rem;
    }
}
.b-avatar {
  border: 5px solid #A1FF0A!important;
}
.button-info {
  display: flex;
  flex-direction: column;

  button  {
    width: 5rem;
    height: 2rem;

    color: #d2d2d2;
    font: 1.1rem Itim;

    margin-top: 5px;
    border-radius: 0.5rem;

    background: brown;

      &:hover {
        opacity: 90%;
      }

      a {
        font: 1.1rem Itim;
        color: #d2d2d2;
        text-decoration: none;
      }
  }
}
.profile-b {
  background: #2b2d42!important;

    &:hover {
      opacity: 95%!important;
    }
}
</style>
