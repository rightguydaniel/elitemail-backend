"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database/database");
class Mailer extends sequelize_1.Model {
}
exports.Mailer = Mailer;
Mailer.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    mailUser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mailPass: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    mailServer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mailPort: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.database,
    tableName: "Mailer",
    timestamps: true
});
exports.default = Mailer;
