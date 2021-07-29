### To run the express based server app

In root folder, use the following command to run the server
npm start

Use nodemon package, configured in package.json - scripts section
nodemon index.js

### Test out the server post and get request

I used postman client to do that

localhost:400/bank/
POST:
Header: Key: Content-Type, Value: application/json
Body: select "raw"
{"balance":5}
Click Send

GET:
Header: Key: Content-Type, Value: application/json
Output:
{
"records": {
"balance": 5
}
}

### Future Improvement

Modify logic to overwrite the json file
