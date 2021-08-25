import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        valor: Sequelize.NUMBER,
        parcelas_id: Sequelize.INTEGER,
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
    this.hasMany(models.Portion, { foreignKey: 'parcelas_id', as: 'parcela' });
  }
}

export default Account;
