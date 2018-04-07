const express = require('express');
const path = require('path');
const app = express();


// app.use('/', (req, res)=>{
//   res.sendFile(path.resolve(__dirname, './index.html'))
// }); //serves the index.html
app.use(express.static('./'));

const server = require('http').Server(app);

server.listen(8000, function() {
  console.log('listening on port 8000!')
}); //listens on port 3000 -> http://localhost:3000/
