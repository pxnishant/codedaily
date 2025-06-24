const User = require("../database/User.js");

module.exports = async (req, res) => {
    try {
        console.log("Getting data for:", req.query.email);

        const existingUser = await User.findOne({ email: req.query.email });

        if (existingUser) {
            return res.status(200).json(existingUser);
        }

        const newUser = await User.create({
            email: req.query.email,
            problems: [],
            sent: []
        });

        return res.status(200).json(newUser);
        
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
