import { sequelize } from "../config/db";

import { DataTypes, Model } from "sequelize";

export class TransactionModel extends Model {
  declare accountId: number;
  declare transactionType: string;
  declare amount: number;
  declare date: Date;
}

TransactionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "accountid",
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "transactiontype",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    timestamps: false,
  }
);
