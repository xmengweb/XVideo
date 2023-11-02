import Router from '@koa/router';
import vodController from '../controller/vod.controller';

const router = new Router({ prefix: '/vod' });

//采集视频
router.post('/cj', vodController.cj);

//个人推荐接口

//获取某部电影详情
router.get('/detail/:id', vodController.getDetail);

//搜索电影
router.get('/search', vodController.search);

//更新type表
router.get('/updateType', vodController.updateType);

//相关电影推荐

//片库总筛选

//获取轮播图视频列表

//获取电影列表
//获取热播列表(电影/电视剧/综艺..)

//最新列表

//好莱坞电影

//奈飞

//韩剧

//美剧

//...

export { router };

export default router.routes();
