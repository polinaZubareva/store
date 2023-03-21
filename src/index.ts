import express from 'express';
import { db } from './db';
import cors from 'cors';
import router from './routes';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 5000;

const application = express();

application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
application.use('/', router);

async function startApplication() {
  let retries = 5;
  try {
    while (retries) {
      try {
        await db.authenticate().then(() => {
          console.log('Connection enabled');
        });
        db.sync();
        break;
      } catch (error) {
        console.log(error);
        retries -= 1;
        await new Promise((res) => {
          setTimeout(res, 3000);
        });
      }
    }

    application.listen(+PORT, '0.0.0.0', () => {
      console.log(`Application started on PORT ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

startApplication();
