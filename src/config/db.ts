import { Sequelize } from "sequelize";

// Connection parameters
export const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
