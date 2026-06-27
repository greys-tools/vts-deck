import 'dotenv/config';
import open from 'open';

import { server } from './build/index.js';

async function setup() {
  await open(server.url?.href ?? 'http://127.0.0.1:3000');
}

setup();