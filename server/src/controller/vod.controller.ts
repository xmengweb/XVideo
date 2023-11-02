import { CJBASEURL } from '@/config/env';
import axios from 'axios';
import { Context, Next } from 'koa';
import vodService from '../service/vod.Service';

class VodController {
  //采集
  async cj(ctx: Context, next: Next) {
    // 1.获取传递过来信息
    const cjRequest: Vod.ICjRequest = ctx.request.body;

    const res = (
      await axios.get(CJBASEURL, {
        params: cjRequest,
      })
    ).data;

    const sqlInfo = [];
    // 2.获取每一页中的list
    for (let i = 1; i <= res.pagecount; i++) {
      const onePage = (
        await axios.get(CJBASEURL, {
          params: {
            ...cjRequest,
            pg: i,
          },
        })
      ).data;
      sqlInfo.push(await vodService.cj(onePage.list));
    }
    ctx.body = {
      message: '采集成功',
      sqlInfo,
    };
  }

  //获取详情
  async getDetail(ctx: Context, next: Next) {
    const { id } = ctx.params;
    const instance = await vodService.detail(id);
    ctx.body = {
      message: '获取成功',
      instance,
    };
  }

  //搜索
  async search(ctx: Context, next: Next) {
    const { name } = ctx.query;
    const res = await vodService.search(name);
    ctx.body = {
      message: '查询成功',
      res,
    };
  }

  //更新type
  async updateType(ctx: Context, next: Next) {
    const res = (await axios.get(CJBASEURL)).data;
    const info = await vodService.updateType(res.class);
    ctx.body = {
      message: '更新成功',
      info,
    };
  }
}

export default new VodController();
