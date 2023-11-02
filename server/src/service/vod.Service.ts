import { Op } from 'sequelize';
import sequelize, { Vod, Type } from './sql';

class vodService {
  async cj(cj: any) {
    // 1.获取用户 user
    try {
      const res = await Vod.bulkCreate(cj, {
        updateOnDuplicate: ['vod_id'],
      });
      return res.map((value) => value.toJSON());
    } catch (error) {
      return error;
    }
  }
  async detail(id: number) {
    const instance = await Vod.findByPk(id);
    return instance;
  }
  async updateType(typeList: any) {
    try {
      const res = await Type.bulkCreate(typeList, {
        updateOnDuplicate: ['type_id'],
      });
      return res.map((value) => value.toJSON());
    } catch (error) {
      return error;
    }
  }
  async search(name: any) {
    const res = await Vod.findAll({
      where: {
        [Op.or]: [
          { vod_director: { [Op.like]: '%' + name + '%' } },
          { vod_actor: { [Op.like]: '%' + name + '%' } },
          { vod_name: { [Op.like]: '%' + name + '%' } },
        ],
      },
    });
    return res;
  }
}

export default new vodService();
