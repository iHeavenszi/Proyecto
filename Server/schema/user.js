const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../src/database.js"); // Importamos la conexión

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'users', // Aquí defines el nombre de la tabla en la base de datos
    timestamps: false, // Si tu tabla tiene campos `createdAt` y `updatedAt`
});

// Hook para encriptar la contraseña antes de guardar
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

module.exports = User;