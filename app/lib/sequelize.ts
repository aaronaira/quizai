import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    pool: {
        max: 10, // conexiones máximas
        min: 0,
        acquire: 60000, // tiempo máximo para intentar conectar (milisegundos)
        idle: 10000 // tiempo de espera antes de liberar una conexión (milisegundos)
    },
    logging: true
});


(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false })
        console.log("✅ Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
    }
})();




export default sequelize;