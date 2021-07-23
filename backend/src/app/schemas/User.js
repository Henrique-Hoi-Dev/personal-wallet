const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    avatar_id: {
      type: Sequelize.INTEGER,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', User);
