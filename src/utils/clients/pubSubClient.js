const { PubSub } = require('@google-cloud/pubsub');
const { logger } = require('../../utils/logger');
const { getTraceId, setTraceId } = require('../traceId');

const publishMessage = async (data, topicName) => {
    try {
        const pubSubClient = new PubSub();

        const strData = JSON.stringify(data);
        const dataBuffer = Buffer.from(strData);

        const traceId = getTraceId();

        // const messageId = await pubSubClient
        //     .topic(topicName)
        //     .publishMessage({ data: dataBuffer });

        const attributes = {
            traceId
        }

        const messageId = await pubSubClient
            .topic(topicName)
            .publishMessage(dataBuffer, attributes)

        logger.info(`Message ${messageId} published.`);
        return messageId;
    } catch (err) {
        logger.error(err, `Error occured while trying to publish message to topic ${topicName}!`);
        throw err;
    }
}

const retrieveTraceId = (body) => {
    if (!body || !body.message) throw new Error("Invalid message format!");

    const { message: { attributes } } = body;

    if (!attributes || !attributes.traceId) throw new Error("traceId attribute not found!");
}

module.exports = {
    publishMessage,
    retrieveTraceId
}