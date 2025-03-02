// models/PDF.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Definir atributos del modelo
interface PDFAttributes {
    id?: string;
    name: string;
    hash: string;
    size: number;
    content: string;
    userId: string;
}

// Especificar qué atributos son opcionales al crear un PDF
interface PDFCreationAttributes extends Optional<PDFAttributes, 'id'> { }

class PDF extends Model<PDFAttributes, PDFCreationAttributes> implements PDFAttributes {
    declare id: string;
    declare name: string;
    declare hash: string;
    declare size: number;
    declare content: string;
    declare userId: string;
}

export default (sequelize: Sequelize) => {
    PDF.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hash: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'PDF',
            tableName: 'pdfs', // Nombre explícito de la tabla en la BD
            timestamps: true, // Agrega createdAt y updatedAt automáticamente
        }
    );

    return PDF;
};
