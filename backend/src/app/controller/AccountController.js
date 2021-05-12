import * as Yup from 'yup';
import Account from '../models/Account';

class AccountController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
    });

    if (!(await schema.isValid(req.body.values))) {
      return res.status(400).json({ error: 'Erro de codigo de barra' });
    }

    const AccountExist = await Account.findOne({
      where: { name: req.body.values.name },
    });
    if (AccountExist) {
      return res.status(400).json({ error: 'Esse Produto já existe.' });
    }
    const account = await Account.create(req.body.values);

    return res.json(account);
  }

  async getAll(req, res) {
    const account = await Account.findAll();
    return res.status(200).json(account);
  }
  catch(error) {
    return res.status(400).json(error);
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
