import { sequelize } from "../config/db";

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class AccountModel extends Model<
  InferAttributes<AccountModel>,
  InferCreationAttributes<AccountModel>
> {
  declare id: number;
  declare balance: number;
}

AccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "accounts",
    timestamps: false,
  }
);