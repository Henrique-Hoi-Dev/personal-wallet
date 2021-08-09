<template>
  <div class="info-card">
    <div>
      <b-card-group deck>
        <b-card header-tag="header" title="Amount Owed">
          <label class="owed">-- {{ cardOwing | currencyFormat }}</label>
        </b-card>

        <b-card header-tag="header" title="Amount Paid">
          <label class="paidd">{{ cardPaid | currencyFormat }}</label>
        </b-card>

        <b-card header-tag="header" title="Expiration Amount">
          <label>{{ cardOverdue | currencyFormat }}</label>
        </b-card>

        <b-card header-tag="header" title="Total Value Accounts">
          <label>{{ cardTotal | currencyFormat }}</label>
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

<style lang="scss">
.owed {
  color: #e62e4d;
}
.paidd {
  color: #33cc95;
}
.card-deck {
  justify-content: center;
  background: #404040;

  margin-top: 7.5rem;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.card-deck .card {
  flex: none;
  min-width: 14rem;

  text-align: center;

  margin: 1rem;
  margin-bottom: 15px !important;

  max-width: 20rem;
  color: #d2d2d2;
  background: #292929;
}
.card-title {
  font-size: 20px;
  margin-bottom: 0 !important;
}
.card-body {
  height: 80px;
  padding: 1rem;
  margin: 3px;
}
.card-text:last-child {
  font-weight: 400;
}
</style>
