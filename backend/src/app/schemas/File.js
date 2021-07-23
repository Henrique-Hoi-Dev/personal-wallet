const mongoose = require('mongoose');

const File = new mongoose.Schema(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('File', File);
