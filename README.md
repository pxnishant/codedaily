<div align="center">

<h3>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	<a href ="https://codedaily.tech">codedaily.tech</a>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>


this website emails you links to one or more leetcode questions daily.
<h4>technologies used</h4>

`react` `node.js` `express.js` `passport.js` `mongodb`
</div>

<h4>Idea</h4>

It is easy to forget to do LeetCode (or not be motivated for it), especially if you're working or have college. It is also difficult to choose problems. If you're someone that checks emails daily or gets a mobile notification, this website can help you be consistent.
___

<h4>Features</h4>

`1` Retro interface

`2` Login / Signup via Google

`3` You receive an email with a welcome question the moment you signup

`3` Can choose up upto 3 questions daily (only 3 due to limitations of my email service)

`4` Can choose difficulty and topics for each question individually

`5` Each question is a valuable question, as it has been randomly picked from the 500 most liked LeetCode questions.
____

<h4>Installation</h4>

`1` Make a .env file inside `/frontend`, insert the following values:
```
VITE_API_URL = Backend URL (e.g. http://localhost:8080)
```

`2` Make a .env file inside `/backend`, insert the following values:
```
CLIENT_ID = Google Console Client ID (For Google Authentication)
CLIENT_SECRET = Google Console Client Secret
CLIENT_URL = Frontend URL (e.g. http://localhost:5173)
NODE_ENV = Use `dev` for development, `production` if you're deploying
MONGODB_URI = Database URL
SESSION_SECRET = Generate & enter a random key for secure authentication (this value is not necessary)
```
`3` In terminal, do `npm run dev` at `/backend`
  
`4` In terminal, do `npm run dev` at `/frontend`
___

<h4>Known Issues</h4>

`There is currently no option to unsubscribe`

This was simply a lack of foresight. I will add it as soon as I get time.
