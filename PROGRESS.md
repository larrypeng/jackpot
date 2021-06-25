# Development notes

Use create-react-app to scaffold the app

onMouseLeave bug: Doesn't trigger when button is disabled. Use onPointerLeave instead
https://github.com/facebook/react/issues/18753

SVG assets are downloaded from freesvg.org. Credit goes to this fantastic site.

Server with express.js
cd jackpot/server
npm init -y
npm install express cors axios nodemon
More information, use README file under JACKPOT/server/README.md

Message board shake effect: Credit goes to https://codepen.io/mcvazin/pen/bMOVPy

# Future improvements/TODOs

------Server side-------

Cashout button click event is incomplete(jumping or becoming unclickable were completed) by hooking up with express server

express server can handle get/post request, but only with in-memory storage, need to develop for file/database support

Frontend: need to implement logic with axios package to talk to backend to get bank balance.

Use Redux to manage the state in one single store for the entire app

Factor button group out to its own component

Write automated tests

Create truly rolling effect to blocks

Change "Play the game" button to a moving lever that mimics a rolling machine when clicking

Animation when earning credits, and transfering credits to bank such as stars, congratuation and good job kind of thing
