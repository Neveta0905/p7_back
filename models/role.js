'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
  },
  {timestamps: false},
   {});
  Role.associate = function(models) {
    models.Role.hasMany(models.User) //association des users et des posts
  };
  return Role;
};