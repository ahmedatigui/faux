//'use strict';

const Hapi = require('@hapi/hapi');
const { createRandomUser, users } = require('./test');
//import Hapi from '@hapi/hapi';
//import { createRandomUser, users } from './test';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {

            return users;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
