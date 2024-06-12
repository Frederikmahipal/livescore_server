import express from 'express';
import cors from 'cors';
import router from './api/routes.js';

const app = express();
app.use(cors());
app.use('/api', router);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});