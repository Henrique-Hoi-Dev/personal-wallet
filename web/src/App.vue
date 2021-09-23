<template>
  <div id="app" :class="{ 'hide-menu': !user }">
    <Auth v-if="!user" />
    <div id="nav" v-else>
      <Menu />
      <main>
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

import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";

export default {
  components: { Header, Menu, Loading, Auth },
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

/* Modal esta em modo global */
.modal-footer {
  display: none !important;
}
.modal-body {
  background: #292929 !important;
  color: #d2d2d2;
}
.modal-header {
  background: #292929 !important;
  color: #d2d2d2;
}
.modal-header .close {
  color: #d2d2d2;
}
.b-sidebar {
  width: 180px!important;
  border-radius: 20px!important;
}
</style>
