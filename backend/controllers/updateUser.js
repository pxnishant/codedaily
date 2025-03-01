const User = require("../database/User.js");

module.exports = async (req, res) => {

    try {

        const { email, difficulty, topics } = req.body;

        const count = await User.countDocuments({ email: email });

        if (count === 0) {

            await User.create({
                email: email,
                difficulty: difficulty,
                topics: topics
            });

            res.status(201).json({ message: 'User successfully added' });

        }
        
        else {

            await User.updateOne({ email: email }, {
                difficulty: difficulty,
                topics: topics
            });

            res.status(200).json({ message: 'User successfully updated' });

        }

    }
    
    catch (error) {

        res.status(500).json({ message: 'Error adding/updating user', error: error.message });
        
    }
}
