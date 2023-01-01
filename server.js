const app = require('./index')
const port = process.env.PORT || "8080";

const server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port)
});