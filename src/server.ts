import { app } from './app';
import { envConfig } from './common/config';
import { connectToDb } from './common/db';

connectToDb().then(
  () => {
    app.listen(envConfig.PORT,
      () => console.log(`App is running on http://localhost:${envConfig.PORT}`));
  },
);
