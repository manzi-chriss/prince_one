const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Unauthorized Access. First Login' });
    jwt.verify(token,process.env.SECRET, (err, decoded) => { if (err) return res.status(403).send({ message: 'Forbidden to modify the Token. Login again' });
         req.user = decoded;
         next();
    });
}

module.exports = {verifyToken}