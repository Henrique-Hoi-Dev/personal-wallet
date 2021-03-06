import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
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
    data_nascimento: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cep: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    logradouro: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    complemento: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    numero: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bairro: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cidade: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    uf: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

export const UserModel = mongoose.model('User', UserSchema)

