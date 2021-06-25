### To run the express based server app

Use nodemon package, configured in package.json - scripts section
nodemon index.js

### Test out the server post and get request

I used postman client to do that

/post
Header: Key: Content-Type, Value: application/json
Body: select "raw"
{"balance":5}
Click Send

/get
Header: Key: Content-Type, Value: application/json
Output:
{
"records": {
"balance": 5
}
}

### Future Improvement

Modify logic to overwrite the json file
