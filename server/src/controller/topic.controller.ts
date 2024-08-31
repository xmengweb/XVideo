import { Context, Next } from 'koa';
import topicService from '../service/topic.service';

class TopicController {
  //设置topic(批量)
  async updateTopic(ctx: Context, next: Next) {
    const { topicList } = ctx.request.body;
    const setTopicList = topicList.map((item: any) => {
      return {
        topic_name: item.topic_name,
        topic_status: item.topic_status,
        topic_sort: item.topic_sort,
        topic_pic: item.topic_pic,
        topic_pic_thumb: item.topic_pic_thumb,
        topic_pic_slide: item.topic_pic_slide,
        topic_des: item.topic_des,
        topic_blurb: item.topic_blurb,
        topic_remarks: item.topic_remarks,
        topic_level: item.topic_level,
        topic_time: new Date().getTime(),
        topic_time_add: item.topic_time_add,
        topic_tag: item.topic_tag,
        topic_rel_vod: item.topic_rel_vod,
      };
    });
    const saveInfo = await topicService.setTopic(setTopicList);
    ctx.body = {
      code: 200,
      message: '更新成功',
      topicList: saveInfo,
    };
  }

  //获取topicList
  async getTopicList(ctx: Context, next: Next) {
    const { limit = 6, pageNum = 1, tag = 'recommend' } = ctx.query;
    const topicListRes = await topicService.getTopicList(parseInt(pageNum as string), parseInt(limit as string), tag as string);
    if (topicListRes) {
      ctx.body = {
        code: 200,
        message: '查询成功',
        count: topicListRes.count,
        topicList: topicListRes.rows,
        pageTotal: Math.ceil(topicListRes.count / (limit as number)),
      };
    } else {
      ctx.body = {
        code: -1,
        message: '查询失败',
      };
    }
  }
}

export default new TopicController();
