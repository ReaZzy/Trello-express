import { app } from './app';
import { connectToDb } from './common/db';
import { envConfig } from './ormconfig';

connectToDb().then(
  () => {
    app.listen(envConfig.PORT,
      () => console.log(`App is running on http://localhost:${envConfig.PORT}`));
  },
);
