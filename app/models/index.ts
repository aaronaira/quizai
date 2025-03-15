// models/index.ts
import sequelize from '../lib/sequelize';
import User from './user';
import PDF from './pdf';
import Quiz from './quiz';


const models = {
    User: User(sequelize),
    PDF: PDF(sequelize),
    Quiz: Quiz(sequelize)
};

models.User.hasMany(models.PDF, { foreignKey: 'userId', onDelete: 'CASCADE' });
models.PDF.belongsTo(models.User, { foreignKey: 'userId' });
models.PDF.hasMany(models.Quiz, { foreignKey: 'pdfId', onDelete: 'CASCADE' })
models.Quiz.belongsTo(models.PDF, { foreignKey: 'pdfId' })

export { sequelize, models };

