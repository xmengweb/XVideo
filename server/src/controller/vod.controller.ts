import { CJBASEURL } from '@/config/env';
import axios from 'axios';
import { Context, Next } from 'koa';
import vodService from '../service/vod.Service';

class VodController {
  //采集
  async collectVod(ctx: Context, next: Next) {
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
      code: 200,
      message: '采集成功',
      cjNum: sqlInfo.length,
    };
  }

  //获取详情
  async getDetailById(ctx: Context, next: Next) {
    const { id } = ctx.params;
    const instance = await vodService.detail(id);
    ctx.body = {
      code: 200,
      message: '获取成功',
      vodDetail: instance,
    };
  }

  //搜索
  async search(ctx: Context, next: Next) {
    const { name, pageNum = 1 } = ctx.query;
    const res = await vodService.search(name, parseInt(pageNum as string));
    ctx.body = {
      code: 200,
      message: '查询成功',
      vodList: res.rows,
      vodCount: res.count,
      pageTotal: Math.ceil(res.count / 10),
    };
  }

  //更新type
  async updateType(ctx: Context, next: Next) {
    const res = (await axios.get(CJBASEURL)).data;
    const info = await vodService.updateType(res.class);
    ctx.body = {
      code: 200,
      message: '更新成功',
      typeList: info,
    };
  }

  //更新某个Topic

  //获取筛选库

  //筛选视频
  async filterVod(ctx: Context, next: Next) {}

  //获取轮播图
  async getRotationList(ctx: Context, next: Next) {
    const { tag = 'recommend' } = ctx.query;
    const topicListRes = await vodService.getRotationList(tag as string);
    ctx.body = {
      code: 200,
      message: '查询成功',
      topicList: topicListRes,
    };
  }
}

export default new VodController();
