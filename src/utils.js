const jwt = require('jsonwebtoken')
const APP_SECRET = 'securesecrethere'

function getUserId(context) {
    const authorization = context.request.get('Authorization')

    if (authorization) {
        const token = authorization.replace('Bearer', '').replace(' ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    } else {
        throw new Error('No authorization headers present')
    }
}

module.exports = {
    getUserId,
    APP_SECRET
}