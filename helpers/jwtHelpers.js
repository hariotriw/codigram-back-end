const jwt = require('jsonwebtoken')

const tokenGenerator = (data) => {
    const {id, uuid, username, email, status, password} = data
    return jwt.sign({
        id, uuid, username, email, status
    }, password)
}

const tokenVerifier = (data, password) => {
    return jwt.verify(data, password)
}

module.exports = {
    tokenGenerator, tokenVerifier
}