const { Sequelize } = require('sequelize');

const sequelizeDb = new Sequelize('database', 'root', 'hizbullah@', {
    host: '127.0.0.1',
    dialect: 'mysql', 
});

// Test the connection
sequelizeDb.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    sequelizeDb,
};
