
'use strict'

// authentication control middleware
// header ile gelen token i check yapalim

const Token = require('../models/token.model')

module.exports = async (req, res, next) => {

    req.user = null

    // header da soyle bir yapida olabilir. isimleri degisebilir 
    
    // Authorization: Token token
    // Authorization: ApiKey token
    // Authorization: Bearer token
    // Authorization: Auth token
    // Authorization: X-API-KEY token
    // Authorization: x-auth-token token
    

    // get token from headers

    const auth = req.headers?.authorization || null
    // bu ustten Token token datasi gelecek

    const tokenKey = auth ? auth.split(' ') : null
    // eger auth varsa bunu ['Token', 'token'] olarak ayir

    if(tokenKey && tokenKey[0] == 'Token') {
        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId')

        // userId user data sini iceriyor
        if (tokenData) req.user = tokenData.userId
    }



    next()

}