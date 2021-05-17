<template>
  <div class="menu">
    <InfoCard/>
  </div>
</template>

<script>
import InfoCard from '@/components/template/InfoCard.vue'

export default {
  components: { InfoCard } 
}
</script>

<style scoped>
.menu {
  color: #d2d2d2;
  background: linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
}
</style>
