import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        valor: Sequelize.STRING,
        parcelas: Sequelize.STRING,
        data: Sequelize.STRING,
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
