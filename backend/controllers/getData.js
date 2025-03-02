const User = require("../database/User.js");

module.exports = async (req, res) => {

    console.log("getting data", req.query.email)
    const count = await User.countDocuments({ email: req.query.email });
    
    if (count != 0) {
        const curr = await User.findOne({email : req.query.email});
        return res.status(200).json(curr);
    }

    else {
        await User.create({
            email: req.query.email,
            difficulty: new Array(9).fill(false),
            topics: new Array(24).fill(false)
        });
        const curr = await User.findOne({email : req.query.email});
        return res.status(200).json(curr);
    }

    

}
