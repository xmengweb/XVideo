import { DBPASSWORD } from '@/config/env';
import { BelongsToManyAddAssociationMixin, DataTypes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize('xmvideo', 'xmvideo', DBPASSWORD, {
  host: 'mysql.sqlpub.com',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const Vod = sequelize.define(
  'Vod',
  {
    vod_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
    type_id_1: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: '0', allowNull: false },
    group_id: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_name: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_sub: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_en: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_status: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_letter: { type: DataTypes.CHAR(1), defaultValue: '', allowNull: false },
    vod_class: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_pic: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_pic_slide: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_level: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
    vod_actor: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_director: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_blurb: { type: DataTypes.STRING(255), defaultValue: '', allowNull: false },
    vod_remarks: { type: DataTypes.STRING(100), defaultValue: '', allowNull: false },
    vod_total: { type: DataTypes.MEDIUMINT.UNSIGNED, defaultValue: 1, allowNull: false },
    vod_area: { type: DataTypes.STRING(20), defaultValue: '', allowNull: false },
    vod_lang: { type: DataTypes.STRING(10), defaultValue: '', allowNull: false },
    vod_year: { type: DataTypes.STRING(10), defaultValue: '', allowNull: false },
    vod_state: { type: DataTypes.STRING(30), defaultValue: '', allowNull: false },
    vod_duration: { type: DataTypes.STRING(10), defaultValue: '', allowNull: false },
    vod_up: { type: DataTypes.MEDIUMINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_down: { type: DataTypes.MEDIUMINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_score: { type: DataTypes.DECIMAL(3, 1).UNSIGNED, defaultValue: '0.0', allowNull: false },
    vod_score_all: { type: DataTypes.MEDIUMINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_douban_id: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
    vod_douban_score: { type: DataTypes.DECIMAL(3, 1).UNSIGNED, defaultValue: '0.0', allowNull: false },
    vod_state_num: { type: DataTypes.MEDIUMINT.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_time: { type: DataTypes.STRING(30), defaultValue: '0', allowNull: false },
    vod_time_add: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: '0', allowNull: false },
    vod_content: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
    vod_play_url: { type: DataTypes.TEXT('long'), allowNull: false },
  },
  {
    tableName: 'vod',
    timestamps: false, // 如果数据库中的表没有自动管理时间戳，需要设置为false
    charset: 'utf8',
    engine: 'MYISAM',
    indexes: [
      { name: 'type_id_1', fields: ['type_id_1'], using: 'BTREE' },
      { name: 'vod_level', fields: ['vod_level'], using: 'BTREE' },
      { name: 'vod_name', fields: ['vod_name'], using: 'BTREE' },
      { name: 'vod_year', fields: ['vod_year'], using: 'BTREE' },
      { name: 'vod_lang', fields: ['vod_lang'], using: 'BTREE' },
      { name: 'vod_area', fields: ['vod_area'], using: 'BTREE' },
      { name: 'vod_time', fields: ['vod_time'], using: 'BTREE' },
      { name: 'vod_time_add', fields: ['vod_time_add'], using: 'BTREE' },
      { name: 'vod_actor', fields: ['vod_actor'], using: 'BTREE' },
      { name: 'vod_director', fields: ['vod_director'], using: 'BTREE' },
    ],
  }
);

const Type = sequelize.define(
  'Type',
  {
    type_id: { type: DataTypes.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    type_name: { type: DataTypes.STRING(60), allowNull: false, defaultValue: '' },
    type_pid: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: '0' },
    type_status: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
  },
  {
    tableName: 'type',
    timestamps: false,
    indexes: [
      { name: 'type_pid', fields: ['type_pid'], using: 'BTREE' },
      { name: 'type_name', fields: ['type_name'] },
    ],
    engine: 'MyISAM',
    charset: 'utf8',
  }
);

interface TopicInstance extends Model {
  addVod: BelongsToManyAddAssociationMixin<any, number>;
}
const Topic = sequelize.define<TopicInstance>(
  'Topic',
  {
    topic_id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
    topic_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    topic_status: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: '1' },
    topic_sort: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, defaultValue: '0' },
    topic_pic: { type: DataTypes.STRING, defaultValue: '' },
    topic_pic_thumb: { type: DataTypes.STRING, defaultValue: '' },
    topic_pic_slide: { type: DataTypes.STRING, defaultValue: '' },
    topic_des: { type: DataTypes.STRING, defaultValue: '' },
    topic_blurb: { type: DataTypes.STRING, defaultValue: '' },
    topic_remarks: { type: DataTypes.STRING, defaultValue: '' },
    topic_level: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: '0' },
    topic_time: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, defaultValue: '0' },
    topic_time_add: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, defaultValue: '0' },
    topic_tag: { type: DataTypes.STRING, defaultValue: '' },
    topic_rel_vod: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: 'topic',
    timestamps: false, // 假设表没有时间戳
    indexes: [
      // 建立索引
      {
        name: 'topic_sort',
        using: 'BTREE',
        fields: ['topic_sort'],
      },
      {
        name: 'topic_level',
        using: 'BTREE',
        fields: ['topic_level'],
      },
      {
        name: 'topic_name',
        using: 'BTREE',
        fields: ['topic_name'],
      },
      {
        name: 'topic_time',
        using: 'BTREE',
        fields: ['topic_time'],
      },
    ],
    charset: 'utf8',
    engine: 'MYISAM',
    initialAutoIncrement: '1',
  }
);

Type.hasMany(Vod, { foreignKey: 'type_id' });
Vod.belongsTo(Type, { foreignKey: 'type_id' });

// 然后设置关联关系
Topic.belongsToMany(Vod, { through: 'TopicVideos', foreignKey: 'topic_id', onDelete: 'CASCADE' });
Vod.belongsToMany(Topic, { through: 'TopicVideos', foreignKey: 'vod_id' });

(async () => {
  await sequelize.sync();
  console.log('所有模型均已成功同步.');
})();

export default sequelize;

export { Vod, Type, Topic };
