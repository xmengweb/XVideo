import { CJBASEURL } from '@/config/env';
import axios from 'axios';
import { Context, Next } from 'koa';
import typeService from '../service/type.service';

class TypeController {
  //更新type
  async updateType(ctx: Context, next: Next) {
    if (!CJBASEURL) {
      ctx.body = {
        code: 200,
        message: '请设置采集地址',
      };
      return;
    }
    const res = (await axios.get(CJBASEURL)).data;
    const info = await typeService.updateType(res.class);
    ctx.body = {
      code: 200,
      message: '更新成功',
      typeList: info,
    };
  }
}

export default new TypeController();
