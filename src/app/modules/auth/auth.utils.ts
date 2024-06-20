import jwt from 'jsonwebtoken';

const createToken = (jwtPayload: any, secret: string, expiresIn: string) => {
    return jwt.sign(
        jwtPayload,
        secret,
        {
            expiresIn
        }
    )
};

export default createToken;