<template>
  <div id="app" :class="{ 'hide-menu': !user }">
    <Auth v-if="!user" />
    <div id="nav" v-else>
      <Menu id="menu" />
      <main>
        <InfoCard id="info" />
        <Header id="header" />
        <Loading v-if="validatingToken" />
        <router-view v-else />
      </main>
    </div>
  </div>
</template>
<script>
import Auth from "@/auth/Auth.vue";
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import Loading from "@/components/template/Loading.vue";
import InfoCard from "@/components/template/InfoCard.vue";

import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";

export default {
  components: { Header, Menu, Loading, Auth, InfoCard },
  computed: mapState(["user"]),
  data: function() {
    return {
      validatingToken: true
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style lang="scss">
#app.hide-menu {
  font-family: Itim, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;

  main {
    flex: 1;
  }
}
#menu {
  position: fixed;
  top: 17rem;
  width: 8rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
#header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 10rem;
  z-index: 1;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
#info {
  position: fixed;
  top: 0rem;
  width: 100%;
  z-index: 1;
}
</style>
