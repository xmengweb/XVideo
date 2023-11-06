import Router from '@koa/router';
import vodController from '../controller/vod.controller';

const router = new Router({ prefix: '/vod' });

//采集视频
router.post('/cj', vodController.cj);

//设置topic电影单
router.post('/setTopic', vodController.setTopic);

//获取电影单首页列表

//获取某部电影详情
router.get('/detail/:id', vodController.getDetail);

//搜索电影
router.get('/search', vodController.search);

//更新type表
router.get('/updateType', vodController.updateType);

//相关电影推荐

//片库总筛选

//获取轮播图视频列表

//...

export { router };

export default router.routes();
