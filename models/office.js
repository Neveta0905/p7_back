'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const Office = sequelize.define('Office', {
    name: {
      type:DataTypes.STRING,
      unique: true,
    },
    moderated: DataTypes.INTEGER,
  },
  {timestamps: false},
   {});
  Office.associate = function(models) {
    /*models.Office.hasMany(models.User)*/
    models.Office.belongsToMany(models.Posts,{through:'post_has_office'})
  };
  return Office;
};