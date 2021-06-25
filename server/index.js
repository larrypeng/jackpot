const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());

const bank = {}

//Get request
app.get('/bank', (req, res) => {
    res.send(bank);
});


//Post request
app.post('/bank', (req, res) => {
    const { balance } = req.body;

    //Plug in the bank balance data
    bank['records'] = {
        balance
    };

    //Return status
    res.status(201).send(bank['records']);
});

app.listen(4000, () => {
    console.log('Listening on 4000');

})