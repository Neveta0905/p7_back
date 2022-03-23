'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      unique: 'uniqueTag'
    },
    password: DataTypes.STRING,
    role:DataTypes.STRING,
    office: DataTypes.STRING,
    bio: DataTypes.STRING,
    user_name: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Message) //association des users et des posts
  };
  return User;
};