const { PORT } = require('./common/config.ts');
const app = require('./app.ts');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
