const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./api/routes/payment');
const {traceLogger} = require('./api/middlewares/traceLogger')

async function setMiddleWare() {
    const app = express();

    //Application Middlewares
    app.use(traceLogger)

    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.status(200).send('Api is working properly!');
    });

    //Routes
    app.use('/payment', paymentRoutes);

    //Global Error handling
    // app.use((err, req, res, next) => {
    //     req.log.error({ err });
    //     return res.status(500).json("Internal Server Error");
    // });

    return app;
}

module.exports = {
    setMiddleWare
};