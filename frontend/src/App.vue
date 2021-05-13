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
  components: { Header, Menu }
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
  top: 10rem;
  height: 18rem;
  width: 7rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

#header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
