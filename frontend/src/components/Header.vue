<template>
  <div class="menu">
    <div class="avatar">   
      <div class="avatar-info">
        <b-avatar>
        </b-avatar>
        <h2>Henrique Hoinacki</h2>
      </div>
      <div class="button-info">
        <button type="button">Exit</button>
        <button class="profile" type="button">Profile</button>
      </div>
    </div>
    <InfoCard id="card"/>
  </div>
</template>

<script>
import InfoCard from '@/components/template/InfoCard.vue'

export default {
  components: { InfoCard } 
}
</script>

<style lang="scss" scoped>
#card {
  position: block;
  margin-top: -5.5rem;
}
.avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between; 

  button {
    width: 5rem;
    height: 2rem;

    margin-top: 5px;
    border-radius: 0.5rem;

    color: #d2d2d2;
    background: brown;
  }
}
.button-info {
  display: flex;
  flex-direction: column;

  .profile {
    background: #343a40;
  }
}
.avatar-info {
  display: flex;
  flex-direction: row;

  h2 {
    margin-left: 1rem;
  }
}
.menu {
  padding: 1rem;
  color: #d2d2d2;
  background: linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
}
</style>
