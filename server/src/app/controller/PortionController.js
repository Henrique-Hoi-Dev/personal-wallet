import Portion from '../models/Portion';
import Account from '../models/Account';

class PortionController {
  async store(req, res) {
    try {
      let { id } = req.params;

      const account = await Account.findByPk(id);

      const portion = await Portion.create(req.body);

      return res.json(portion);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new PortionController();
