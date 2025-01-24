"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.role = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database/database");
var role;
(function (role) {
    role["ADMIN"] = "Admin";
    role["USER"] = "User";
    role["COMPANY"] = "Company";
})(role || (exports.role = role = {}));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mailName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(role)),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.database,
    tableName: "Users",
    timestamps: true
});
exports.default = User;
