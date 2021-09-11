module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'accounts',
      [
        {
          name: 'Account teste 1',
          status: 'pendente',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account teste 2',
          status: 'pago',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account teste 2 vencida',
          status: 'pendente',
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('accounts', null, {}),
};
