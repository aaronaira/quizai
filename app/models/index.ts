// models/index.ts
import sequelize from '../lib/sequelize';
import User from './user';
import PDF from './pdf';


const models = {
    User: User(sequelize),
    PDF: PDF(sequelize),
};

models.User.hasMany(models.PDF, { foreignKey: 'userId', onDelete: 'CASCADE' });
models.PDF.belongsTo(models.User, { foreignKey: 'userId' });

export { sequelize, models };

