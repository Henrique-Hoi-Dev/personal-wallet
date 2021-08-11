const mongoose = require('mongoose');

const Account = new mongoose.Schema(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    parcelas: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_vencimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    pago: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Account', Account);
