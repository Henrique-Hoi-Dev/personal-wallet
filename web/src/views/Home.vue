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
  z-index: 1;
}
#info2 {
  margin-top: 15rem;
  width: 100%;
  z-index: 1;
}
</style>
