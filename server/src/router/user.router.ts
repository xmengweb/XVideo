import Router from '@koa/router';

const router = new Router({ prefix: '/user' });

router.get('/', async (ctx, next) => {
  ctx.body = 'hello user';
});

//登录

//注册

//历史查询

//收藏

export default router.routes();
