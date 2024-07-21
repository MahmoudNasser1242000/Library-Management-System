import { sequelize } from "../dbConnection.js";
import { DataTypes } from "sequelize";
import userModel from "./users.js";

const bookModel = sequelize.define(
    "Book",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            values: [true, false],
            defaultValue: true
        }
    },
    {
        timestamps: true,
    }
);

sequelize.sync({alter: false, force: false});

export default bookModel;
