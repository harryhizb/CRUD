const { DataTypes } = require("sequelize")
const { sequelizeDb } = require("../connection/db")

const users = sequelizeDb.define( 'users' , {
    
id : {
    type:  DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true ,
},

name : {
    type: DataTypes.STRING,
    allowNull: false,
},
password :{
    type: DataTypes.STRING,
    allowNull:false,
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
},
userType:{
    type:DataTypes.STRING,
    defaultValue:'users',
},
imageUrl: {
    type: DataTypes.STRING,
    defaultValue:'',
},
},
{
    tableName:'users',
    timestamp: true ,
});
module.exports = users;
