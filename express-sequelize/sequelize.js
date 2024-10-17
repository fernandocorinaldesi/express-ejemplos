const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    `prueba`,
    `postgres`,
    `admin`,
    {
    host: `localhost`,
    dialect: 'postgres',
    port: `5432`, 
    logging: (str) => { console.log("sequelize: "+str) },
    define: {
        timestamps: true,
        freezeTableName: true,
        paranoid: true
    },
    operatorsAliases: 0,
    dialectOptions: {
        prependSearchPath: true
    }
})

module.exports = sequelize
