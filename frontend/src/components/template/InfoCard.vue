<template>
  <div class="info-card">
    <div>
      <b-card-group deck>
        <b-card header-tag="header" title="Amount owed">
          <b-card-text>{{ cardOwing | currencyFormat }}</b-card-text>
        </b-card>

        <b-card header-tag="header" title="Amount paid">
          <b-card-text>{{ cardPaid | currencyFormat }}</b-card-text>
        </b-card>

        <b-card header-tag="header" title="Expiration amount">
          <b-card-text>{{ cardOverdue | currencyFormat }}</b-card-text>
        </b-card>

        <b-card header-tag="header" title="Amount">
          <b-card-text>{{ cardTotal | currencyFormat }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import mixinFilter from "@/plugins/mixinFilter";

export default {
  mixins: [mixinFilter],
  data() {
    return {
      cardOwing: {},
      cardPaid: {},
      cardOverdue: {},
      cardTotal: {}
    };
  },
  // computed: {
  //   info() {
  //     if (this.cardOwing == {}) {
  //       return this.cardOwing == 0;
  //     }
  //   }
  // },
  beforeMount() {
    this.getInfoCardOwing();
    this.getInfoCardPaid();
    this.getInfoCardOverdue();
    this.getInfoCardTotal();
  },
  methods: {
    getInfoCardOwing() {
      const url = `${baseApiUrl}/infoCardOwing`;
      axios.get(url).then(res => {
        this.cardOwing = res.data;
      });
    },
    getInfoCardPaid() {
      const url = `${baseApiUrl}/infoCardPaid`;
      axios.get(url).then(res => {
        this.cardPaid = res.data;
      });
    },
    getInfoCardOverdue() {
      const url = `${baseApiUrl}/infoCardOverdue`;
      axios.get(url).then(res => {
        this.cardOverdue = res.data;
      });
    },
    getInfoCardTotal() {
      const url = `${baseApiUrl}/infoCardTotal`;
      axios.get(url).then(res => {
        this.cardTotal = res.data;
      });
    }
  }
};
</script>

<style>
.card-deck {
  display: block;
  justify-content: center;
  background: #404040;

  margin-top: 7.5rem;
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
