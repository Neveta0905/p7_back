'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    topic: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  },
  {timestamps: false},
    {});
  Posts.associate = function (models) {
    models.Posts.belongsTo(models.User, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false,
        name:'creator_id'
      }
    });
    models.Posts.belongsToMany(models.Office,{through:'post_has_office'})
  };
  return Posts;
};