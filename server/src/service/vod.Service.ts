import { Op } from 'sequelize';
import { Vod, Topic } from './sql';

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
  async getRotationList(topic_tag: string) {
    const res = await Topic.findOne({
      where: {
        topic_level: 9,
        topic_tag: {
          [Op.like]: '%' + topic_tag + '%',
        },
      },
      order: [['topic_sort', 'DESC']],
      include: [
        {
          model: Vod,
          attributes: ['vod_name'],
          through: { attributes: [] },
        },
      ],
    });
    return res.toJSON();
  }
}

export default new vodService();
