import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('library management system', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});
export const testConnection = async () => {
    return await sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
}