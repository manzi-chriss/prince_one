const jwt= require('jsonwebtoken');

function extractUserIdFromToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    const decodedToken = jwt.decode(token);
    const userId = decodedToken ? decodedToken._id : null;

    return userId;
}


module.exports = {extractUserIdFromToken}