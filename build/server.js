import { app } from './app';
// import { connectToDb } from './common/db';
app.listen(process.env.PORT, () => console.log(`App is running on http://localhost:${process.env.PORT}`));
