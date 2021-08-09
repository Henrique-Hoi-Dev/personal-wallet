import * as Yup from 'yup';
import Account from '../models/Account';

class AccountController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const AccountExist = await Account.findOne({
      where: { name: req.body.name },
    });

    if (AccountExist) {
      return res
        .status(400)
        .json({ error: 'That account name already exists.' });
    }

    const accounts = await Account.create(req.body);

    return res.json(accounts);
  }

  async getAll(req, res) {
    try {
      const account = await Account.findAll();
      return res.status(200).json(account);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getById(req, res) {
    try {
      let { id } = req.params;

      let account = await Account.findByPk(id);

      return res.status(200).json(account);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getCardInfoOverdue(req, res) {
    try {
      const accounts = await Account.findAll();
      const dataAtual = new Date();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.data_vencimento <= dataAtual) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getCardInfoTotal(req, res) {
    try {
      const accounts = await Account.findAll();

      const valid = accounts.filter(function (result) {
        return result.dataValues;
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getCardInfoPaid(req, res) {
    try {
      const accounts = await Account.findAll();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == true) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getCardInfoOwing(req, res) {
    try {
      const accounts = await Account.findAll();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.pago == false) {
          return result.dataValues;
        }
      });

      const venci = valid.map(function (result) {
        const valor = parseInt(result.dataValues.valor);

        return valor;
      });

      const total = venci.reduce((acumulado, x) => {
        return acumulado + x;
      });

      return res.status(200).json(total);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async getOverdueAccount(req, res) {
    try {
      const accounts = await Account.findAll();

      const dataAtual = new Date();

      const valid = accounts.filter(function (result) {
        if (result.dataValues.data_vencimento <= dataAtual) {
          return result.dataValues;
        }
      });

      return res.status(200).json(valid);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async deleteAccount(req, res) {
    try {
      const { id } = req.params;
      const account = await Account.destroy({
        where: {
          id: id,
        },
      });

      if (!account) {
        return res.status(400).json({ message: 'Account not found' });
      }

      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async updateAccount(req, res) {
    const { id } = req.params;

    const account = await Account.findByPk(id);

    let accountUpdated = await account.update(req.body);

    console.log('Account com sucesso');
    return res.json(accountUpdated);
  }
}
export default new AccountController();
