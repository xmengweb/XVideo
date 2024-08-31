import Router from '@koa/router';
import topicController from '../controller/topic.controller';

const router = new Router({ prefix: '/topic' });

//设置topic电影单
router.post('/update-topic', topicController.updateTopic);
//获取电影单首页列表
router.get('/topic-list', topicController.getTopicList);

export default router.routes();
