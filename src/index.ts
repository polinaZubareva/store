import express from 'express';
import { db } from './db';
import cors from 'cors';
import router from './routes';

const PORT = process.env.PORT || 5000;

const application = express();

application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
application.use('/', router);

function startApplication() {
  try {
    db.authenticate().then(() => {
      console.log('Connection enabled');
    });
    db.sync();

    application.listen(PORT, () => {
      console.log(`Application started on PORT ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

startApplication();
