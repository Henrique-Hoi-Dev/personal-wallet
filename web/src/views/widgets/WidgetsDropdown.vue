<template>
  <CRow>
    <div class="table1">
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="primary" :header="cardOverdue | currencyFormat" text="Vencidas">
          <template #footer>
            <CChartLineSimple
              pointed
              class="mt-3 mx-3"
              style="height:70px"
              :data-points="[65, 100, 84, 84, 51, 55, 40]"
              point-hover-background-color="primary"
              label="Members"
              labels="months"
            />
          </template>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="info" :header="cardPaid | currencyFormat" text="Pagos">
          <template #footer>
            <CChartLineSimple
              pointed
              class="mt-3 mx-3"
              style="height:70px"
              :data-points="[1, 18, 9, 17, 34, 22, 11]"
              point-hover-background-color="info"
              :options="{ elements: { line: { tension: 0.00001 }}}"
              label="Members"
              labels="months"
            />
          </template>
        </CWidgetDropdown>
      </CCol>
    </div>
    <div class="table2">
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="warning"
          :header="cardTotal | currencyFormat"
          text="Dívidas totais"
        >
          <template #footer>
            <CChartLineSimple
              class="mt-3"
              style="height:70px"
              background-color="rgba(255,255,255,.2)"
              :data-points="[78, 81, 80, 45, 34, 12, 40]"
              :options="{ elements: { line: { borderWidth: 2.5 }}}"
              point-hover-background-color="warning"
              label="Members"
              labels="months"
            />
          </template>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="danger"
          :header="cardOwing | currencyFormat"
          text="Devendo"
        >
          <template #footer>
            <CChartBarSimple
              class="mt-3 mx-3"
              style="height:70px"
              background-color="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          </template>
        </CWidgetDropdown>
      </CCol>
    </div>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'
import axios from "axios";
import { baseApiUrl } from "@/global";
import mixinFilter from "@/plugins/mixinFilter";

export default {
  name: 'WidgetsDropdown',
  mixins: [mixinFilter],
  components: { CChartLineSimple, CChartBarSimple },
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
}
</script>
<style scoped lang="scss">
  #info2 {
    margin-top: 14rem;
    z-index: 1;
    justify-content: center;

    display: grid;   
    grid-template-columns: 400px 400px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
    "table1 table2"
    "table1 table2";

    .table1 {
      grid-area: table1;
      width: 100%;
    }
    .table2 {
      grid-area: table2;
    }
    .col-lg-3 {
      max-width: 100%;
      margin: 10px;
    }
  }
@media screen and (max-width: 700px) {
  #info2 {
    display: flex;
    flex-direction: column;
    align-content: center;

      .table1 {
        width: 370px;
        margin-top: -12rem;
      }
      .table2 {
        width: 370px;
      } 
  }
}
</style>
