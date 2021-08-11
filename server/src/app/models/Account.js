import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        valor: Sequelize.NUMBER,
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
  static associate(models) {
    this.hasMany(models.Portion, { foreignKey: 'portion_id', as: 'portion' });
  }
}

export default Account;
