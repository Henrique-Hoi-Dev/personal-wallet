module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'personal-wallet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
