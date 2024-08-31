import { Type } from './sql';

class typeService {
  async updateType(typeList: any) {
    try {
      const res = await Type.bulkCreate(typeList, {
        updateOnDuplicate: ['type_id'],
      });
      return res.map((value) => value.toJSON());
    } catch (error) {
      return error;
    }
  }
}

export default new typeService();
