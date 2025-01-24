import { DataTypes, Model } from "sequelize";
import { database } from "../config/database/database";

export enum role {
  ADMIN = "Admin",
  USER = "User",
  COMPANY = "Company",
}

export interface UserAttributes {
  id: string;
  userName: string;
  mailName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
}

export class User extends Model<UserAttributes> {
  [x: string]: any;
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: database,
    tableName: "Users",
    timestamps: true
  }
);

export default User;
