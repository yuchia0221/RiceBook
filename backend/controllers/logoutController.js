const User = require("../model/User");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.sessionId) return res.sendStatus(204);

    req.app.sessions.delete(cookies.sessionId);
    res.clearCookie("sessionId", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(200);
};

module.exports = { handleLogout };
