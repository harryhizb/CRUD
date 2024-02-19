const { DataTypes } = require('sequelize');
const { sequelizeDb } = require('../connection/db');

const Task = sequelizeDb.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

module.exports = 
    Task
;