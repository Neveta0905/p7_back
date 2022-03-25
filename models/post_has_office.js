'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const Post_has_Office = sequelize.define('Post_has_Office', {
    offices_id:{      
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    posts_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {timestamps: false},
   {});
  Post_has_Office.removeAttribute('id');
  return Post_has_Office;
};