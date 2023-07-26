const jwt = require("jsonwebtoken")



const jwtMiddleware = async (req, res, next) => {
    const token = req.headers['token']
    const splitToken = token.split(' ')[1]
    if (!token) {
        return res.status(403).json('Not authorized!')
    }
    jwt.verify(splitToken, '1234', (err, user) => {
        if (err) {
            return res.status(403).json('Unauthorized')
        }
        res.locals.currentObject = user
        next()
    })
}

// const jwtMiddlewareAdmin = async (req, res, next) => {
//     const token = req.headers['token']
//     const splitToken = token.split(' ')[1]

//     if (!token) {
//         return res.status(403).json('Not authorized!')
//     }
//     jwt.verify(splitToken, '1234', (err, user) => {
//         if (err) {
//             return res.status(403).json('Unauthorized')
//         }
//         if(!user.isAdmin){

//         }
//         res.locals.currentObject = user
//         next()
//     })
// }




module.exports = { jwtMiddleware }