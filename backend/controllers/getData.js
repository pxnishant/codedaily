const User = require("../database/User.js");

module.exports = async (req, res) => {

    const count = await User.countDocuments({ email: req.headers.email });
    
    if (count != 0) {

        const curr = await User.findOne({email : req.headers.email});
        return res.status(200).json(curr);

    }

    else {
        await User.create({
            email: req.headers.email,
            difficulty: new Array(9).fill(false),
            topics: new Array(24).fill(false)
        });
    }

}
