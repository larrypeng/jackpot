# Development notes

Use create-react-app to scaffold the app

onMouseLeave bug: Doesn't trigger when button is disabled. Use onPointerLeave instead
https://github.com/facebook/react/issues/18753

SVG assets are downloaded from freesvg.org. Credit goes to this fantastic site.

Server with express.js
cd jackpot/server
npm init -y
npm install express cors axios nodemon

Need to finish the cashOut function by hooking up frontend to express server

Message board shake effect: Credit goes to https://codepen.io/mcvazin/pen/bMOVPy

# Future improvements

------Server side-------

Use Redux to manage the state in one single store for the entire app

Factor button group out to its own component

Allow Message Board to stack up game logs with timestamp

Write automated tests

-------Client side-------
Create a scoring table:
Symbos Credits
3 c ---> 10
3 l ---> 20
3 o ---> 30
3 w ---> 40

Create truly rolling effect to blocks

Change "Play the game" button to a moving lever that mimics a rolling machine when clicking

Animation when earning credits, and transfering credits to bank such as stars, congratuation and good job kind of thing
