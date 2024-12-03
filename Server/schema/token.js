const { DataTypes } = require("sequelize");
const sequelize = require("../src/database.js"); // Conexión a la base de datos
const User = require("./user.js");

const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED, // Asegúrate de definirlo como UNSIGNED
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE", // Elimina tokens si el usuario es eliminado
    },
}, {
    tableName: "tokens",
    timestamps: false,
});

module.exports = Token;
