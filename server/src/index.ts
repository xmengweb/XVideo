import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import Router from '@koa/router';
import userRouter from './router/user.router';
import vodRouter from './router/vod.router';

const app = new Koa();
const router = new Router({prefix:'/api'});

router.get('/',async(ctx,next)=>{
	ctx.body='hello world'
})
router.use(userRouter).use(vodRouter)

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => console.log('server start at 3001'));

