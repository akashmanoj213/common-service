const {logger} = require("./logger")

let traceId;

setTraceId = (traceId) => {
    logger.info("TraceId set - ", traceId);
    traceId = traceId;
}

getTraceId = () => {
    logger.info("Retrieving traceId - ", traceId);
    return traceId;
}

module.exports = {
    setTraceId,
    getTraceId
}