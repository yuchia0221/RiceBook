const jwt = require("jsonwebtoken");

const verifyAccess = (req, res, next) => {
    const token = req.cookies.sessionId;
    if (!token || !req.app.sessions.has(token)) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded.username;
        next();
    });
};

module.exports = verifyAccess;
