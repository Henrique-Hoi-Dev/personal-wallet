import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
require('dotenv/config');

import File from '../app/models/File';
import Account from '../app/models/Account';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User, File, Account];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connetion = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connetion))
      .map(
        (model) => model.associate && model.associate(this.connetion.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
