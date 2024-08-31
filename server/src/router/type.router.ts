import Router from '@koa/router';
import typeController from '../controller/type.contoller';

const router = new Router({ prefix: '/type' });

//更新type表
router.get('/update-type', typeController.updateType);

export default router.routes();
