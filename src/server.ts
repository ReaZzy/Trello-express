const { PORT } = require('./common/config.ts');
const app = require('./app.ts');

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}`)
);
