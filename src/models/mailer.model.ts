import { DataTypes, Model } from "sequelize";
import { database } from "../config/database/database";

export interface MailerAttributes {
  id: string;
  userId: string;
  mailUser: string;
  mailPass: string;
  mailServer:string;
  mailPort:number;
}

export class Mailer extends Model<MailerAttributes> {
  [x: string]: any;
}
Mailer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mailUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailPass: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    mailServer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailPort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Mailer",
    timestamps: true
  }
);

export default Mailer;
