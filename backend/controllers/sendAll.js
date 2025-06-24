const User = require("../database/User.js");
const Problem = require("../database/problemSchema.js");
const { Resend } = require("resend");
const dotenv = require('dotenv')
dotenv.config()

const resend = new Resend(process.env.RESEND_KEY);

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = dayNames[today.getDay()];

const sendEmail = async (user) => {

    const email = user.email;
    let emailText = `Happy ${dayOfWeek}! Your questions of the day:<br><br>`;
    let count = 1;
    const newlySent = [];

    for (const problem of user.problems) {

        const difficultyArr = problem.difficulty.map(d => d.value);
        const tagArr = problem.tags.map(t => t.value);

        console.log(difficultyArr);
        console.log(tagArr);

        const problemToSend = await Problem.findOne({
            Difficulty: { $in: difficultyArr }, 
            Tags: { $in: tagArr },
            ID: { $nin: user.sent }
        })

        if (!problemToSend) {
            console.log("Can't find a problem to send.")
            continue;
        }
        console.log(problemToSend)

        emailText += `
            <strong>Question ${count} - </strong>
            <a href="${problemToSend["URL"]}">${problemToSend["Name"]}</a><br>
        `;

        count++;
        newlySent.push(problemToSend["ID"]);

    }

    if (count === 1) return;

    try {
        console.log("Attempting to send email")
        const { data, error } = await resend.emails.send({
            from: "CodeDaily <nishant@codedaily.tech>",
            to: email,
            subject: "Your daily LeetCode Question",
            html: emailText,
          });
        console.log("Sent email")
    }
    catch {
        console.log("Error sending email")
    }
    

    user.sent.push(...newlySent);
    await user.save();

}

async function sendAll() {

    const users = await User.find()
    
    for (const user of users) {
        try {
            await sendEmail(user);
            console.log("Handled: ", user.email)
        }
        catch {
            console.log("Couldn't handle: ", user.email)
        }
    }

}

module.exports = async (req, res) => {

    const result = await sendAll();

    res.status(200).send("Sent email to everyone!")

}