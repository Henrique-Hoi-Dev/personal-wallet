<template>
  <div id="app">
    <div id="nav">
        <Menu id="menu"/>
      <main>
        <Header id="header"/>
        <router-view/> 
      </main>  
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';

export default {
  components: { Header, Menu,  }
}
</script>

<style lang="scss">
#app {
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
  top: 14rem;
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
</style>
