import { Op } from 'sequelize';
import { Vod, Topic } from './sql';

class topicService {
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
}

export default new topicService();
