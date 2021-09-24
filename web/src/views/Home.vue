<template>
  <div>
    <InfoCard id="info" />
    <WidgetsDropdown id="info2"/>
  </div>
</template>

<script>
import InfoCard from "@/components/template/InfoCard.vue";
import WidgetsDropdown from './widgets/WidgetsDropdown.vue'

export default {
  components: { InfoCard, WidgetsDropdown },
}
</script>

<style scoped>
#info {
  position: fixed;
  top: 0rem;
  width: 100%;
}
@media screen and (max-width: 700px) {
  #info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
