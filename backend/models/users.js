import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import bookModel from "./books.js";

const userModel = sequelize.define(
    "User",
    {
        username: {
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ["admin", 'user'],
            defaultValue: "user",
        },
    },
    {
        timestamps: true,
    }
);

userModel.hasMany(bookModel, {
    foreignKey: { name: "borrowerId" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

sequelize.sync({ alter: false, force: false });

export default userModel;
