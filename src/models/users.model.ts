import { DataTypes, Model } from "sequelize";
import { database } from "../config/database/database";

export enum role {
  ADMIN = "Admin",
  USER = "User",
  COMPANY = "Company",
}

export enum sub {
  MONTHLY = "Monthly",
  PAYG = "PayG",
}

export interface UsersAttributes {
  id: string;
  userName: string;
  mailName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  subStartDate?: Date;
  subEndDate?: Date;
  subType?: string;
  units?: number;
}

export class Users extends Model<UsersAttributes> {
  [x: string]: any;
}
Users.init(
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
    subStartDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    subEndDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    subType: {
      type: DataTypes.ENUM(...Object.values(sub)),
      allowNull: false,
    },
    units: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    tableName: "Users",
    timestamps: true,
  }
);

export default Users;
