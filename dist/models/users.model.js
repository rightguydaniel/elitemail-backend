"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.sub = exports.role = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database/database");
var role;
(function (role) {
    role["ADMIN"] = "Admin";
    role["USER"] = "User";
    role["COMPANY"] = "Company";
})(role || (exports.role = role = {}));
var sub;
(function (sub) {
    sub["MONTHLY"] = "Monthly";
    sub["PAYG"] = "PayG";
})(sub || (exports.sub = sub = {}));
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
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
    subStartDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
    },
    subEndDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
    },
    subType: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(sub)),
        allowNull: false,
    },
    units: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
}, {
    sequelize: database_1.database,
    tableName: "Users",
    timestamps: true,
});
exports.default = Users;
