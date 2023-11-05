import { Op } from 'sequelize';
import sequelize, { Vod, Type } from './sql';

const pageSize = 10;

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
  async search(name: any, pageNum = 1) {
    const res = await Vod.findAndCountAll({
      attributes: [
        'vod_id',
        'type_id',
        'vod_name',
        'vod_class',
        'vod_pic',
        'vod_director',
        'vod_area',
        'vod_lang',
        'vod_year',
        'vod_blurb',
      ],
      where: {
        [Op.or]: [
          { vod_director: { [Op.like]: '%' + name + '%' } },
          { vod_actor: { [Op.like]: '%' + name + '%' } },
          { vod_name: { [Op.like]: '%' + name + '%' } },
        ],
      },
      offset: (pageNum - 1) * pageSize, // 跳过前 (pageNum - 1) * pageSize 条数据
      limit: pageSize, // 获取 pageSize 条数据
    });
    return res;
  }
  async setTopic(topicList: Array<any>) {
    const res = await Type.bulkCreate(topicList);
    return res.map((value) => value.toJSON());
  }
}

export default new vodService();
