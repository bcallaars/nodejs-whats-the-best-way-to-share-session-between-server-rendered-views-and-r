'use strict';

const session = require('koa-session');
const koa = require('koa');
const websockify = require('koa-websocket');
const route = require('koa-route');

const app = websockify(koa());

app.keys = ['some secret hurr'];
const sessionStore = session(app);

app.use(sessionStore);
app.ws.use(sessionStore);

app.use(route.all('/', function* (next) {
  // ignore favicon
  if (this.path === '/favicon.ico') return;

  let n = this.session.views || 0;
  this.session.views = ++n;
  yield next;
}));

app.ws.use(route.all('/', function* (next) {
  this.websocket.on('message', (message) => {
    let n = this.session.views || 0;
    this.session.views = ++n;

    if (message === 'ping') {
      // Return the amount of sessions (n) when the client sends ping
      this.websocket.send('pong ' + n);
    }
  });

  yield next;
}));

app.use(require('koa-static')('./public'));

app.listen(3000);
console.log('listening on port 3000');
