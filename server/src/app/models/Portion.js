import Sequelize, { Model } from 'sequelize';

class Portion extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_parcela: Sequelize.NUMBER,
        valor: Sequelize.NUMBER,
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

export default Portion;
