
import { DataTypes } from 'sequelize';
import connection_db from '../database/connection_db';
import UserModel from './UserModel';

const NewsModel = connection_db.define('News', {
   id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unique: true
   },
   title:{
      type: DataTypes.STRING(50),
      allowNull: false
   },
   content:{
      type: DataTypes.TEXT,
      allowNull: false
   },
   date:{
      type: DataTypes.DATE,
      allowNull: false
   },
   image:{
      type: DataTypes.STRING,
      allowNull: false
   },
   user_id:{
      type: DataTypes.BIGINT,
      references:{
         model:UserModel,
         key: 'id'
      }
   },
},
{
   tableName: 'news', 
   timestamps: true // Habilitando los campos los campos createdAt y updatedAt
}
);

/* UserModel.hasMany(NewsModel, { foreignKey: 'user_id' }); */
console.log(NewsModel === connection_db.models.News); // devuelve true


export default NewsModel; 