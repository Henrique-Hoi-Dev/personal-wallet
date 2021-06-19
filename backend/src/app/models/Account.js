import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        valor: Sequelize.STRING,
        parcelas: Sequelize.STRING,
        data_vencimento: Sequelize.DATE,
        pago: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
}

export default Account;
