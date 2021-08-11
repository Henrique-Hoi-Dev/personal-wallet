import moment from "moment";

export default {
  filters: {
    dateFormat: function(date) {
      return moment(date)
        .locale("pt-br")
        .format("L");
    },
    currencyFormat: function(num) {
      if (num) {
        return (
          "R$: " +
          parseFloat(num)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
      }
    }
  }
};
