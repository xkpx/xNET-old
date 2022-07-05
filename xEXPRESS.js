// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
// The adapter creates two files in your build directory — index.js and handler.js. 
// Running index.js — e.g. node build, if you use the default build directory — will start a server on the configured port.
import { handler } from './xbuild-node/handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
  console.log('listening on port 3000 - express');
});
