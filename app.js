// start app
// if we had different env configurations, do it here

const server = require('./server/server');

server.start({
    port: 9000
})
