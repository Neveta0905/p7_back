'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const Topic = sequelize.define('Topic', {
    name: {
      type:DataTypes.STRING,
      unique: true,
      isEmail: true,
    },
  }, {});
  Topic.associate = function(models) {
    models.Topic.belongsTo(models.User,{
      as:'creator_id',
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false
      }
    })
    models.Topic.hasMany(models.Posts)
  };
  return Topic;
};