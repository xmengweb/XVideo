import { Op } from 'sequelize';
import sequelize, { Vod, Type, Topic } from './sql';

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
    try {
      const result: Array<any> = [];
      // 批量创建topic
      const createdTopics = await Topic.bulkCreate(topicList);
      for (let i = 0; i < createdTopics.length; i++) {
        let topic = createdTopics[i];
        // 这里假设videoList[i]存在且为有效的video ID
        result.push(await topic.addVod(topicList[i].topic_rel_vod.split(',')));
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getTopicList(pageNum: number, limit: number, tag: string) {
    try {
      const res = await Topic.findAndCountAll({
        distinct: true,
        where: {
          topic_tag: { [Op.like]: '%' + tag + '%' },
        },
        offset: (pageNum - 1) * limit, // 跳过前 (pageNum - 1) * pageSize 条数据
        limit, // 获取 pageSize 条数据
        include: [
          {
            model: Vod,
            attributes: ['vod_name'],
            through: { attributes: [] },
          },
        ],
      });
      return res;
    } catch (error) {
      console.log(error);
      return false;
    }
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
