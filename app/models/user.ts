import sequelize from '../lib/sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
    id: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    email_verified?: Date | null;
    image?: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare name: string | null;
    declare email: string | null;
    declare password: string | null;
    declare image: string | null;

    toJSON() {
        return { ...this.get() };
    }
}

User.init(
    {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4, // Para generar UUID automáticamente
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email_verified: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        defaultScope: {
            attributes: {
                include: ['id', 'name', 'image', 'email', 'password']
            }
        },
        timestamps: false,

    }
);

export default User;