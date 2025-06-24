const leetcode = require("../leetcodeData.js");
const User = require("../database/User.js");
const { Resend } = require("resend");
const dotenv = require('dotenv')
dotenv.config()

const resend = new Resend(process.env.RESEND_KEY);

function findQ(sentAlready, randomD, tarr) {
}

async function sendAll() {

    const users = await User.find().select({_id: 0, email: 1, problems: 1, sent: 1});
    
    for (let i = 0; i<users.length; i++) {

        const email = users[i].email;
        const problems = users[i].problems;
        let sentAlready = users[i].sent;

    }

}

module.exports = async (req, res) => {

    const result = await sendAll();

    res.status(200).send("Sent email to everyone!")

}