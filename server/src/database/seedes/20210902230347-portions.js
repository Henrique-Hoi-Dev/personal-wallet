module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'portions',
      [
        {
          accounts_id: 1,
          valor: '300',
          pago: false,
          numero_parcela: '1',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 1,
          valor: '300',
          pago: true,
          numero_parcela: '2',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 1,
          valor: '300',
          pago: false,
          numero_parcela: '3',
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 2,
          valor: '200',
          pago: false,
          numero_parcela: '1',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 2,
          valor: '200',
          pago: true,
          numero_parcela: '2',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 2,
          valor: '200',
          pago: false,
          numero_parcela: '3',
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 3,
          valor: '100',
          pago: false,
          numero_parcela: '1',
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 3,
          valor: '100',
          pago: false,
          numero_parcela: '2',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          accounts_id: 3,
          valor: '100',
          pago: true,
          numero_parcela: '3',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('portions', null, {}),
};
