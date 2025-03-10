import { AppDataSource } from "./data-source";

const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to MySQL database");
  } catch (error) {
    console.log("Error connecting to MySQL database", error);
  }
};

export default dbConnectMysql;
