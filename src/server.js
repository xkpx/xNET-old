// https://kit.svelte.dev/docs/migrating#project-files-src-server-js
// my-server.js
import { handler } from './xbuild/handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(80, () => {
  console.log('listening on port 80');
});