import 'dotenv/config';
import { handler } from './build/handler.js';
import express from 'express';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(handler);
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
console.log('API: ' + process.env.API);