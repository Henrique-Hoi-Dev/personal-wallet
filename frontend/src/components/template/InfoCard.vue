<template>
  <div class="info-card">
    <div>
      <b-card-group deck>
        <b-card header-tag="header">
          <b-card-text>000.000,000</b-card-text>
        </b-card>

        <b-card header-tag="header">
          <b-card-text>000.000,000</b-card-text>
        </b-card>

        <b-card header-tag="header">
          <b-card-text>000.000,000</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card-deck {
  display: block;
  justify-content: center;
  background: #404040;

  margin-top: 9.5rem;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.card-deck .card {
  margin: 2rem;
  margin-bottom: 15px !important;

  max-width: 20rem;
  color: #d2d2d2;
  background: #292929;
}
</style>
