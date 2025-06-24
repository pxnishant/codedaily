const User = require("../database/User.js");

module.exports = async (req, res) => {
    
  try {
    const { email, problems } = req.body;

    if (!email || !Array.isArray(problems)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        problems: problems,
        sent: []
      });
      return res.status(201).json({ message: 'User successfully created' });
    }

    user.problems = problems;
    await user.save();

    return res.status(200).json({ message: 'User problems successfully updated' });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Error adding/updating user', error: error.message });
  }
};
