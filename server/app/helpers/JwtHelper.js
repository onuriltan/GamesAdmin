const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        return bearerToken;
    } else {
        return null;
    }
};

const decodeToken = async (req) => {
    const bearerToken = verifyToken(req);
    if (bearerToken !== null) {
        let userData = null;
        try {
            userData = jwt.verify(bearerToken, process.env.JWT_SECRET);
        } catch (err) {
            console.log("Error verifying token");
        }
        return userData
    } else {
        return null;
    }
};

module.exports.decodeToken = decodeToken;
module.exports.verifyToken = verifyToken;
