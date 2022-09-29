import { expressjwt } from "express-jwt";

const guardAuthJWT = expressjwt({
    secret: process.env.JWT_TOKEN_SECRET,
    issuer: process.env.BASE_URL,
    algorithms: ['HS256'],
    isRevoked: async (req, token) => {
        // Gestion des tokens echus
        

    }
});

const guardRefreshToken = expressjwt({
    secret: process.env.JWT_REFRESH_SECRET,
    issuer: process.env.BASE_URL,
    algorithms: ['HS256'],
    requestProperty: "refreshToken",
    getToken: req => {
        return req.body.refreshToken
    }
})

export { guardAuthJWT, guardRefreshToken }