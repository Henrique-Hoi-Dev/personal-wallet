module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'accounts',
      [
        {
          name: 'Account teste 1',
          valor: '200',
          parcelas_id: 1,
          pago: false,
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account teste 2',
          valor: '200',
          parcelas_id: 2,
          pago: true,
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account teste 2 vencida',
          valor: '200',
          parcelas_id: 3,
          pago: true,
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('accounts', null, {}),
};
