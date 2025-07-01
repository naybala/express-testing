import app from './app.js'
import prisma from '../config/db.js';

(async () => {
  try {
    await prisma.$connect();
    console.log("Connected to Mysql Db");
    app.listen(3000, () => {
      console.log("Server is running at port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
  }
})();
