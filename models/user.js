'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      unique: true,
      isEmail: true,
    },
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    moderated: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
  },
  {timestamps: false}
  , {});
  User.associate = function(models) {
    models.User.belongsTo(models.Role, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false,
        name:'role_id'
      }
    });
    models.User.belongsTo(models.Office, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false,
        name:'office_id'
      },
    });
   /* models.User.hasMany(models.Posts)*/
  };
  return User;
};