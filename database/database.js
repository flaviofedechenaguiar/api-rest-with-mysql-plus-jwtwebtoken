const Sequelize = require('sequelize');
const connection = new Sequelize('api-database', 'root', '', {
    host: 'mysql-api',
    dialect: 'mysql'
})

module.exports = connection;