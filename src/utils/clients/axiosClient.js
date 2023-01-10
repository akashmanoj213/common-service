const axios = require('axios').default;
const { getTraceId } = require('../traceId')

const post = async (url, body, params = null, headers = null, includeTrace = false) => {
    if (includeTrace) {
        const traceId = getTraceId();
        headers = {
            ...headers,
            "trace-id": traceId
        }
    }

    const result = await axios.post(url, body, {
        params,
        headers
    });

    return result.data;
}

module.exports = {
    post
}