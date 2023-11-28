import { sequelize } from "./db";

export default class Config {
  static startup() {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Sequelize: Connected successfully");
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }
}
