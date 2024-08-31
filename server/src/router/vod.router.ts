import Router from '@koa/router';
import vodController from '../controller/vod.controller';

const router = new Router({ prefix: '/vod' });

//采集视频
router.post('/collect-vod', vodController.collectVod);

//获取某部电影详情
router.get('/detail/:id', vodController.getDetailById);

//搜索电影
router.get('/search', vodController.search);

//片库总筛选
router.post('/filter', vodController.filterVod);

//获取轮播图视频列表
router.get('/rotation-list', vodController.getRotationList);

//抓取网站电影单

//...

export default router.routes();
