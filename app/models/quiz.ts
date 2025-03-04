import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface QuizAttributes {
    id?: string;
    pdfId: string;
    questions: object;
    score?: number;

}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> { }

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
    declare id: string;
    declare pdfId: string;
    declare questions: object;
    declare score: number;
}

export default (sequelize: Sequelize) => {
    Quiz.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            pdfId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            questions: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            score: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Quiz",
            tableName: "quizzes",
            timestamps: true,
        }
    );

    return Quiz;
};
