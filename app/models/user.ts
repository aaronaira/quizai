import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

export interface UserAttributes {
    id?: string;
    name: string;
    email: string;
    password: string;
    image?: string | null;
}

export default (sequelize: Sequelize) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        declare id: string;
        declare name: string;
        declare email: string;
        declare password: string;
        declare image: string | null;

        async comparePassword(candidatePassword: string): Promise<boolean> {
            return bcrypt.compare(candidatePassword, this.password);
        }
    }

    User.init(
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
        }
    );

    User.addHook('beforeCreate', async (user: User) => {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Failed to hash password');
        }
    });


    return User;
};
