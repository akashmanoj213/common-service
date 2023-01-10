//load environment variables from .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ override: "true" });
}

const http = require('http');
const express = require('express');
const cors = require('cors');
// const { testConnection, createTables } = require('./services/database');

async function startServer() {
    const { setMiddleWare } = require('./app');
    //Test db connection
    // await testConnection();

    //Initialise DB table - create tables if not present
    // await createTables();

    const app = await setMiddleWare();
    const port = parseInt(process.env.PORT) || 8080;
    const server = http.createServer(app);
    server.listen(port, () => console.log(`App listening on port: ${port}...`));
}

startServer();