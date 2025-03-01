const leetcode = require("../leetcodeData.js");
const User = require("../database/User.js");
const { Resend } = require("resend");
const dotenv = require('dotenv')
dotenv.config()

const resend = new Resend(process.env.RESEND_KEY);

function findQ(sentAlready, randomD, tarr) {

    for (let index = 0; index < leetcode.length; index++) {
        const item = leetcode[index];
        let alr = false;

        for (let i = 0; i<sentAlready.length; i++) {
            if (parseInt(item.id, 10) == sentAlready[i]) {
                alr = true;
            }
        }

        if (alr) {
            continue;
        }

        if (item.difficulty == randomD) {
            let rowtopics = JSON.parse(item.tags);

            for (let i = 0; i < tarr.length; i++) {
                for (let j = 0; j < rowtopics.length; j++) {
                    if (tarr[i] == rowtopics[j]) {
                        console.log([item.title, item.link, item.id]);
                        return [item.title, item.link, item.id];
                    }
                }
            }

        }
    }

    return ['', '', -1];
}

async function sendAll() {

    const users = await User.find().select({_id: 0, email: 1, difficulty: 1, topics: 1, sentAlready: 1});
    
    for (let i = 0; i<users.length; i++) {

        const email = users[i].email;
        const difficulty = users[i].difficulty;
        const topics =  users[i].topics;
        let sentAlready = users[i].sentAlready;

        let q1 = ['name', 'url', -1]
        let q2 = ['name', 'url', -1]
        let q3 = ['name', 'url', -1]

        //question 1
        let darr = []
        let tarr = []
        
        difficulty.forEach((item, index) => {

            if (index < 3 && item == 1) darr.push(index+1)

        })

        topics.forEach((item, index) => {

            if (index <= 7 && item == 1) tarr.push(index+1)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q1 = findQ(sentAlready, randomQ, tarr)

            if (q1[2] != -1) {
                sentAlready.push(q1[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }
                       
        }
        
        //question 2

        darr = []
        tarr = []
        
        difficulty.forEach((item, index) => {

            if (index >= 3 && index <= 5 && item == 1) darr.push(index-2)

        })

        topics.forEach((item, index) => {

            if (index >= 8 && index <= 15 && item == 1) tarr.push(index-7)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q2 = findQ(sentAlready, randomQ, tarr)

            if (q2[2] != -1) {
                sentAlready.push(q2[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }
                       
        }
        //question 3
        darr = []
        tarr = []
        
        difficulty.forEach((item, index) => {

            if (index >= 6 && index <= 8 && item == 1) darr.push(index-5)

        })

        topics.forEach((item, index) => {

            if (index >= 16 && item == 1) tarr.push(index-15)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q3 = findQ(sentAlready, randomQ, tarr)

            if (q3[2] != -1) {
                sentAlready.push(q3[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }

        }

        if (q3[2] != -1 && q2[2] == -1) {
            q2 = [...q3]
            q3[2] = -1;

        }

        if (q2[2] != -1 && q1[2] == -1) {
            q1 = [...q2]
            q2[2] = -1;

        }

        let emailtext = `Here are your questions of the day!<br><br>`;

        if (q1[2] != -1) {
            emailtext += `
                <strong>Question 1: </strong><br>
                <a href="${q1[1]}">${q1[0]}</a><br>
            `;
        }
        
        if (q2[2] != -1) {
            emailtext += `
                <strong>Question 2: </strong><br>
                <a href="${q2[1]}">${q2[0]}</a><br>
            `;
        }
        
        if (q3[2] != -1) {
            emailtext += `
                <strong>Question 3: </strong><br>
                <a href="${q3[1]}">${q3[0]}</a><br>
            `;
        }

        if (q1[2] != -1 || q2[2] != -1 || q3[2] != -1) {

            const { data, error } = await resend.emails.send({
                from: "CodeDaily <nishant@codedaily.tech>",
                to: email,
                subject: "Your daily LeetCode Question",
                html: emailtext,
              });
              
              console.log('sending to', q1, q2)

        }

    }

}

module.exports = async (req, res) => {

    const result = await sendAll();

    res.status(200).send("Sent email to everyone!")

}
