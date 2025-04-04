import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    logging: false
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