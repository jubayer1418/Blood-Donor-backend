import app from "./app";
import config from "./config";
import prisma from "./shared/prisma";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port: ${config.port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
  }
}

main();
