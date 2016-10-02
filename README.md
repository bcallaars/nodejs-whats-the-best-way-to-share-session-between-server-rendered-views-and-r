# Best ways to share session between server and front end

This approach uses a cookie session on the [koa](http://koajs.com/) side, after which any front end request will include the session cookie on every request. The elegancy of this method is that you don't have to make the front end aware of the session id. Security wise the session cookie is `HTTP Only`, which makes it impossible for front end scripts to access the cookie in the first place.

Original question found [here on StackOverflow](http://stackoverflow.com/questions/39810977/nodejs-whats-the-best-way-to-share-session-between-server-rendered-views-and-r/39814832#39814832).
